'use client';
import { Arrow } from '@/components/portfolio/Arrow';
export default function Error({ reset }: { reset: () => void }) { return <div className="inner-page section-pad page-hero"><h1>Something went wrong<span className="yellow-dot">.</span></h1><p>Let&apos;s try that again.</p><button className="button button-dark" onClick={reset}>Try again <Arrow /></button></div>; }
