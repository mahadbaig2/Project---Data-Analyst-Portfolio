import React from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-3">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-bold text-text-primary mt-4 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-sm font-bold text-text-primary mt-3 mb-1.5">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-4 my-3 text-xs sm:text-sm italic text-text-secondary">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-1.5 my-3 pl-4 list-disc marker:text-primary text-xs text-text-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-1.5 my-3 pl-4 list-decimal marker:text-primary text-xs text-text-secondary">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-surface-sidebar font-mono text-[11px] text-primary border border-border-subtle">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-primary font-medium underline underline-offset-2 hover:text-primary-dark"
        >
          {children}
        </a>
      );
    },
  },
};

export function CustomPortableText({
  value,
}: {
  value: Parameters<typeof PortableText>[0]['value'];
}) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
