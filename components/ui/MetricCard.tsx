import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

export interface MetricCardProps {
  overline: string;
  value: string;
  tag?: string;
  description: string;
  className?: string;
}

export function MetricCard({
  overline,
  value,
  tag,
  description,
  className = '',
}: MetricCardProps) {
  return (
    <Card padding="lg" className={`flex flex-col justify-between gap-3 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          {overline}
        </span>
        {tag && (
          <Badge variant="tint" size="sm">
            {tag}
          </Badge>
        )}
      </div>

      <div className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
        {value}
      </div>

      <p className="text-xs text-text-secondary leading-relaxed">
        {description}
      </p>
    </Card>
  );
}
