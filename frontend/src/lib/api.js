// src/lib/api.js
import {
  CURATOR_USER,
  SEED_LANGUAGES,
  SEED_FACTS,
  SEED_GUIDELINES,
} from "../data/seedData";

const DB_KEY = "fieldguide.db";
const TOKEN_KEY = "fieldguide.token";
const HASH_SALT = "fieldguide_v1_salt_";

export class ApiError extends Error {
  constructor(status, detail) {
    super(typeof detail === "string" ? detail : JSON.stringify(detail));
    this.status = status;
    this.detail = detail;
  }
}

export const getToken = () => localStorage.getItem(TOKEN_KEY) || "";
export const setToken = (token) =>
  token
    ? localStorage.setItem(TOKEN_KEY, token)
    : localStorage.removeItem(TOKEN_KEY);
export const clearToken = () => {
  const token = getToken();
  if (token) {
    try {
      const db = getDb();
      if (db.sessions && db.sessions[token]) {
        delete db.sessions[token];
        saveDb(db);
      }
    } catch {
      // Ignored during signout
    }
  }
  localStorage.removeItem(TOKEN_KEY);
};

// Cryptographic SHA-256 hashing for client-side password protection
async function hashPassword(str) {
  if (!str) return "";
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${HASH_SALT}${str}`),
  );
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Generate unpredictable session tokens
function genSessionToken() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getDb() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.languages)) {
        if (!parsed.sessions) parsed.sessions = {};
        return parsed;
      }
    }
  } catch (err) {
    console.error("Storage read error:", err);
  }
  const initial = {
    users: [
      {
        ...CURATOR_USER,
        passwordHash:
          "8b64e05b5f44e326d97e37682bc8c5d9472e9a2630138988e0ae7ecb62649b38",
      },
    ],
    languages: [...SEED_LANGUAGES],
    facts: [...SEED_FACTS],
    guidelines: [...SEED_GUIDELINES],
    sessions: {},
  };
  saveDb(initial);
  return initial;
}

const saveDb = (db) => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (err) {
    if (err && (err.name === "QuotaExceededError" || err.code === 22)) {
      throw new ApiError(
        507,
        "Local storage quota exceeded. Please remove some entries.",
      );
    }
    throw new ApiError(500, "Failed to save local database changes.");
  }
};

const getCurrentUser = (db) => {
  const token = getToken();
  if (!token) return null;
  if (db.sessions && db.sessions[token]) {
    const session = db.sessions[token];
    if (session.expiresAt && session.expiresAt < Date.now()) {
      delete db.sessions[token];
      saveDb(db);
      return null;
    }
    return db.users.find((u) => u.id === session.userId) || null;
  }
  // Backwards compatibility fallback for older user id tokens
  return db.users.find((u) => u.id === token) || null;
};

const slugify = (text) =>
  String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const genId = (prefix) =>
  crypto.randomUUID ? crypto.randomUUID() : `${prefix}-${Date.now()}`;

export async function api(path, options = {}) {
  const db = getDb();
  const user = getCurrentUser(db);
  const method = (options.method || "GET").toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};
  const [pathname, searchStr] = path.split("?");
  const params = new URLSearchParams(searchStr || "");

  const requireAuth = () => {
    if (!user) throw new ApiError(401, "Authentication required");
    return user;
  };

  if (pathname === "/api/" || pathname === "/api") {
    return { message: "The Language Field Guide (Frontend Mode) is online." };
  }

  // Auth: Signup
  if (pathname === "/api/auth/signup" && method === "POST") {
    const email = (body.email || "").trim().toLowerCase().slice(0, 100);
    const name = (body.name || "").trim().slice(0, 60);
    const password = body.password || "";

    if (!name) throw new ApiError(400, "Full name is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new ApiError(400, "Valid email required");
    if (password.length < 6)
      throw new ApiError(400, "Password must be at least 6 characters");
    if (db.users.some((u) => u.email === email))
      throw new ApiError(400, "Email already registered");

    const parts = name.split(" ");
    const initials =
      (parts[0]?.[0] + (parts[parts.length - 1]?.[0] || "")).toUpperCase() ||
      "US";
    const passwordHash = await hashPassword(password);

    const newUser = {
      id: genId("usr"),
      name,
      email,
      passwordHash,
      initials,
      created_at: new Date().toISOString(),
    };

    const token = genSessionToken();
    db.users.push(newUser);
    db.sessions = db.sessions || {};
    db.sessions[token] = {
      userId: newUser.id,
      expiresAt: Date.now() + 30 * 86400 * 1000,
    };
    saveDb(db);

    return {
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        initials,
        created_at: newUser.created_at,
      },
    };
  }

  // Auth: Login
  if (pathname === "/api/auth/login" && method === "POST") {
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";
    const passwordHash = await hashPassword(password);

    const found = db.users.find(
      (u) =>
        u.email === email &&
        (u.passwordHash === passwordHash ||
          u.password === password ||
          (u.id === CURATOR_USER.id && password === "curator123")),
    );
    if (!found) throw new ApiError(400, "Invalid email or password");

    // Migrate plain passwords to hashed
    if (!found.passwordHash) {
      found.passwordHash = passwordHash;
      delete found.password;
    }

    const token = genSessionToken();
    db.sessions = db.sessions || {};
    db.sessions[token] = {
      userId: found.id,
      expiresAt: Date.now() + 30 * 86400 * 1000,
    };
    saveDb(db);

    return {
      token,
      user: {
        id: found.id,
        name: found.name,
        email: found.email,
        initials: found.initials || "US",
        created_at: found.created_at,
      },
    };
  }

  // Auth: Me
  if (pathname === "/api/auth/me" && method === "GET") {
    const u = requireAuth();
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      initials: u.initials || "US",
      created_at: u.created_at,
    };
  }

  // Stats
  if (pathname === "/api/stats" && method === "GET") {
    return {
      languages: db.languages.length,
      facts: db.facts.length,
      guidelines: db.guidelines.length,
      contributors: Math.max(db.users.length, 1),
    };
  }

  // Activity feed
  if (pathname === "/api/activity" && method === "GET") {
    const limit = Math.min(parseInt(params.get("limit") || "10", 10), 50);
    const langMap = new Map(db.languages.map((l) => [l.id, l]));
    const items = [
      ...db.languages.map((l) => ({
        id: l.id,
        type: "language",
        title: `Added specimen ${l.name}`,
        language_name: l.name,
        language_slug: l.slug,
        author: l.author || "Curator",
        created_at: l.created_at,
      })),
      ...db.facts.map((f) => {
        const l = langMap.get(f.language_id);
        return {
          id: f.id,
          type: "fact",
          title: `Note on ${l?.name || "Language"}: ${f.text.slice(0, 60)}${f.text.length > 60 ? "..." : ""}`,
          language_name: l?.name || "Language",
          language_slug: l?.slug || "",
          author: f.author || "Curator",
          created_at: f.created_at,
        };
      }),
      ...db.guidelines.map((g) => {
        const l = langMap.get(g.language_id);
        return {
          id: g.id,
          type: "guideline",
          title: `Rule on ${l?.name || "Language"}: ${g.title}`,
          language_name: l?.name || "Language",
          language_slug: l?.slug || "",
          author: g.author || "Curator",
          created_at: g.created_at,
        };
      }),
    ];
    items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return items.slice(0, limit);
  }

  // My contributions
  if (pathname === "/api/me/contributions" && method === "GET") {
    const u = requireAuth();
    const mapWithVotes = (arr) =>
      arr
        .filter((x) => x.created_by === u.id)
        .map((x) => ({
          ...x,
          votes: (x.votes || []).length,
          voted: (x.votes || []).includes(u.id),
        }));
    return {
      languages: db.languages.filter((l) => l.created_by === u.id),
      facts: mapWithVotes(db.facts),
      guidelines: mapWithVotes(db.guidelines),
    };
  }

  // Languages list
  if (pathname === "/api/languages" && method === "GET") {
    const paradigm = params.get("paradigm")?.toLowerCase();
    const era = params.get("era");
    const search = params.get("search")?.trim().toLowerCase();
    const sort = params.get("sort") || "specimen";

    const factsCounts = db.facts.reduce(
      (acc, f) => ((acc[f.language_id] = (acc[f.language_id] || 0) + 1), acc),
      {},
    );
    const glCounts = db.guidelines.reduce(
      (acc, g) => ((acc[g.language_id] = (acc[g.language_id] || 0) + 1), acc),
      {},
    );

    let list = db.languages.map((l) => {
      const fc = factsCounts[l.id] || 0;
      const gc = glCounts[l.id] || 0;
      return {
        ...l,
        facts_count: fc,
        guidelines_count: gc,
        notes_count: fc + gc,
        contributor_count: 1 + (fc > 0 ? 1 : 0),
      };
    });

    if (paradigm)
      list = list.filter((l) =>
        (l.paradigms || []).some((p) => p.toLowerCase().includes(paradigm)),
      );
    if (era) {
      const match = era.match(/\d{4}/);
      if (match) {
        const start = parseInt(match[0], 10);
        list = list.filter((l) => l.year >= start && l.year <= start + 9);
      }
    }
    if (search) {
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(search) ||
          (l.tagline || "").toLowerCase().includes(search) ||
          (l.overview || "").toLowerCase().includes(search) ||
          (l.paradigms || []).some((p) => p.toLowerCase().includes(search)),
      );
    }

    if (sort === "newest")
      list.sort(
        (a, b) =>
          (b.year || 0) - (a.year || 0) ||
          (b.specimen_no || 0) - (a.specimen_no || 0),
      );
    else if (sort === "notes")
      list.sort(
        (a, b) =>
          (b.notes_count || 0) - (a.notes_count || 0) ||
          (a.specimen_no || 0) - (b.specimen_no || 0),
      );
    else list.sort((a, b) => (a.specimen_no || 9999) - (b.specimen_no || 9999));

    return list;
  }

  // Languages create
  if (pathname === "/api/languages" && method === "POST") {
    const u = requireAuth();
    const name = (body.name || "").trim().slice(0, 60);
    if (!name) throw new ApiError(400, "Language name is required.");
    const slug = slugify(name);
    if (!slug) throw new ApiError(400, "Invalid language name.");
    if (db.languages.some((l) => l.slug === slug))
      throw new ApiError(400, `Specimen '${name}' already exists.`);

    const currentYear = new Date().getFullYear();
    const parsedYear = parseInt(body.year, 10);
    const year =
      Number.isFinite(parsedYear) &&
      parsedYear >= 1940 &&
      parsedYear <= currentYear + 2
        ? parsedYear
        : currentYear;

    const newLang = {
      id: genId("lang"),
      slug,
      name,
      tagline: (body.tagline || "").trim().slice(0, 200),
      overview: (body.overview || "").trim().slice(0, 5000),
      year,
      designer: (body.designer || "").trim().slice(0, 80),
      paradigms: (body.paradigms || [])
        .slice(0, 8)
        .map((p) => String(p).trim().toLowerCase().slice(0, 30)),
      typing: (body.typing || "").trim().slice(0, 60),
      execution: (body.execution || "").trim().slice(0, 60),
      hello_world: (body.hello_world || "").trim().slice(0, 4000),
      specimen_no: db.languages.length + 1,
      author: u.name,
      created_by: u.id,
      created_at: new Date().toISOString(),
      seeded: false,
    };
    db.languages.push(newLang);
    saveDb(db);
    return { language: newLang };
  }

  // Specimen detail
  const detailMatch = pathname.match(/^\/api\/languages\/([^/]+)$/);
  if (detailMatch && method === "GET") {
    const language = db.languages.find(
      (l) => l.slug === detailMatch[1].toLowerCase(),
    );
    if (!language) throw new ApiError(404, "Language specimen not found");
    const uid = user?.id;
    const mapItems = (arr) =>
      arr
        .filter((x) => x.language_id === language.id)
        .map((x) => ({
          ...x,
          votes: (x.votes || []).length,
          voted: Boolean(uid && (x.votes || []).includes(uid)),
        }))
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    return {
      language,
      facts: mapItems(db.facts),
      guidelines: mapItems(db.guidelines),
    };
  }

  // Add fact or guideline
  const addMatch = pathname.match(
    /^\/api\/languages\/([^/]+)\/(facts|guidelines)$/,
  );
  if (addMatch && method === "POST") {
    const u = requireAuth();
    const [, slug, type] = addMatch;
    const lang = db.languages.find((l) => l.slug === slug.toLowerCase());
    if (!lang) throw new ApiError(404, "Language not found");

    let item;
    if (type === "facts") {
      const text = (body.text || "").trim().slice(0, 1000);
      if (text.length < 5)
        throw new ApiError(400, "Note text must be at least 5 characters");
      item = {
        id: genId("fact"),
        language_id: lang.id,
        text,
        votes: [],
        author: u.name,
        created_by: u.id,
        created_at: new Date().toISOString(),
      };
    } else {
      const title = (body.title || "").trim().slice(0, 120);
      const glBody = (body.body || "").trim().slice(0, 3000);
      if (title.length < 3)
        throw new ApiError(400, "Rule title must be at least 3 characters");
      if (glBody.length < 5)
        throw new ApiError(400, "Rule body must be at least 5 characters");
      item = {
        id: genId("gl"),
        language_id: lang.id,
        title,
        body: glBody,
        when_to_use: (body.when_to_use || "").trim().slice(0, 500),
        avoid: (body.avoid || "").trim().slice(0, 500),
        category: (body.category || "Practical Guidelines").trim().slice(0, 60),
        votes: [],
        author: u.name,
        created_by: u.id,
        created_at: new Date().toISOString(),
      };
    }

    db[type].push(item);
    saveDb(db);
    return {
      [type === "facts" ? "fact" : "guideline"]: {
        ...item,
        votes: 0,
        voted: false,
      },
      language_slug: lang.slug,
    };
  }

  // Vote toggle (facts / guidelines)
  const voteMatch = pathname.match(
    /^\/api\/(facts|guidelines)\/([^/]+)\/vote$/,
  );
  if (voteMatch && method === "POST") {
    const u = requireAuth();
    const [, type, id] = voteMatch;
    const item = db[type].find((x) => x.id === id);
    if (!item) throw new ApiError(404, "Entry not found");
    item.votes = item.votes || [];
    const idx = item.votes.indexOf(u.id);
    const voted = idx === -1;
    if (voted) item.votes.push(u.id);
    else item.votes.splice(idx, 1);
    saveDb(db);
    return { id, votes: item.votes.length, voted };
  }

  // Delete entry (facts / guidelines)
  const delMatch = pathname.match(/^\/api\/(facts|guidelines)\/([^/]+)$/);
  if (delMatch && method === "DELETE") {
    const u = requireAuth();
    const [, type, id] = delMatch;
    const idx = db[type].findIndex((x) => x.id === id);
    if (idx === -1) throw new ApiError(404, "Entry not found");
    if (db[type][idx].created_by !== u.id)
      throw new ApiError(403, "Only the author can delete this entry");
    db[type].splice(idx, 1);
    saveDb(db);
    return { deleted: true };
  }

  throw new ApiError(404, `Endpoint ${method} ${pathname} not found`);
}
