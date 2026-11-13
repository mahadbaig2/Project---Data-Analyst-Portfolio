import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE_METADATA } from '@/lib/fixtures/portfolio';
import { AppShell } from '@/components/shell/AppShell';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = { themeColor: '#efb72f', width: 'device-width', initialScale: 1 };
export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: { default: 'Mirza Hammad Baig — Data analyst & BI architect', template: '%s | Mirza Hammad Baig' },
  description: 'Data analysis, business intelligence and thoughtful systems by Mirza Hammad Baig.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={inter.variable}><body><AppShell>{children}</AppShell></body></html>;
}
