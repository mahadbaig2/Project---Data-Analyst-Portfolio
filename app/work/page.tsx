import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { LinkButton } from '@/components/ui/LinkButton';
import { CASE_STUDIES } from '@/lib/fixtures/portfolio';
import { WorkFilterGrid } from '@/components/modules/WorkFilterGrid';

export const metadata: Metadata = {
  title: 'Work & Case Studies | Mirza Hammad Baig',
  description:
    'Documented business intelligence case studies, enterprise Kimball data models, retail analytics, and analytical automation systems.',
};

export default function WorkPage() {
  return (
    <div className="space-y-10">
      {/* Page Header */}
      <PageHeader
        badgeText="Production Portfolio"
        title="Enterprise Case Studies & Architectures"
        description="Every project below details real business dilemmas, conformed dimensional schemas, DAX optimization techniques, and verified commercial impact."
      />

      {/* Interactive Case Studies Grid with Category Filter & Search */}
      <WorkFilterGrid projects={CASE_STUDIES} />

      {/* Architectural Rigor Note */}
      <Card padding="lg" className="bg-surface-sidebar border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <span className="font-bold text-text-primary block">
            Methodological Standards
          </span>
          <p className="text-text-muted">
            All case studies follow Ralph Kimball dimensional modeling principles: conformed dimensions, surrogate keys, star schemas, defensive DAX context handling, and strict user accessibility guidelines.
          </p>
        </div>
        <LinkButton href="/expertise" variant="ghost" size="sm" showArrow className="shrink-0 self-start sm:self-center">
          Explore Technical Matrix
        </LinkButton>
      </Card>

      {/* Final Collaboration CTA */}
      <Card padding="xl" className="text-center py-10">
        <div className="max-w-lg mx-auto space-y-3">
          <h3 className="text-lg font-bold text-text-primary">
            Need a custom analytical architecture designed?
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            I work with commercial retail, supply chain operations, and high-growth teams to construct resilient, audited BI ecosystems.
          </p>
          <div className="pt-2">
            <LinkButton href="/about#contact" variant="primary" showArrow>
              Discuss Your Data Architecture
            </LinkButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
