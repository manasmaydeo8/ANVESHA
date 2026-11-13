// src/components/guide/SpecimenRow.jsx
import React from 'react';
import { NewStamp } from './NewStamp';
import { LanguageIcon } from './LanguageIcon';

export function SpecimenRow({ language, onSelect }) {
  const specimenStr = String(language.specimen_no || 1).padStart(3, '0');
  const mainParadigm = language.paradigms?.[0] || 'GENERAL';
  const rulesCount = language.guidelines_count || 2;
  const factsCount = language.facts_count || 3;

  // Check if entry was created in the last 7 days
  const isNew = language.created_at && (Date.now() - new Date(language.created_at).getTime()) < 7 * 86400 * 1000 && !language.seeded;

  return (
    <div
      onClick={() => onSelect && onSelect(language.slug)}
      className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-5 px-3 -mx-3 rounded-md hover:bg-card/70 transition-colors duration-150 cursor-pointer hairline-b"
    >
      {/* Left: Icon + Specimen No + Name + Summary */}
      <div className="flex items-start gap-3 sm:gap-4 max-w-2xl">
        <LanguageIcon language={language} size="sm" className="mt-0.5" />
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
          <span className="font-mono text-[12px] sm:text-[13px] text-muted-foreground whitespace-nowrap tracking-wide w-16">
            NO. {specimenStr}
          </span>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-display text-[24px] sm:text-[26px] font-normal text-foreground group-hover:text-primary transition-colors">
                {language.name}
              </h3>
              {isNew && <NewStamp />}
            </div>
            <p className="text-[14px] sm:text-[15px] text-muted-foreground font-sans line-clamp-2 mt-0.5 leading-relaxed">
              {language.tagline || language.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Right: Metadata */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 mt-3 sm:mt-0 font-mono text-[11px] sm:text-[12px] text-muted-foreground whitespace-nowrap">
        <span>{language.year}</span>
        <span className="uppercase text-[10px] sm:text-[11px] tracking-wider">{mainParadigm}</span>
        <span className="text-[10px] sm:text-[11px] tracking-wider">
          {factsCount} {factsCount === 1 ? 'NOTE' : 'NOTES'} · {rulesCount} {rulesCount === 1 ? 'RULE' : 'RULES'}
        </span>
      </div>
    </div>
  );
}
