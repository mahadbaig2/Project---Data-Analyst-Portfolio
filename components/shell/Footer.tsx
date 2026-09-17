import React from 'react';
import Link from 'next/link';
import { PROFILE_IDENTITY, CANONICAL_NAVIGATION } from '@/lib/fixtures/portfolio';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface-card mt-auto py-8 sm:py-10 text-xs text-text-secondary">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border-subtle">
          <div className="space-y-1 max-w-md">
            <p className="font-semibold text-text-primary tracking-tight">
              {PROFILE_IDENTITY.name}
            </p>
            <p className="text-[11px] text-text-muted">
              {PROFILE_IDENTITY.role} · {PROFILE_IDENTITY.valueChain}
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {CANONICAL_NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-primary transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 text-[11px] text-text-muted">
          <p>© {currentYear} Mirza Hammad Baig. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-chart-accent-emerald" />
            <span>Executive Analytics Workspace Metaphor · Light Enterprise Aesthetic</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
