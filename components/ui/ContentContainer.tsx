import React from 'react';

export interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full';
  children: React.ReactNode;
}

export function ContentContainer({
  size = 'default',
  className = '',
  children,
  ...props
}: ContentContainerProps) {
  const sizeStyles = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1600px]',
    full: 'max-w-full',
  }[size];

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
