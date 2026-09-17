import React from 'react';

export interface SectionHeadingProps {
  overline?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  overline,
  title,
  description,
  action,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 ${className}`}>
      <div className="space-y-1">
        {overline && (
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            {overline}
          </p>
        )}
        <h2 className="text-xl sm:text-[22px] font-semibold text-text-primary tracking-tight leading-snug">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
