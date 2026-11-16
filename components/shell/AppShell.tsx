'use client';
import { Arrow } from '@/components/portfolio/Arrow';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Reveal } from '@/components/portfolio/Reveal';

const links = [
  ['Case studies', '/work'],
  ['Expertise', '/expertise'],
  ['About', '/about'],
  ['Writing', '/blog'],
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname?.startsWith('/studio')) return <>{children}</>;

  return <div className="site-frame">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="site-paper">
      <header className="site-header">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)}>Mirza Hammad Baig<span>.</span></Link>
        <nav className={open ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className={pathname === href || pathname?.startsWith(`${href}/`) ? 'active' : ''} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
        <Link className="header-cta" href="/contact" onClick={() => setOpen(false)}>Let&apos;s talk <span aria-hidden="true"><Arrow /></span></Link>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <div><p>Clear models. Validated data. Better retail and logistics decisions.</p><Link href="/contact">Let&apos;s talk <span aria-hidden="true"><Arrow /></span></Link></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Mirza Hammad Baig · Pakistan</span><div><Link href="/experience">Experience</Link><Link href="/teaching">Teaching</Link><Link href="/lab">Learning lab</Link><a href="https://www.linkedin.com/in/mirzahammadbaig1/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="https://github.com/mirzahammad1" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="mailto:mirzahammadbaig147@gmail.com">Email <Arrow /></a></div></div>
      </footer>
    </div>
    <Reveal />
  </div>;
}
