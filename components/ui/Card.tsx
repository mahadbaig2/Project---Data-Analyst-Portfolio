import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export function Card({
  as: Component = 'div',
  hoverable = false,
  padding = 'lg',
  className = '',
  children,
  ...props
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-5',
    lg: 'p-5 sm:p-6',
    xl: 'p-6 sm:p-8',
  }[padding];

  return (
    <Component
      className={`bg-surface-card rounded-xl border border-border-subtle card-shadow ${
        hoverable ? 'card-hover-fx cursor-pointer' : ''
      } ${paddingStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
