import React from 'react';
import Link from 'next/link';
import { Badge } from './Badge';

export interface PageHeaderProps {
  badgeText?: string;
  breadcrumb?: { label: string; href?: string }[];
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  badgeText,
  breadcrumb,
  title,
  description,
  actions,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`border-b border-border-subtle pb-6 sm:pb-8 mb-8 sm:mb-10 ${className}`}>
      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-muted mb-3">
          {breadcrumb.map((item, index) => {
            const isLast = index === breadcrumb.length - 1;
            return (
              <React.Fragment key={item.label}>
                {index > 0 && <span>/</span>}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-text-primary font-medium truncate max-w-xs' : ''}>
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          {badgeText && (
            <Badge variant="tint" size="sm" hasDot className="mb-1">
              {badgeText}
            </Badge>
          )}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-text-secondary max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center flex-wrap gap-2.5 shrink-0 pt-2 lg:pt-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
