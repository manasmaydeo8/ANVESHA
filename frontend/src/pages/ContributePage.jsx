// src/pages/ContributePage.jsx
import React, { useState, useEffect } from "react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { MonoEyebrow } from "../components/guide/MonoEyebrow";
import { SyntaxChip } from "../components/guide/SyntaxChip";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ContributePage({ initialType = "language", onNavigate }) {
  const { user } = useAuth();
  const [entryType, setEntryType] = useState(initialType); // 'language' | 'fact' | 'guideline'
  const [languagesList, setLanguagesList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Language form state
  const [langForm, setLangForm] = useState({
    name: "",
    year: "",
    paradigms: ["functional"],
    typing: "static, strong",
    execution: "compiled to native",
    tagline: "",
    overview: "",
    hello_world: "pub fn main() {\n    // Code specimen\n}",
  });

  // Fact form state
  const [factForm, setFactForm] = useState({
    languageSlug: "",
    text: "",
  });

  // Guideline form state
  const [guidelineForm, setGuidelineForm] = useState({
    languageSlug: "",
    title: "",
    body: "",
    when_to_use: "",
    avoid: "",
    category: "Practical Guidelines",
  });

  const availableParadigms = [
    "SCRIPTING",
    "FUNCTIONAL",
    "SYSTEMS",
    "OBJECT-ORIENTED",
    "CONCURRENT",
    "DATA",
  ];

  // Load languages for pickers
  useEffect(() => {
    api("/api/languages")
      .then((data) => {
        setLanguagesList(data);
        if (data.length > 0) {
          setFactForm((f) => ({
            ...f,
            languageSlug: f.languageSlug || data[0].slug,
          }));
          setGuidelineForm((g) => ({
            ...g,
            languageSlug: g.languageSlug || data[0].slug,
          }));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleParadigm = (p) => {
    const lower = p.toLowerCase();
    setLangForm((prev) => {
      const exists = prev.paradigms.includes(lower);
      const updated = exists
        ? prev.paradigms.filter((item) => item !== lower)
        : [...prev.paradigms, lower];
      return { ...prev, paradigms: updated };
    });
  };

  const handleLanguageSubmit = async (e) => {
    e.preventDefault();
    const name = langForm.name.trim();
    if (!name) {
      setErrorMsg("Language name is required.");
      return;
    }
    if (!langForm.overview.trim()) {
      setErrorMsg("Overview is required.");
      return;
    }

    const currentYear = new Date().getFullYear();
    const parsedYear = parseInt(langForm.year, 10);
    if (
      langForm.year &&
      (isNaN(parsedYear) || parsedYear < 1940 || parsedYear > currentYear + 1)
    ) {
      setErrorMsg(`Release year must be between 1940 and ${currentYear + 1}.`);
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    try {
      const payload = {
        name,
        year: parsedYear || currentYear,
        paradigms: langForm.paradigms.length
          ? langForm.paradigms
          : ["multi-paradigm"],
        typing: langForm.typing.trim(),
        execution: langForm.execution.trim(),
        tagline: langForm.tagline.trim(),
        overview: langForm.overview.trim(),
        hello_world: langForm.hello_world.trim(),
      };

      const res = await api("/api/languages", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      toast.success("Entry filed — pending review");
      setLangForm({
        name: "",
        year: "",
        paradigms: ["functional"],
        typing: "static, strong",
        execution: "compiled to native",
        tagline: "",
        overview: "",
        hello_world: "",
      });
      if (res?.language?.slug) {
        onNavigate(`/languages/${res.language.slug}`);
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to file language");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFactSubmit = async (e) => {
    e.preventDefault();
    const text = factForm.text.trim();
    if (text.length < 5) {
      setErrorMsg("Field note must be at least 5 characters.");
      return;
    }
    if (!factForm.languageSlug) {
      setErrorMsg("Select a language.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    try {
      await api(`/api/languages/${factForm.languageSlug}/facts`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });

      toast.success("Entry filed — pending review");
      const targetSlug = factForm.languageSlug;
      setFactForm((prev) => ({ ...prev, text: "" }));
      onNavigate(`/languages/${targetSlug}`);
    } catch (err) {
      setErrorMsg(err.message || "Failed to file field note");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuidelineSubmit = async (e) => {
    e.preventDefault();
    const title = guidelineForm.title.trim();
    const body = guidelineForm.body.trim();
    if (title.length < 3) {
      setErrorMsg("Rule title must be at least 3 characters.");
      return;
    }
    if (body.length < 5) {
      setErrorMsg("Guideline explanation must be at least 5 characters.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    try {
      await api(`/api/languages/${guidelineForm.languageSlug}/guidelines`, {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          when_to_use: guidelineForm.when_to_use.trim(),
          avoid: guidelineForm.avoid.trim(),
          category: guidelineForm.category.trim(),
        }),
      });

      toast.success("Entry filed — pending review");
      const targetSlug = guidelineForm.languageSlug;
      setGuidelineForm((prev) => ({
        ...prev,
        title: "",
        body: "",
        when_to_use: "",
        avoid: "",
      }));
      onNavigate(`/languages/${targetSlug}`);
    } catch (err) {
      setErrorMsg(err.message || "Failed to file guideline");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header matching Image 1 */}
      <div>
        <MonoEyebrow className="mb-2">CONTRIBUTE</MonoEyebrow>
        <h1 className="font-display text-[40px] sm:text-[48px] text-foreground tracking-tight leading-tight mb-3">
          Add an entry to the field guide.
        </h1>
        <p className="text-[15px] sm:text-[16px] text-muted-foreground font-sans max-w-2xl leading-relaxed">
          Every page in this guide was filed by a reader. Pick what you are
          adding — the entry appears immediately and is signed with your name.
        </p>
      </div>

      {/* Two Column Layout matching Image 1 */}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">
        {/* Left Column: Menu Selector */}
        <div className="space-y-6">
          <MonoEyebrow>CHOOSE YOUR ENTRY</MonoEyebrow>

          <div className="border border-border/80 rounded-md divide-y divide-border/80 bg-background overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setEntryType("language");
                setErrorMsg("");
              }}
              className={`w-full text-left p-4 transition-colors cursor-pointer ${
                entryType === "language"
                  ? "bg-card/90 font-medium"
                  : "hover:bg-card/40"
              }`}
            >
              <div className="font-sans text-[15px] text-foreground">
                Add a language
              </div>
              <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                A new specimen page
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setEntryType("fact");
                setErrorMsg("");
              }}
              className={`w-full text-left p-4 transition-colors cursor-pointer ${
                entryType === "fact"
                  ? "bg-card/90 font-medium"
                  : "hover:bg-card/40"
              }`}
            >
              <div className="font-sans text-[15px] text-foreground">
                Add a field note
              </div>
              <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                One surprising truth
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setEntryType("guideline");
                setErrorMsg("");
              }}
              className={`w-full text-left p-4 transition-colors cursor-pointer ${
                entryType === "guideline"
                  ? "bg-card/90 font-medium"
                  : "hover:bg-card/40"
              }`}
            >
              <div className="font-sans text-[15px] text-foreground">
                Add a guideline
              </div>
              <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                One practical rule
              </div>
            </button>
          </div>

          <p className="text-[13px] text-muted-foreground font-sans leading-relaxed">
            Field notes should be verifiable. Guidelines should describe a rule
            you have seen save someone time.
          </p>
        </div>

        {/* Right Column: Form Panel on bg-card */}
        <div className="bg-card/80 border border-border/80 rounded-lg p-6 sm:p-8">
          {!user ? (
            <div className="text-center py-10 space-y-4">
              <h3 className="font-display text-[22px] text-foreground">
                Sign in to file entries
              </h3>
              <p className="text-[14px] text-muted-foreground font-sans max-w-sm mx-auto">
                Contributors have entries signed with their name and can manage
                their contributions in their notebook.
              </p>
              <Button
                variant="primary"
                onClick={() => onNavigate("/signin?next=/contribute")}
                className="mt-2"
              >
                Sign in or create account
              </Button>
            </div>
          ) : (
            <div>
              {errorMsg && (
                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded font-mono text-[12px] text-red-600">
                  {errorMsg}
                </div>
              )}

              {/* Form 1: Add a language */}
              {entryType === "language" && (
                <form onSubmit={handleLanguageSubmit} className="space-y-6">
                  {/* Row: Name + Released */}
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                        LANGUAGE NAME
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={60}
                        value={langForm.name}
                        onChange={(e) =>
                          setLangForm({ ...langForm, name: e.target.value })
                        }
                        placeholder="e.g. Gleam"
                        className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                        RELEASED
                      </label>
                      <input
                        type="number"
                        min="1940"
                        max="2030"
                        value={langForm.year}
                        onChange={(e) =>
                          setLangForm({ ...langForm, year: e.target.value })
                        }
                        placeholder="2016"
                        className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Paradigms */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                      PARADIGMS
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableParadigms.map((p) => {
                        const isSelected = langForm.paradigms.includes(
                          p.toLowerCase(),
                        );
                        return (
                          <SyntaxChip
                            key={p}
                            label={p}
                            selected={isSelected}
                            onClick={() => toggleParadigm(p)}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Row: Typing + Execution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                        TYPING
                      </label>
                      <input
                        type="text"
                        maxLength={60}
                        value={langForm.typing}
                        onChange={(e) =>
                          setLangForm({ ...langForm, typing: e.target.value })
                        }
                        placeholder="static, strong"
                        className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                        EXECUTION
                      </label>
                      <input
                        type="text"
                        maxLength={60}
                        value={langForm.execution}
                        onChange={(e) =>
                          setLangForm({
                            ...langForm,
                            execution: e.target.value,
                          })
                        }
                        placeholder="compiled to native / BEAM"
                        className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* One-Line Summary */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      ONE-LINE SUMMARY
                    </label>
                    <input
                      type="text"
                      maxLength={200}
                      value={langForm.tagline}
                      onChange={(e) =>
                        setLangForm({ ...langForm, tagline: e.target.value })
                      }
                      placeholder="A short punchy thesis on what makes this language distinct"
                      className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                  </div>

                  {/* Overview */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      OVERVIEW (SERIF ARTICLE PROSE)
                    </label>
                    <textarea
                      rows={4}
                      required
                      maxLength={5000}
                      value={langForm.overview}
                      onChange={(e) =>
                        setLangForm({ ...langForm, overview: e.target.value })
                      }
                      placeholder="Describe the historical context, creator motivations, and core design trade-offs..."
                      className="w-full p-3 bg-background border border-border rounded-md font-serif text-[15px] leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                  </div>

                  {/* Hello World Code */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      HELLO WORLD CODE SPECIMEN
                    </label>
                    <textarea
                      rows={4}
                      maxLength={4000}
                      value={langForm.hello_world}
                      onChange={(e) =>
                        setLangForm({
                          ...langForm,
                          hello_world: e.target.value,
                        })
                      }
                      placeholder="fn main() {\n    // Code here\n}"
                      className="w-full p-3 bg-foreground text-background border border-foreground/30 rounded-md font-mono text-[13px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/60"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={submitting}
                      className="w-full sm:w-auto"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          <span>Filing entry...</span>
                        </>
                      ) : (
                        <span>File this entry</span>
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {/* Form 2: Add a field note */}
              {entryType === "fact" && (
                <form onSubmit={handleFactSubmit} className="space-y-6">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      TARGET LANGUAGE SPECIMEN
                    </label>
                    <select
                      value={factForm.languageSlug}
                      onChange={(e) =>
                        setFactForm({
                          ...factForm,
                          languageSlug: e.target.value,
                        })
                      }
                      className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      {languagesList.map((l) => (
                        <option key={l.slug} value={l.slug}>
                          {l.name} (Specimen No.{" "}
                          {String(l.specimen_no).padStart(3, "0")})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      ONE SURPRISING TRUTH (FIELD NOTE)
                    </label>
                    <textarea
                      rows={4}
                      required
                      maxLength={1000}
                      value={factForm.text}
                      onChange={(e) =>
                        setFactForm({ ...factForm, text: e.target.value })
                      }
                      placeholder="Share a verifiable technical curiosity, historical anecdote, or design anomaly..."
                      className="w-full p-3 bg-background border border-border rounded-md font-sans text-[15px] leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <Button type="submit" variant="primary" disabled={submitting}>
                    {submitting
                      ? "Filing field note..."
                      : "File this field note"}
                  </Button>
                </form>
              )}

              {/* Form 3: Add a guideline */}
              {entryType === "guideline" && (
                <form onSubmit={handleGuidelineSubmit} className="space-y-6">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      TARGET LANGUAGE SPECIMEN
                    </label>
                    <select
                      value={guidelineForm.languageSlug}
                      onChange={(e) =>
                        setGuidelineForm({
                          ...guidelineForm,
                          languageSlug: e.target.value,
                        })
                      }
                      className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      {languagesList.map((l) => (
                        <option key={l.slug} value={l.slug}>
                          {l.name} (Specimen No.{" "}
                          {String(l.specimen_no).padStart(3, "0")})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      GUIDELINE TITLE / RULE SUMMARY
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={120}
                      value={guidelineForm.title}
                      onChange={(e) =>
                        setGuidelineForm({
                          ...guidelineForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g. Always check errors immediately with annotated context"
                      className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      RATIONALE & BEHAVIOR
                    </label>
                    <textarea
                      rows={3}
                      required
                      maxLength={3000}
                      value={guidelineForm.body}
                      onChange={(e) =>
                        setGuidelineForm({
                          ...guidelineForm,
                          body: e.target.value,
                        })
                      }
                      placeholder="Explain why this rule prevents failures or saves engineering time..."
                      className="w-full p-3 bg-background border border-border rounded-md font-sans text-[14px] leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                        WHEN TO USE
                      </label>
                      <input
                        type="text"
                        maxLength={500}
                        value={guidelineForm.when_to_use}
                        onChange={(e) =>
                          setGuidelineForm({
                            ...guidelineForm,
                            when_to_use: e.target.value,
                          })
                        }
                        placeholder="Public APIs, memory critical boundaries"
                        className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                        AVOID
                      </label>
                      <input
                        type="text"
                        maxLength={500}
                        value={guidelineForm.avoid}
                        onChange={(e) =>
                          setGuidelineForm({
                            ...guidelineForm,
                            avoid: e.target.value,
                          })
                        }
                        placeholder="Loose equality comparisons"
                        className="w-full h-10 px-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" disabled={submitting}>
                    {submitting ? "Filing guideline..." : "File this guideline"}
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
