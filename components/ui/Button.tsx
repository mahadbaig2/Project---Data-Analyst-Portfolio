import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

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

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
