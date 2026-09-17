import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'surface' | 'ghost' | 'outline';
  children: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      'aria-label': ariaLabel,
      size = 'md',
      variant = 'ghost',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'w-7 h-7 p-1',
      md: 'w-8 h-8 p-1.5',
      lg: 'w-10 h-10 p-2',
    }[size];

    const variantStyles = {
      surface:
        'bg-surface-card hover:bg-surface-muted text-text-secondary hover:text-text-primary border border-border-subtle shadow-xs',
      ghost:
        'bg-transparent hover:bg-surface-muted text-text-secondary hover:text-text-primary',
      outline:
        'bg-transparent hover:bg-surface-muted text-text-secondary hover:text-text-primary border border-border-subtle',
    }[variant];

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
