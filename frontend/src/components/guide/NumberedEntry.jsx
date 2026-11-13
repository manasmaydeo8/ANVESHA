// src/components/guide/NumberedEntry.jsx
import React from 'react';
import { ArrowBigUp, Trash2 } from 'lucide-react';

export function NumberedEntry({
  index,
  title,
  body,
  whenToUse,
  avoid,
  author,
  votes = 0,
  voted = false,
  onVote,
  onDelete,
  canDelete = false,
  className = '',
}) {
  const indexStr = String(index).padStart(2, '0');

  return (
    <div className={`py-5 hairline-t group ${className}`}>
      <div className="flex items-start gap-4 sm:gap-6">
        {/* Vermilion Index Stamp */}
        <span className="font-mono text-[14px] font-semibold text-primary select-none pt-0.5 w-6">
          {indexStr}
        </span>

        {/* Content */}
        <div className="flex-1 space-y-3">
          {title && (
            <h4 className="font-sans font-semibold text-[16px] text-foreground tracking-tight">
              {title}
            </h4>
          )}

          <div className="text-[15px] text-foreground/90 font-sans leading-relaxed">
            {body}
          </div>

          {(whenToUse || avoid) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {whenToUse && (
                <div className="bg-card/50 border border-border/60 rounded-md p-3">
                  <div className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                    WHEN TO USE
                  </div>
                  <div className="text-[13px] text-foreground font-sans leading-snug">
                    {whenToUse}
                  </div>
                </div>
              )}
              {avoid && (
                <div className="bg-card/50 border border-border/60 rounded-md p-3">
                  <div className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-1 text-primary">
                    AVOID
                  </div>
                  <div className="text-[13px] text-foreground font-sans leading-snug">
                    {avoid}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer: Author + Vote toggle + Delete if owner */}
          <div className="flex items-center justify-between pt-1">
            <div className="font-mono text-[11px] text-muted-foreground">
              FILED BY <span className="text-foreground">{author || 'Curator'}</span>
            </div>

            <div className="flex items-center gap-3">
              {canDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  title="Delete entry"
                  className="font-mono text-[11px] text-muted-foreground hover:text-red-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  DELETE
                </button>
              )}

              {onVote && (
                <button
                  type="button"
                  onClick={onVote}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded border text-xs font-mono transition-colors cursor-pointer ${
                    voted
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
                  }`}
                >
                  <ArrowBigUp className={`w-3.5 h-3.5 ${voted ? 'fill-current' : ''}`} />
                  <span>{votes}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
