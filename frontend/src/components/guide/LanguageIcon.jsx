// src/components/guide/LanguageIcon.jsx
import React from 'react';

// Known brand-ish colors for the seeded specimens. Anything not listed here
// (i.e. every community-contributed language) still gets a badge via the
// deterministic fallback below, so every specimen always has one.
const KNOWN = {
  python: { label: 'PY', color: '#3776AB' },
  javascript: { label: 'JS', color: '#C9A227' },
  typescript: { label: 'TS', color: '#3178C6' },
  rust: { label: 'RS', color: '#B7410E' },
  go: { label: 'GO', color: '#00ADD8' },
  c: { label: 'C', color: '#5C6BC0' },
  haskell: { label: 'HS', color: '#5E5086' },
  ruby: { label: 'RB', color: '#CC342D' },
  elixir: { label: 'EX', color: '#6E4A7E' },
  zig: { label: 'ZG', color: '#F7A41D' },
};

// Deterministic hue from a string, so a given language always gets the same
// fallback color without needing it hardcoded.
function hashHue(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 360;
}

function fallbackLabel(name) {
  const words = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return String(name || '??').replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || '??';
}

function colorsFor(slug, name) {
  const known = KNOWN[slug];
  if (known) return { bg: `${known.color}1F`, fg: known.color, label: known.label };
  const hue = hashHue(slug || name || 'x');
  return {
    bg: `hsl(${hue} 55% 42% / 0.14)`,
    fg: `hsl(${hue} 55% 36%)`,
    label: fallbackLabel(name),
  };
}

const SIZES = {
  sm: 'w-9 h-9 text-[11px] rounded-md',
  md: 'w-12 h-12 text-[13px] rounded-lg',
  lg: 'w-16 h-16 text-[18px] rounded-lg',
};

export function LanguageIcon({ language, size = 'sm', className = '' }) {
  const { bg, fg, label } = colorsFor(language?.slug, language?.name);
  return (
    <div
      aria-hidden="true"
      title={language?.name}
      className={`shrink-0 inline-flex items-center justify-center font-mono font-semibold tracking-wide select-none border border-black/5 dark:border-white/10 ${SIZES[size] || SIZES.sm} ${className}`}
      style={{ backgroundColor: bg, color: fg }}
    >
      {label}
    </div>
  );
}
