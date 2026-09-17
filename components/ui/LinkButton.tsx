import React from 'react';
import Link from 'next/link';
import { Icons } from './Icons';

export interface LinkButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  isExternal?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  isExternal = false,
  className = '',
  onClick,
  children,
}: LinkButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 group cursor-pointer';

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-primary hover:bg-primary-hover text-on-primary shadow-sm active:translate-y-px',
    secondary:
      'bg-surface-card hover:bg-surface-muted text-text-primary border border-border-subtle hover:border-border-hover shadow-sm',
    outline:
      'bg-transparent hover:bg-surface-muted text-text-primary border border-border-subtle hover:border-border-hover',
    ghost:
      'bg-transparent hover:bg-surface-muted text-text-secondary hover:text-text-primary',
  }[variant];

  const content = (
    <>
      {children}
      {showArrow && (
        <Icons.arrow_forward
          size={size === 'sm' ? 14 : 16}
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        />
      )}
      {isExternal && !showArrow && (
        <Icons.external
          size={12}
          className="text-text-muted transition-transform duration-150 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (isExternal || href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
    >
      {content}
    </Link>
  );
}
