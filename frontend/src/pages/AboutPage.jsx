// src/pages/AboutPage.jsx
import React from "react";
import { MonoEyebrow } from "../components/guide/MonoEyebrow";
import { Button } from "../components/ui/button";

export function AboutPage({ onNavigate }) {
  return (
    <div className="max-w-[720px] mx-auto space-y-12">
      <div>
        <MonoEyebrow className="mb-2">EDITORIAL COLOPHON</MonoEyebrow>
        <h1 className="font-display text-[40px] sm:text-[48px] text-foreground tracking-tight leading-tight mb-4">
          ANVESHA
        </h1>
        <p className="font-sans text-[18px] text-muted-foreground leading-relaxed">
          A physical-editorial compendium designed as a hand-bound manual for
          software practitioners, documenting the design tradeoffs, historical
          curiosities, and idioms of programming languages.
        </p>
      </div>

      <section className="space-y-4 font-serif text-[17px] leading-[1.7] text-foreground/90">
        <h2 className="font-display text-[26px] text-foreground">
          Why a Field Guide?
        </h2>
        <p>
          Programming languages are rarely pure mathematical abstractions in
          isolation; they are shaped by their creators' eras, hardware
          constraints, human biases, and accidental successes.
        </p>
        <p>
          Instead of generic reference sheets or SaaS documentation portals,
          this project adopts the visual and conceptual rigor of a naturalist's
          field notebook: numbered specimen pages, hairline typographic
          divisions, and verifiable rules of thumb tested in production.
        </p>
      </section>

      <section className="space-y-4 font-serif text-[17px] leading-[1.7] text-foreground/90 hairline-t pt-8">
        <h2 className="font-display text-[26px] text-foreground">
          The Three Entry Classes
        </h2>
        <div className="space-y-4 font-sans text-[15px]">
          <div className="p-4 bg-card/60 border border-border/80 rounded-md">
            <span className="font-mono text-[11px] font-semibold text-primary block mb-1">
              01 / SPECIMEN PAGES
            </span>
            <p className="text-foreground">
              A comprehensive profile of a programming language detailing
              execution semantics, typing system, paradigms, and an illustrative
              syntax sample.
            </p>
          </div>

          <div className="p-4 bg-card/60 border border-border/80 rounded-md">
            <span className="font-mono text-[11px] font-semibold text-primary block mb-1">
              02 / FIELD NOTES
            </span>
            <p className="text-foreground">
              Verifiable historical anomalies, linguistic quirks, or compiler
              behaviors that surprise even veteran practitioners.
            </p>
          </div>

          <div className="p-4 bg-card/60 border border-border/80 rounded-md">
            <span className="font-mono text-[11px] font-semibold text-primary block mb-1">
              03 / PRACTICAL GUIDELINES
            </span>
            <p className="text-foreground">
              Actionable rules of engagement with explicit "When to Use" and
              "Avoid" constraints that have saved real engineering hours.
            </p>
          </div>
        </div>
      </section>

      <div className="pt-6 border-t border-border/80 flex items-center justify-between">
        <Button variant="secondary" onClick={() => onNavigate("/")}>
          Browse all specimens
        </Button>
        <Button variant="primary" onClick={() => onNavigate("/contribute")}>
          File an entry
        </Button>
      </div>
    </div>
  );
}
