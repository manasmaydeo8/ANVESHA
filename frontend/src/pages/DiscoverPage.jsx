import React, { useState, useEffect, useCallback } from "react";
import { api } from "../lib/api";
import { MonoEyebrow } from "../components/guide/MonoEyebrow";
import { SyntaxChip } from "../components/guide/SyntaxChip";
import { SpecimenRow } from "../components/guide/SpecimenRow";
import { EmptyState } from "../components/guide/EmptyState";
import { NewStamp } from "../components/guide/NewStamp";
import { Button } from "../components/ui/button";
import { Search, Sparkles } from "lucide-react";

export function DiscoverPage({ onNavigate }) {
  const [languages, setLanguages] = useState([]);
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search & Sort
  const [search, setSearch] = useState("");
  const [selectedParadigm, setSelectedParadigm] = useState("");
  const [selectedEra, setSelectedEra] = useState("");
  const [sortBy, setSortBy] = useState("specimen"); // 'specimen' | 'newest' | 'notes'

  const paradigms = [
    "SCRIPTING",
    "FUNCTIONAL",
    "SYSTEMS",
    "OBJECT-ORIENTED",
    "CONCURRENT",
    "DATA",
  ];
  const eras = ["1970S", "1980S", "1990S", "2000S", "2010S", "2020S"];

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedParadigm) params.set("paradigm", selectedParadigm);
      if (selectedEra) params.set("era", selectedEra);
      if (search.trim()) params.set("search", search.trim());
      if (sortBy) params.set("sort", sortBy);

      const [langsData, statsData, activityData] = await Promise.all([
        api(`/api/languages?${params.toString()}`),
        api("/api/stats").catch(() => null),
        api("/api/activity?limit=6").catch(() => []),
      ]);

      setLanguages(langsData);
      if (statsData) setStats(statsData);
      if (activityData) setActivity(activityData);
    } catch (err) {
      setError(err.message || "Failed to load specimens");
    } finally {
      setLoading(false);
    }
  }, [selectedParadigm, selectedEra, search, sortBy]);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        fetchData();
      },
      search ? 200 : 0,
    );
    return () => clearTimeout(timer);
  }, [fetchData, search]);

  const clearFilters = () => {
    setSearch("");
    setSelectedParadigm("");
    setSelectedEra("");
    setSortBy("specimen");
  };

  return (
    <div className="space-y-16">
      {/* Masthead Band */}
      <section className="pt-4 pb-10 border-b border-border/80">
        <MonoEyebrow className="mb-3">A SELF-GROWING FIELD GUIDE</MonoEyebrow>
        <h1 className="font-display text-[44px] sm:text-[56px] text-foreground tracking-tight leading-[1.1] mb-5 max-w-3xl">
          Every language, in the field.
        </h1>
        <p className="text-[16px] sm:text-[18px] text-muted-foreground font-sans leading-relaxed max-w-2xl mb-8">
          A living, community-curated manual documenting programming languages,
          their historical curiosities, and pragmatic design rules.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="primary"
            onClick={() => {
              const el = document.getElementById("specimens-index");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Browse the guide
          </Button>
          <Button variant="secondary" onClick={() => onNavigate("/contribute")}>
            Contribute an entry
          </Button>
        </div>

        {/* Live Growth Counters */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border/60 font-mono text-[12px]">
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                SPECIMENS
              </span>
              <span className="text-foreground text-[18px] font-semibold">
                {stats.languages}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                FIELD NOTES
              </span>
              <span className="text-foreground text-[18px] font-semibold">
                {stats.facts}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                GUIDELINES
              </span>
              <span className="text-foreground text-[18px] font-semibold">
                {stats.guidelines}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                CONTRIBUTORS
              </span>
              <span className="text-foreground text-[18px] font-semibold">
                {stats.contributors}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* The Complete Index (Matches Image 2) */}
      <section id="specimens-index" className="space-y-6">
        <div>
          <MonoEyebrow className="mb-2">THE COMPLETE INDEX</MonoEyebrow>
          <h2 className="font-display text-[36px] sm:text-[44px] text-foreground tracking-tight leading-tight mb-2">
            Specimens, newest and oldest.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-muted-foreground font-sans max-w-2xl leading-relaxed">
            Every language filed in the guide, numbered in the order it arrived.
            Filter by paradigm or decade, or search a trait you half-remember.
          </p>
        </div>

        {/* Search & Filter Rail (Matches Image 2) */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            {/* Search input with magnifying glass */}
            <div className="relative min-w-[280px] max-w-md">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                aria-label="Search languages by name, paradigm, or notes"
                maxLength={100}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="SEARCH NAMES, PARADIGMS, NOTES..."
                className="w-full h-10 pl-10 pr-4 bg-background border border-border rounded-md font-mono text-[12px] uppercase tracking-wider text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
              />
            </div>

            {/* Paradigms and Eras Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
              {paradigms.map((p) => {
                const isSelected =
                  selectedParadigm.toLowerCase() === p.toLowerCase();
                return (
                  <SyntaxChip
                    key={p}
                    label={p}
                    selected={isSelected}
                    onClick={() =>
                      setSelectedParadigm(isSelected ? "" : p.toLowerCase())
                    }
                  />
                );
              })}

              <div className="w-[1px] h-4 bg-border mx-1 self-center" />

              {eras.map((era) => {
                const isSelected =
                  selectedEra.toLowerCase() === era.toLowerCase();
                return (
                  <SyntaxChip
                    key={era}
                    label={era}
                    selected={isSelected}
                    onClick={() =>
                      setSelectedEra(isSelected ? "" : era.toLowerCase())
                    }
                  />
                );
              })}
            </div>
          </div>

          {/* Sub-bar: Count & Sort Toggles */}
          <div className="flex items-center justify-between pt-3 pb-1 border-b border-border/80 font-mono text-[11px] sm:text-[12px]">
            <span className="text-muted-foreground tracking-wider uppercase">
              {loading
                ? "LOOKING UP SPECIMENS..."
                : `${languages.length} SPECIMENS`}
            </span>

            {/* Sort toggles */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => setSortBy("specimen")}
                className={`uppercase tracking-wider transition-colors cursor-pointer ${
                  sortBy === "specimen"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                BY SPECIMEN NO.
              </button>
              <button
                onClick={() => setSortBy("newest")}
                className={`uppercase tracking-wider transition-colors cursor-pointer ${
                  sortBy === "newest"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                NEWEST FIRST
              </button>
              <button
                onClick={() => setSortBy("notes")}
                className={`uppercase tracking-wider transition-colors cursor-pointer ${
                  sortBy === "notes"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                MOST NOTES
              </button>
            </div>
          </div>
        </div>

        {/* Index Rows + Right Rail Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-10 items-start pt-2">
          {/* Main Index Rows */}
          <div>
            {loading ? (
              <div className="space-y-4 py-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="py-5 hairline-b animate-pulse flex justify-between items-baseline"
                  >
                    <div className="space-y-2 max-w-md w-full">
                      <div className="h-3 w-16 bg-muted rounded" />
                      <div className="h-6 w-48 bg-muted rounded" />
                      <div className="h-4 w-full bg-muted rounded" />
                    </div>
                    <div className="space-y-1.5 flex flex-col items-end">
                      <div className="h-3 w-10 bg-muted rounded" />
                      <div className="h-3 w-16 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <EmptyState
                title="Failed to retrieve specimens."
                description={error}
                actionText="Retry"
                onAction={fetchData}
              />
            ) : languages.length === 0 ? (
              <EmptyState
                title="No specimens match."
                description="No languages matched your filter and query criteria."
                actionText="Clear filters"
                onAction={clearFilters}
              />
            ) : (
              <div className="divide-y-0">
                {languages.map((lang) => (
                  <SpecimenRow
                    key={lang.slug}
                    language={lang}
                    onSelect={(slug) => onNavigate(`/languages/${slug}`)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Rail: Recently Added / Filed Activity */}
          <aside className="bg-card/40 border border-border/80 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border/80">
              <span className="font-mono text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                RECENTLY FILED
              </span>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>

            <div className="space-y-4">
              {activity.length === 0 ? (
                <p className="font-mono text-[11px] text-muted-foreground">
                  Guide entries will appear here.
                </p>
              ) : (
                activity.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      item.language_slug &&
                      onNavigate(`/languages/${item.language_slug}`)
                    }
                    className="group cursor-pointer space-y-1 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-muted-foreground uppercase">
                        {item.type}
                      </span>
                      <NewStamp />
                    </div>
                    <p className="font-sans text-[13px] text-foreground leading-snug font-medium line-clamp-2">
                      {item.title}
                    </p>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      BY {item.author}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-border/80">
              <button
                onClick={() => onNavigate("/contribute")}
                className="w-full py-2 bg-background border border-border rounded text-center font-mono text-[11px] uppercase tracking-wider text-foreground hover:bg-card transition-colors cursor-pointer"
              >
                + File an entry
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
