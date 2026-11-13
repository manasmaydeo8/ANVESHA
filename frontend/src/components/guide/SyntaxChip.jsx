// src/components/guide/SyntaxChip.jsx
import React from 'react';

export function SyntaxChip({
  label,
  selected = false,
  onClick,
  className = '',
  size = 'md',
}) {
  const isButton = typeof onClick === 'function';
  const Component = isButton ? 'button' : 'span';

  const baseClasses = 'inline-flex items-center justify-center font-mono uppercase tracking-wider rounded-full transition-colors';
  const sizeClasses = size === 'sm'
    ? 'text-[10px] h-[22px] px-2'
    : 'text-[11px] h-[26px] px-2.5';

  const stateClasses = selected
    ? 'bg-foreground text-background font-medium'
    : 'bg-card text-foreground/80 border border-border hover:border-foreground/40 hover:text-foreground';

  return (
    <Component
      type={isButton ? 'button' : undefined}
      aria-pressed={isButton ? selected : undefined}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${stateClasses} ${isButton ? 'cursor-pointer' : ''} ${className}`}
    >
      {label}
    </Component>
  );
}
