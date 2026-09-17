import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LinkButton } from '@/components/ui/LinkButton';
import { getExperiencePageData } from '@/lib/adapters/sanity-adapter';
import {
  ExperienceTimeline,
  WorkingStyleCards,
} from '@/components/modules/ExperienceTimeline';

export const metadata: Metadata = {
  title: 'Experience & Career Chronology | Mirza Hammad Baig',
  description:
    'Chronological career history, enterprise roles at Ideas by Gul Ahmed and Muller & Phipps, cross-departmental enablement, and BI leadership.',
};

export default async function ExperiencePage() {
  const data = await getExperiencePageData();

  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <PageHeader
        badgeText={data.badgeText}
        title={data.title}
        description={data.description}
        actions={
          <>
            <LinkButton href="/work" variant="primary" showArrow>
              View Documented Case Studies
            </LinkButton>
            <LinkButton href="/about#contact" variant="secondary">
              Contact Hammad
            </LinkButton>
          </>
        }
      />

      {/* 2. Career Chronology Timeline */}
      <div className="space-y-6">
        <SectionHeading
          overline="Verified Roles"
          title="Organizational Trajectory & System Ownership"
          description="Direct engineering and analytical responsibility across commercial retail, distribution logistics, and data education."
        />

        <ExperienceTimeline items={data.items} />
      </div>

      {/* 3. Working Style & Operational Standards */}
      <div className="space-y-6">
        <SectionHeading
          overline="Methodology"
          title="Working Style & Operational Competencies"
          description="How I approach complex business questions, from initial stakeholder alignment to ongoing user enablement."
        />

        <WorkingStyleCards />
      </div>

      {/* 4. Cross-Functional Department Enablement */}
      <Card padding="xl" className="space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            Departmental Scope
          </span>
          <h3 className="text-base font-bold text-text-primary">
            Cross-Functional Stakeholder Partnerships
          </h3>
          <p className="text-xs text-text-secondary">
            Enterprise analytics succeeds when technical models reflect the distinct operational vocabularies of diverse business units.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {[
            {
              dept: 'Commercial Retail',
              focus: 'Store performance, sales velocity, category mix, discount elasticity, and basket size analysis.',
            },
            {
              dept: 'Supply Chain & Logistics',
              focus: 'Fleet turnarounds, cold-chain compliance, SLA adherence, warehouse bottleneck tracking, and inventory aging.',
            },
            {
              dept: 'Executive Finance',
              focus: 'Gross margin contributions, EBITDA bridges, operational overhead, budget variance, and YoY cash cycles.',
            },
            {
              dept: 'Academic & Training',
              focus: 'Cohort-based instruction, structured curriculum design, capstone mentoring, and technical enablement.',
            },
          ].map((item) => (
            <div
              key={item.dept}
              className="p-3.5 bg-surface-sidebar rounded-lg border border-border-subtle space-y-1"
            >
              <h4 className="text-xs font-bold text-primary">
                {item.dept}
              </h4>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                {item.focus}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. Next Steps CTA */}
      <Card padding="lg" className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-text-primary">
            Want to see how these roles translate into technical solutions?
          </h4>
          <p className="text-xs text-text-secondary">
            Explore the full case studies or examine the architecture and technology stack.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <LinkButton href="/work" variant="primary" size="sm" showArrow>
            Explore Case Studies
          </LinkButton>
          <LinkButton href="/expertise" variant="secondary" size="sm">
            View Expertise
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
