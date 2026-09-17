'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CANONICAL_NAVIGATION, PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';
import { Icons } from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll and handle Escape key when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const isRouteActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#') || href.includes('#')) {
      const basePath = href.split('#')[0];
      return basePath ? pathname === basePath : false;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-40 h-14 bg-surface-card/95 backdrop-blur-md border-b border-border-subtle px-4 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shrink-0">
            MH
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-text-primary truncate">
              {PROFILE_IDENTITY.name}
            </span>
            <span className="text-[10px] text-text-secondary truncate">
              {PROFILE_IDENTITY.role}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="tint" size="sm" hasDot pulseDot className="hidden sm:inline-flex">
            Available
          </Badge>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-drawer"
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {isOpen ? <Icons.close size={20} /> : <Icons.menu size={20} />}
          </button>
        </div>
      </header>

      {/* Slide-over Drawer & Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div
            ref={drawerRef}
            id="mobile-navigation-drawer"
            className="relative ml-auto w-full max-w-xs h-full bg-surface-sidebar border-l border-border-subtle shadow-xl flex flex-col justify-between overflow-y-auto custom-scroll p-4 z-10"
          >
            {/* Top drawer header */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                    MH
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">
                      {PROFILE_IDENTITY.name}
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      {PROFILE_IDENTITY.role}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-muted transition-colors"
                >
                  <Icons.close size={18} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
                {CANONICAL_NAVIGATION.map((item) => {
                  const active = isRouteActive(item.href);
                  const IconComponent = Icons[item.icon];

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                        active
                          ? 'bg-surface-card text-primary font-medium shadow-xs border border-border-subtle border-l-4 border-l-primary'
                          : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                      }`}
                    >
                      {IconComponent && (
                        <IconComponent
                          size={18}
                          className={active ? 'text-primary' : 'text-text-muted'}
                        />
                      )}
                      <span>{item.label}</span>
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-chart-accent-emerald" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="flex flex-col gap-3 pt-4 border-t border-border-subtle mt-6">
              <LinkButton
                href={PROFILE_IDENTITY.cvUrl}
                variant="secondary"
                size="sm"
                isExternal
                className="w-full justify-center"
              >
                <Icons.download size={14} className="mr-1" />
                <span>Download CV</span>
              </LinkButton>

              <LinkButton
                href="/about#contact"
                variant="primary"
                size="sm"
                className="w-full justify-center"
                onClick={() => setIsOpen(false)}
              >
                Schedule Consultation
              </LinkButton>

              {/* Social Channels in Drawer */}
              <div className="flex items-center justify-center gap-3 pt-2 text-text-secondary">
                {PROFILE_IDENTITY.socialLinks.map((social) => {
                  const IconComponent = Icons[social.platform];
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      target={social.platform === 'email' ? undefined : '_blank'}
                      rel={social.platform === 'email' ? undefined : 'noopener noreferrer'}
                      title={social.label}
                      className="p-2 hover:text-primary hover:bg-surface-muted rounded-lg transition-colors"
                    >
                      {IconComponent && <IconComponent size={16} />}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
