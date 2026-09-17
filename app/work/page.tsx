import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';

export const metadata: Metadata = {
  title: 'Work & Case Studies',
  description:
    'Documented business intelligence case studies, enterprise data models, and analytical applications by Mirza Hammad Baig.',
};

export default function WorkPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        badgeText="Case Study Index"
        title="Work & Case Studies"
        description="Structured case studies detailing business challenges, architectural choices, dimensional models, and quantifiable impact."
      />

      {/* Filter Category Tabs (Representative Foundation) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-border-subtle text-xs">
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-medium shadow-xs"
        >
          All Solutions
        </button>
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
        >
          Business Intelligence
        </button>
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
        >
          Data Architecture
        </button>
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
        >
          AI Automation
        </button>
      </div>

      {/* Case Study Cards Grid */}
      <div>
        <SectionHeading
          overline="Featured Delivery"
          title="Flagship Solutions"
          description="Representative solutions demonstrating the complete data value chain from raw source to executive dashboard."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Representative Case Study Card */}
          <Card hoverable padding="none" className="flex flex-col overflow-hidden">
            {/* Aspect Ratio Preview Placeholder */}
            <div className="relative aspect-video bg-surface-muted border-b border-border-subtle flex items-center justify-center p-6 text-center">
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-semibold text-text-muted tracking-wider">
                  Power BI Solution Architecture
                </span>
                <p className="text-xs text-text-secondary">
                  Weekly Sales & Departmental Performance Dashboard
                </p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="tint" size="sm">
                    Business Intelligence
                  </Badge>
                  <span className="text-xs text-text-muted">Retail Analytics</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-text-primary">
                  Weekly Sales Dashboard for Departmental Stores
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Management-focused Power BI reporting solution monitoring weekly store performance, YoY comparisons, YTD totals, and manager commissions.
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Power BI', 'DAX', 'Star Schema', 'Data Modeling'].map((tech) => (
                    <Badge key={tech} variant="neutral" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <span className="text-xs text-text-muted">
                  Full Case Study
                </span>
                <LinkButton
                  href="/work/retail-store-weekly-sales-analysis"
                  variant="primary"
                  size="sm"
                  showArrow
                >
                  View Case Study
                </LinkButton>
              </div>
            </div>
          </Card>

          {/* Development Milestone 1 Notice Card */}
          <Card padding="lg" className="flex flex-col justify-between border-dashed border-border-hover">
            <div className="space-y-3">
              <Badge variant="neutral" size="sm">
                Milestone 1 · Route Skeleton
              </Badge>
              <h3 className="text-base font-semibold text-text-primary">
                Additional Projects Under Verification
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Remaining project records will be populated in Milestone 2 from verified project documentation, followed by Sanity CMS dynamic queries in Milestone 3.
              </p>
            </div>
            <div className="pt-4 text-xs text-text-muted">
              Content integrity enforced: No fabricated project metrics or unverified client claims.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
