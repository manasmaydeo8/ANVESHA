// src/components/guide/NewStamp.jsx
import React from 'react';

export function NewStamp({ className = '' }) {
  return (
    <span className={`inline-block font-mono text-[9px] font-semibold uppercase tracking-wider text-primary border border-primary/50 px-1.5 py-0.5 rounded-[2px] bg-primary/5 ${className}`}>
      NEW ENTRY
    </span>
  );
}
