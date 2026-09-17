'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CANONICAL_NAVIGATION, PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';
import { Icons } from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';

export function Sidebar() {
  const pathname = usePathname();

  const isRouteActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href.startsWith('/#') || href.includes('#')) {
      const basePath = href.split('#')[0];
      return basePath ? pathname === basePath : false;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      aria-label="Sidebar Navigation"
      className="hidden lg:flex fixed top-0 left-0 h-screen w-72 flex-col justify-between bg-surface-sidebar border-r border-border-subtle z-30 overflow-y-auto custom-scroll p-4"
    >
      {/* Top Section: Identity & Bio */}
      <div className="flex flex-col gap-3.5">
        {/* Profile Identity */}
        <div className="flex items-center gap-3 pt-1">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border-subtle shrink-0 bg-primary-container text-on-primary flex items-center justify-center font-bold text-base shadow-xs">
            <span>MH</span>
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-chart-accent-mint rounded-full ring-2 ring-surface-sidebar"
              title={PROFILE_IDENTITY.status}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-text-primary tracking-tight truncate">
              {PROFILE_IDENTITY.name}
            </span>
            <span className="text-xs text-text-secondary truncate">
              {PROFILE_IDENTITY.role}
            </span>
          </div>
        </div>

        {/* Narrative & Descriptor */}
        <div className="p-3 bg-surface-card rounded-lg border border-border-subtle">
          <div className="flex items-center gap-1.5 mb-1 text-chart-accent-emerald">
            <Icons.account_tree size={13} />
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              {PROFILE_IDENTITY.descriptor}
            </span>
          </div>
          <p className="text-xs text-text-secondary leading-snug">
            {PROFILE_IDENTITY.summary}
          </p>
        </div>

        {/* Social Channels */}
        <div className="flex items-center justify-between px-1 py-0.5 border-b border-border-subtle pb-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            Channels
          </span>
          <div className="flex items-center gap-1.5 text-text-secondary">
            {PROFILE_IDENTITY.socialLinks.map((social) => {
              const IconComponent = Icons[social.platform];
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target={social.platform === 'email' ? undefined : '_blank'}
                  rel={social.platform === 'email' ? undefined : 'noopener noreferrer'}
                  title={social.label}
                  className="p-1.5 hover:text-primary hover:bg-surface-muted rounded transition-colors"
                >
                  {IconComponent && <IconComponent size={14} />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Canonical Navigation Menu */}
        <nav aria-label="Main Navigation" className="flex flex-col gap-1">
          {CANONICAL_NAVIGATION.map((item) => {
            const active = isRouteActive(item.href);
            const IconComponent = Icons[item.icon];

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                  active
                    ? 'bg-surface-card text-primary font-medium shadow-xs border border-border-subtle border-l-4 border-l-primary'
                    : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                }`}
              >
                {IconComponent && (
                  <IconComponent
                    size={17}
                    className={active ? 'text-primary' : 'text-text-muted'}
                  />
                )}
                <span className="truncate">{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-chart-accent-emerald" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Stack & Status */}
      <div className="flex flex-col gap-3 pt-3 border-t border-border-subtle mt-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted block mb-2">
            Core Stack
          </span>
          <div className="flex flex-wrap gap-1">
            {PROFILE_IDENTITY.coreStack.map((tech) => (
              <Badge key={tech} variant="tint" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <LinkButton
          href="/about#contact"
          variant="primary"
          size="sm"
          className="w-full justify-center"
        >
          Contact / Inquire
        </LinkButton>

        {/* Availability status line */}
        <div className="flex items-center justify-between text-[11px] text-text-muted pt-1 px-1">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-chart-accent-mint animate-pulse" />
            <span>Available</span>
          </span>
          <span className="text-text-muted">Enterprise BI</span>
        </div>
      </div>
    </aside>
  );
}
