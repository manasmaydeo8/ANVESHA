import React, { useState, useEffect, useCallback } from "react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { MonoEyebrow } from "../components/guide/MonoEyebrow";
import { SyntaxChip } from "../components/guide/SyntaxChip";
import { NumberedEntry } from "../components/guide/NumberedEntry";
import { DarkCodeBlock } from "../components/guide/DarkCodeBlock";
import { LanguageIcon } from "../components/guide/LanguageIcon";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export function LanguageDetailPage({ slug, onNavigate }) {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Quick Inline Note / Guideline Drawer or Modal
  const [showFactModal, setShowFactModal] = useState(false);
  const [showGuidelineModal, setShowGuidelineModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [glForm, setGlForm] = useState({
    title: "",
    body: "",
    when_to_use: "",
    avoid: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api(`/api/languages/${slug}`);
      setData(res);
    } catch (err) {
      setError(err.message || "Specimen not found");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowFactModal(false);
        setShowGuidelineModal(false);
      }
    };
    if (showFactModal || showGuidelineModal) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showFactModal, showGuidelineModal]);

  const handleVote = async (type, id) => {
    if (!user) return onNavigate(`/signin?next=/languages/${slug}`);
    try {
      const res = await api(`/api/${type}/${id}/vote`, { method: "POST" });
      setData((prev) =>
        prev
          ? {
              ...prev,
              [type]: prev[type].map((item) =>
                item.id === id
                  ? { ...item, votes: res.votes, voted: res.voted }
                  : item,
              ),
            }
          : prev,
      );
    } catch (err) {
      toast.error(err.message || "Failed to vote");
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      await api(`/api/${type}/${id}`, { method: "DELETE" });
      toast.success("Entry removed");
      setData((prev) =>
        prev
          ? {
              ...prev,
              [type]: prev[type].filter((item) => item.id !== id),
            }
          : prev,
      );
    } catch (err) {
      toast.error(err.message || "Could not delete entry");
    }
  };

  // Submit quick fact
  const handleQuickFactSubmit = async (e) => {
    e.preventDefault();
    if (!modalText.trim()) return;
    setSubmitting(true);
    try {
      await api(`/api/languages/${slug}/facts`, {
        method: "POST",
        body: JSON.stringify({ text: modalText.trim() }),
      });
      toast.success("Field note added");
      setModalText("");
      setShowFactModal(false);
      fetchDetail();
    } catch (err) {
      toast.error(err.message || "Failed to add note");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit quick guideline
  const handleQuickGuidelineSubmit = async (e) => {
    e.preventDefault();
    if (!glForm.title.trim() || !glForm.body.trim()) return;
    setSubmitting(true);
    try {
      await api(`/api/languages/${slug}/guidelines`, {
        method: "POST",
        body: JSON.stringify(glForm),
      });
      toast.success("Guideline added");
      setGlForm({ title: "", body: "", when_to_use: "", avoid: "" });
      setShowGuidelineModal(false);
      fetchDetail();
    } catch (err) {
      toast.error(err.message || "Failed to add guideline");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[720px] mx-auto space-y-8 animate-pulse py-6">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="h-12 w-64 bg-muted rounded" />
        <div className="h-5 w-full bg-muted rounded" />
        <div className="h-40 w-full bg-muted rounded" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-[720px] mx-auto py-12 text-center space-y-4">
        <h2 className="font-display text-[32px] text-foreground">
          This specimen does not exist (yet).
        </h2>
        <p className="text-[15px] text-muted-foreground font-sans max-w-md mx-auto">
          Every page in this field guide is filed by members of the programming
          community.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Button variant="secondary" onClick={() => onNavigate("/")}>
            Back to index
          </Button>
          <Button
            variant="primary"
            onClick={() => onNavigate("/contribute?type=language")}
          >
            Add it to the guide
          </Button>
        </div>
      </div>
    );
  }

  const { language, facts, guidelines } = data;
  const specimenStr = String(language.specimen_no || 1).padStart(3, "0");

  return (
    <div className="relative">
      {/* Back to index link */}
      <button
        onClick={() => onNavigate("/")}
        className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to index</span>
      </button>

      {/* Main Container with Right TOC Rail on xl */}
      <div className="grid grid-cols-1 xl:grid-cols-[720px_1fr] gap-12 items-start max-w-[1020px] mx-auto">
        {/* Article Column (Narrow 720px) */}
        <article className="max-w-[720px] space-y-12">
          {/* Header */}
          <header className="space-y-4 pb-6 hairline-b">
            <MonoEyebrow>
              SPECIMEN NO. {specimenStr} · CONTRIBUTED BY @
              {language.author || "CURATOR"} ·{" "}
              {language.seeded ? "CURATED" : "COMMUNITY VERIFIED"}
            </MonoEyebrow>

            <div className="flex items-center gap-4">
              <LanguageIcon language={language} size="lg" />
              <h1 className="font-display text-[44px] sm:text-[48px] text-foreground tracking-tight leading-[1.1]">
                {language.name}
              </h1>
            </div>

            {language.tagline && (
              <p className="font-sans text-[18px] text-muted-foreground leading-relaxed">
                {language.tagline}
              </p>
            )}

            {/* Syntax chips row */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <SyntaxChip label={`ERA ${language.year}`} />
              {language.designer && (
                <SyntaxChip label={`BY ${language.designer}`} />
              )}
              {language.paradigms?.map((p) => (
                <SyntaxChip key={p} label={p} />
              ))}
              {language.typing && <SyntaxChip label={language.typing} />}
              {language.execution && <SyntaxChip label={language.execution} />}
            </div>
          </header>

          {/* Overview */}
          <section id="overview" className="space-y-4">
            <MonoEyebrow>OVERVIEW</MonoEyebrow>
            <div className="font-serif text-[18px] leading-[1.7] text-foreground/90 space-y-4">
              <p>{language.overview}</p>
            </div>
          </section>

          {/* Hello World Code Block */}
          {language.hello_world && (
            <section id="code" className="space-y-3">
              <MonoEyebrow>SPECIMEN SYNTAX</MonoEyebrow>
              <DarkCodeBlock
                code={language.hello_world}
                language={language.slug}
                filename="hello_world"
              />
            </section>
          )}

          {/* FIELD NOTES */}
          <section id="field-notes" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <MonoEyebrow>FIELD NOTES ({facts.length})</MonoEyebrow>
              <button
                onClick={() => {
                  if (!user) {
                    onNavigate(`/signin?next=/languages/${slug}`);
                    return;
                  }
                  setShowFactModal(true);
                }}
                className="font-mono text-[11px] uppercase tracking-wider text-primary hover:underline cursor-pointer"
              >
                + Add a field note
              </button>
            </div>

            {facts.length === 0 ? (
              <p className="text-[14px] text-muted-foreground font-sans italic py-4">
                No field notes recorded yet. Be the first to record a surprising
                truth!
              </p>
            ) : (
              <div className="divide-y-0">
                {facts.map((fact, idx) => (
                  <NumberedEntry
                    key={fact.id}
                    index={idx + 1}
                    body={fact.text}
                    author={fact.author}
                    votes={fact.votes}
                    voted={fact.voted}
                    onVote={() => handleVote("facts", fact.id)}
                    canDelete={Boolean(user && user.id === fact.created_by)}
                    onDelete={() => handleDelete("facts", fact.id)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* PRACTICAL GUIDELINES */}
          <section id="guidelines" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <MonoEyebrow>
                PRACTICAL GUIDELINES ({guidelines.length})
              </MonoEyebrow>
              <button
                onClick={() => {
                  if (!user) {
                    onNavigate(`/signin?next=/languages/${slug}`);
                    return;
                  }
                  setShowGuidelineModal(true);
                }}
                className="font-mono text-[11px] uppercase tracking-wider text-primary hover:underline cursor-pointer"
              >
                + Add a guideline
              </button>
            </div>

            {guidelines.length === 0 ? (
              <p className="text-[14px] text-muted-foreground font-sans italic py-4">
                No practical guidelines filed yet. Add one to help other
                engineers!
              </p>
            ) : (
              <div className="divide-y-0">
                {guidelines.map((gl, idx) => (
                  <NumberedEntry
                    key={gl.id}
                    index={idx + 1}
                    title={gl.title}
                    body={gl.body}
                    whenToUse={gl.when_to_use}
                    avoid={gl.avoid}
                    author={gl.author}
                    votes={gl.votes}
                    voted={gl.voted}
                    onVote={() => handleVote("guidelines", gl.id)}
                    canDelete={Boolean(user && user.id === gl.created_by)}
                    onDelete={() => handleDelete("guidelines", gl.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </article>

        {/* Right Rail on xl (Table of Contents + Contribution CTAs) */}
        <aside className="hidden xl:block sticky top-24 space-y-8 pl-6 border-l border-border/60">
          <div className="space-y-3 font-mono text-[12px]">
            <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
              TABLE OF CONTENTS
            </span>
            <nav className="space-y-2">
              <a
                href="#overview"
                className="block text-foreground/80 hover:text-primary transition-colors"
              >
                01 Overview
              </a>
              {language.hello_world && (
                <a
                  href="#code"
                  className="block text-foreground/80 hover:text-primary transition-colors"
                >
                  02 Code Specimen
                </a>
              )}
              <a
                href="#field-notes"
                className="block text-foreground/80 hover:text-primary transition-colors"
              >
                03 Field Notes ({facts.length})
              </a>
              <a
                href="#guidelines"
                className="block text-foreground/80 hover:text-primary transition-colors"
              >
                04 Guidelines ({guidelines.length})
              </a>
            </nav>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/60 font-mono text-[11px]">
            <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
              CONTRIBUTE TO SPECIMEN
            </span>
            <button
              onClick={() => {
                if (!user) {
                  onNavigate(`/signin?next=/languages/${slug}`);
                  return;
                }
                setShowFactModal(true);
              }}
              className="w-full py-2 bg-background border border-border rounded text-center uppercase tracking-wider text-foreground hover:bg-card transition-colors cursor-pointer"
            >
              + Add a field note
            </button>
            <button
              onClick={() => {
                if (!user) {
                  onNavigate(`/signin?next=/languages/${slug}`);
                  return;
                }
                setShowGuidelineModal(true);
              }}
              className="w-full py-2 bg-background border border-border rounded text-center uppercase tracking-wider text-foreground hover:bg-card transition-colors cursor-pointer"
            >
              + Add a guideline
            </button>
          </div>
        </aside>
      </div>

      {/* Quick Add Fact Modal */}
      {showFactModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="fact-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowFactModal(false);
          }}
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="bg-card border border-border rounded-lg max-w-lg w-full p-6 space-y-4 shadow-xl cursor-default">
            <h3
              id="fact-modal-title"
              className="font-display text-[20px] text-foreground"
            >
              Add a field note to {language.name}
            </h3>
            <form onSubmit={handleQuickFactSubmit} className="space-y-4">
              <textarea
                rows={4}
                required
                maxLength={1000}
                value={modalText}
                onChange={(e) => setModalText(e.target.value)}
                placeholder="Share a verifiable technical curiosity, historical fact, or architectural quirk..."
                className="w-full p-3 bg-background border border-border rounded-md font-sans text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <div className="flex justify-end gap-3 font-mono text-[12px]">
                <button
                  type="button"
                  onClick={() => setShowFactModal(false)}
                  className="px-4 py-2 border border-border rounded text-foreground hover:bg-card cursor-pointer"
                >
                  CANCEL
                </button>
                <Button type="submit" variant="primary" disabled={submitting}>
                  {submitting ? "FILING..." : "FILE NOTE"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Add Guideline Modal */}
      {showGuidelineModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gl-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowGuidelineModal(false);
          }}
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="bg-card border border-border rounded-lg max-w-lg w-full p-6 space-y-4 shadow-xl cursor-default">
            <h3
              id="gl-modal-title"
              className="font-display text-[20px] text-foreground"
            >
              Add a guideline to {language.name}
            </h3>
            <form onSubmit={handleQuickGuidelineSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase text-muted-foreground mb-1">
                  RULE TITLE
                </label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={glForm.title}
                  onChange={(e) =>
                    setGlForm({ ...glForm, title: e.target.value })
                  }
                  placeholder="e.g. Always check errors immediately"
                  className="w-full h-9 px-3 bg-background border border-border rounded text-[14px]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-muted-foreground mb-1">
                  EXPLANATION & RATIONALE
                </label>
                <textarea
                  rows={3}
                  required
                  maxLength={3000}
                  value={glForm.body}
                  onChange={(e) =>
                    setGlForm({ ...glForm, body: e.target.value })
                  }
                  placeholder="Why this rule saves time..."
                  className="w-full p-2 bg-background border border-border rounded text-[14px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-muted-foreground mb-1">
                    WHEN TO USE
                  </label>
                  <input
                    type="text"
                    maxLength={500}
                    value={glForm.when_to_use}
                    onChange={(e) =>
                      setGlForm({ ...glForm, when_to_use: e.target.value })
                    }
                    className="w-full h-8 px-2 bg-background border border-border rounded text-[12px]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-muted-foreground mb-1">
                    AVOID
                  </label>
                  <input
                    type="text"
                    maxLength={500}
                    value={glForm.avoid}
                    onChange={(e) =>
                      setGlForm({ ...glForm, avoid: e.target.value })
                    }
                    className="w-full h-8 px-2 bg-background border border-border rounded text-[12px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 font-mono text-[12px] pt-2">
                <button
                  type="button"
                  onClick={() => setShowGuidelineModal(false)}
                  className="px-4 py-2 border border-border rounded text-foreground hover:bg-card cursor-pointer"
                >
                  CANCEL
                </button>
                <Button type="submit" variant="primary" disabled={submitting}>
                  {submitting ? "FILING..." : "FILE GUIDELINE"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
