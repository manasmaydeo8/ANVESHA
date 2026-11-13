// src/components/guide/EmptyState.jsx
import React from 'react';
import { Button } from '../ui/button';

export function EmptyState({
  title = 'No specimens match.',
  description = 'Try widening your search terms or clearing your selected filters.',
  actionText = 'Clear filters',
  onAction,
}) {
  return (
    <div className="bg-card/70 border border-border/80 rounded-lg p-8 sm:p-12 text-center my-6">
      <h3 className="font-display text-[22px] sm:text-[24px] text-foreground mb-2">
        {title}
      </h3>
      <p className="text-[14px] sm:text-[15px] text-muted-foreground font-sans max-w-md mx-auto mb-6">
        {description}
      </p>
      {onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
