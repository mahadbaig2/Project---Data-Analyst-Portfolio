import { Arrow } from '@/components/portfolio/Arrow';
import Link from 'next/link';
export default function NotFound() { return <div className="inner-page section-pad page-hero"><h1>Nothing here<span className="yellow-dot">.</span></h1><p>Looks like this page has moved.</p><Link className="button button-dark" href="/">Back home <Arrow /></Link></div>; }
