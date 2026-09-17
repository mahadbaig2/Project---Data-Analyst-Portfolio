import React from 'react';

export default function Loading() {
  return (
    <div className="w-full space-y-6 animate-pulse" aria-label="Loading content" role="status">
      {/* Header skeleton */}
      <div className="border-b border-border-subtle pb-6 space-y-3">
        <div className="h-4 w-28 bg-surface-muted rounded-full" />
        <div className="h-8 w-64 sm:w-96 bg-surface-muted rounded-lg" />
        <div className="h-4 w-full max-w-xl bg-surface-muted rounded" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 rounded-xl bg-surface-card border border-border-subtle p-5 space-y-3"
          >
            <div className="h-3 w-20 bg-surface-muted rounded" />
            <div className="h-8 w-24 bg-surface-muted rounded" />
            <div className="h-3 w-full bg-surface-muted rounded" />
          </div>
        ))}
      </div>

      {/* Main card skeleton */}
      <div className="h-64 rounded-xl bg-surface-card border border-border-subtle p-6 space-y-4">
        <div className="h-4 w-40 bg-surface-muted rounded" />
        <div className="h-4 w-full bg-surface-muted rounded" />
        <div className="h-4 w-3/4 bg-surface-muted rounded" />
        <div className="h-32 w-full bg-surface-muted rounded-lg" />
      </div>
    </div>
  );
}
