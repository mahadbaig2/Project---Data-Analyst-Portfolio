import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';
import { Icons } from '@/components/ui/Icons';
import { PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';

export const metadata: Metadata = {
  title: 'Writing & Thought Leadership',
  description:
    'Technical articles, architectural breakdowns, and editorial guides on Power BI and data systems by Mirza Hammad Baig.',
};

export default function WritingPage() {
  const mediumLink =
    PROFILE_IDENTITY.socialLinks.find((s) => s.platform === 'medium')?.href ||
    'https://medium.com';

  return (
    <div className="space-y-10">
      <PageHeader
        badgeText="Editorial & Publications"
        title="Writing & Insights"
        description="Structured articles, architectural breakdowns, and editorial insights on modern business intelligence and data modeling."
        actions={
          <LinkButton href={mediumLink} variant="secondary" isExternal>
            <Icons.medium size={15} className="mr-1.5" />
            <span>Read on Medium</span>
          </LinkButton>
        }
      />

      {/* Featured Editorial Overview */}
      <Card padding="xl">
        <SectionHeading
          overline="Editorial Focus"
          title="Bridging Data Architecture and Real-World Delivery"
          description="Documenting lessons from enterprise implementations, common DAX pitfalls, and effective star schema design."
        />
        <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">
          Articles are written for data analysts, business intelligence practitioners, and technical team leads seeking clear, reproducible solutions to enterprise data challenges.
        </p>
      </Card>

      {/* Article Categories */}
      <div>
        <SectionHeading
          overline="Key Themes"
          title="Core Subject Areas"
          description="Major themes explored across published articles and instructional guides."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card padding="lg" className="space-y-3">
            <Badge variant="tint" size="sm">
              Architecture
            </Badge>
            <h3 className="text-base font-bold text-text-primary">
              Dimensional Modeling Patterns
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Why star schemas outperform flat tables in Power BI, handling many-to-many relationships, and granularity pitfalls.
            </p>
          </Card>

          <Card padding="lg" className="space-y-3">
            <Badge variant="tint" size="sm">
              DAX & Calculations
            </Badge>
            <h3 className="text-base font-bold text-text-primary">
              Calculation Logic & Optimization
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Deep dives into evaluation context, CALCULATE modifiers, semi-additive measures, and memory consumption.
            </p>
          </Card>

          <Card padding="lg" className="space-y-3">
            <Badge variant="tint" size="sm">
              Practice & Career
            </Badge>
            <h3 className="text-base font-bold text-text-primary">
              Analytics Enablement
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Moving from ad-hoc reporting to structured self-service BI environments that business leaders actively trust.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
