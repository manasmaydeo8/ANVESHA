// src/components/guide/DarkCodeBlock.jsx
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const EXT_MAP = {
  python: 'py',
  rust: 'rs',
  javascript: 'js',
  typescript: 'ts',
  go: 'go',
  c: 'c',
  haskell: 'hs',
  ruby: 'rb',
  elixir: 'ex',
  zig: 'zig',
};

export function DarkCodeBlock({ code, language = 'plaintext', filename = 'hello_world' }) {
  const [copied, setCopied] = useState(false);
  const ext = EXT_MAP[language?.toLowerCase()] || 'txt';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden bg-foreground text-background border border-foreground/20 shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-background/10 bg-background/5 text-[12px] font-mono">
        <span className="text-background/70 font-medium">
          {filename}.{ext}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-background/60 hover:text-background text-[11px] uppercase tracking-wider font-mono transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span>COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <pre
        role="region"
        aria-label={`${language} code specimen`}
        tabIndex={0}
        className="p-5 font-mono text-[13px] sm:text-[14px] leading-relaxed overflow-x-auto text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
