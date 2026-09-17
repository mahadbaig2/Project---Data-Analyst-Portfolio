'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';
import { LinkButton } from '@/components/ui/LinkButton';
import { Icons } from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';

export function TopUtilityBar() {
  const pathname = usePathname();

  const getRouteLabel = () => {
    if (pathname === '/') return 'Overview';
    if (pathname.startsWith('/work/')) return 'Case Study Detail';
    if (pathname === '/work') return 'Case Studies';
    if (pathname === '/experience') return 'Career Journey';
    if (pathname === '/expertise') return 'Capabilities & Architecture';
    if (pathname === '/teaching') return 'Teaching & Mentoring';
    if (pathname === '/writing') return 'Thought Leadership';
    if (pathname === '/about') return 'About & Contact';
    return 'Workspace';
  };

  return (
    <header className="hidden lg:block sticky top-0 z-20 bg-surface-card border-b border-border-subtle shadow-xs">
      <div className="flex justify-between items-center h-14 px-6 lg:px-8 w-full max-w-[1600px] mx-auto">
        {/* Left: Breadcrumb / Scope Context */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="font-semibold text-text-primary tracking-tight">
              Enterprise BI Workspace
            </span>
            <span className="text-border-subtle">/</span>
            <span className="text-text-primary truncate">
              {PROFILE_IDENTITY.name}
            </span>
            <span className="text-border-subtle">/</span>
            <span className="text-primary font-medium bg-highlight-tint px-2 py-0.5 rounded text-[11px]">
              {getRouteLabel()}
            </span>
          </div>
        </div>

        {/* Right: Operational Status & Utility Actions */}
        <div className="flex items-center gap-3">
          {/* Status Pill */}
          <div className="hidden xl:flex items-center">
            <Badge variant="tint" size="sm" hasDot pulseDot>
              {PROFILE_IDENTITY.status}
            </Badge>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <LinkButton
              href={PROFILE_IDENTITY.cvUrl}
              variant="secondary"
              size="sm"
              isExternal
            >
              <Icons.download size={14} className="text-text-secondary mr-1" />
              <span>Download CV</span>
            </LinkButton>

            <LinkButton
              href="/work"
              variant="primary"
              size="sm"
              showArrow
            >
              View Work
            </LinkButton>
          </div>
        </div>
      </div>
    </header>
  );
}
