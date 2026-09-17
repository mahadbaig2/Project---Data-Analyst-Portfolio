import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'tint' | 'soft' | 'neutral' | 'outline' | 'active';
  size?: 'sm' | 'md';
  hasDot?: boolean;
  pulseDot?: boolean;
  children: React.ReactNode;
}

export function Badge({
  variant = 'tint',
  size = 'md',
  hasDot = false,
  pulseDot = false,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 leading-tight',
    md: 'text-xs px-2.5 py-1 leading-normal',
  }[size];

  const variantStyles = {
    tint: 'bg-highlight-tint text-primary border border-primary/15 font-medium',
    soft: 'bg-highlight-soft text-primary font-medium',
    neutral: 'bg-surface-card text-text-secondary border border-border-subtle font-normal',
    outline: 'bg-transparent text-text-secondary border border-border-subtle font-normal',
    active: 'bg-primary text-on-primary font-medium',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {hasDot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulseDot && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chart-accent-mint opacity-75" />
          )}
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-chart-accent-emerald" />
        </span>
      )}
      {children}
    </span>
  );
}
