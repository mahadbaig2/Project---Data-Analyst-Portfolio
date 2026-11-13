'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.09, rootMargin: '0px 0px -30px 0px' });
    const timer = window.setTimeout(() => elements.forEach((element) => observer.observe(element)), 400);
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, [pathname]);
  return null;
}
