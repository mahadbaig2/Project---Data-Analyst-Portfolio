'use client';
import { Arrow } from '@/components/portfolio/Arrow';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Reveal } from '@/components/portfolio/Reveal';
import { PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';

const links = [
  ['Work', '/work'],
  ['About', '/about'],
  ['Expertise', '/expertise'],
  ['Experience', '/experience'],
  ['Teaching', '/teaching'],
  ['Blog', '/blog'],
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname?.startsWith('/studio')) return <>{children}</>;

  return <div className="site-frame">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="site-paper">
      <header className="site-header">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)}>Hammad Baig<span>.</span></Link>
        <nav className={open ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className={pathname === href ? 'active' : ''} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
        <a className="header-cta" href={`mailto:${PROFILE_IDENTITY.email}`}>Let&apos;s talk <span aria-hidden="true"><Arrow /></span></a>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <div><p>Thanks for looking through my portfolio.</p><a href={`mailto:${PROFILE_IDENTITY.email}`}>Let&apos;s talk <span aria-hidden="true"><Arrow /></span></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Mirza Hammad Baig</span><div><a href="https://www.linkedin.com/in/mirzahammadbaig1/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="https://github.com/mirzahammad1" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="mailto:mirzahammadbaig147@gmail.com">Email <Arrow /></a></div></div>
      </footer>
    </div>
    <Reveal />
  </div>;
}
