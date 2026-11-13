// src/components/guide/MonoEyebrow.jsx
import React from 'react';

export function MonoEyebrow({ children, className = '' }) {
  return (
    <div className={`font-mono text-[11px] sm:text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase ${className}`}>
      {children}
    </div>
  );
}
