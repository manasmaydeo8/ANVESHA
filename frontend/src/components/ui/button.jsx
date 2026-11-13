// src/components/ui/button.jsx
import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm',
    secondary: 'bg-background hover:bg-card text-foreground border border-border rounded-md',
    outline: 'border border-border bg-transparent hover:bg-card text-foreground rounded-md',
    quiet: 'text-foreground hover:text-primary font-mono text-xs uppercase tracking-wider',
    danger: 'bg-red-600 text-white hover:bg-red-700 rounded-md',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-5 text-sm',
    lg: 'h-12 px-6 text-base',
    icon: 'h-8 w-8 p-0',
  };

  const sizeClass = variant === 'quiet' ? 'p-1' : sizes[size] || sizes.md;
  const variantClass = variants[variant] || variants.primary;

  return (
    <button
      className={`${base} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
