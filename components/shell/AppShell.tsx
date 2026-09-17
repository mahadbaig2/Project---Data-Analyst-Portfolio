import React from 'react';
import { Sidebar } from './Sidebar';
import { TopUtilityBar } from './TopUtilityBar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-canvas text-text-primary">
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Desktop Persistent Left Sidebar (Fixed 72 / 288px) */}
      <Sidebar />

      {/* Main Layout Area offset on desktop by sidebar width */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen">
        {/* Mobile Top Bar & Drawer (lg:hidden) */}
        <MobileNav />

        {/* Desktop Workspace Top Bar (hidden on mobile, visible on desktop) */}
        <TopUtilityBar />

        {/* Primary Content Landmark */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col focus:outline-none"
        >
          {children}
        </main>

        {/* Shared Footer */}
        <Footer />
      </div>
    </div>
  );
}
