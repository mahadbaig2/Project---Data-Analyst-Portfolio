import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LinkButton } from '@/components/ui/LinkButton';
import { Badge } from '@/components/ui/Badge';
import { Icons } from '@/components/ui/Icons';
import { PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';

export const metadata: Metadata = {
  title: 'Overview | Mirza Hammad Baig',
  description:
    'Executive analytics overview and professional workspace of Mirza Hammad Baig, BI Solutions Architect and Data Analyst.',
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Page Header */}
      <PageHeader
        badgeText="Executive Overview"
        title="Enterprise Analytics Workspace"
        description="End-to-end data systems, dimensional star schemas, executive Power BI delivery, and applied analytical enablement."
        actions={
          <>
            <LinkButton href="/work" variant="primary" showArrow>
              Explore Case Studies
            </LinkButton>
            <LinkButton href={PROFILE_IDENTITY.cvUrl} variant="secondary" isExternal>
              Download CV
            </LinkButton>
          </>
        }
      />

      {/* Hero Value Chain Narrative Card */}
      <Card padding="xl" className="relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="tint" size="sm" hasDot pulseDot>
                Core Operational Thesis
              </Badge>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
              {PROFILE_IDENTITY.valueChain}
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              {PROFILE_IDENTITY.summary} Spanning raw transactional data extraction, conformed dimensional modeling, performant DAX calculation engines, and executive decision support dashboards.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <div className="p-3 bg-surface-sidebar rounded-lg border border-border-subtle text-xs">
              <span className="text-text-muted block text-[10px] uppercase font-semibold">
                Primary Architecture
              </span>
              <span className="font-semibold text-text-primary">
                Power BI · Fabric · SQL · Python
              </span>
            </div>
            <div className="p-3 bg-surface-sidebar rounded-lg border border-border-subtle text-xs">
              <span className="text-text-muted block text-[10px] uppercase font-semibold">
                Methodology
              </span>
              <span className="font-semibold text-text-primary">
                Kimball Star Schema · Agile BI Delivery
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Strategic Focus Pillars */}
      <div>
        <SectionHeading
          overline="System Pillars"
          title="Architectural Scope"
          description="A structured foundation connecting data pipelines directly to business outcomes."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            overline="Foundation"
            value="Data"
            tag="Engineering"
            description="Robust ingestion pipelines, SQL transformations, cleaning, and structured relational preparation."
          />
          <MetricCard
            overline="Modeling"
            value="System"
            tag="Architecture"
            description="Conformed dimensional schemas, Kimball star models, and high-performance tabular DAX measures."
          />
          <MetricCard
            overline="Delivery"
            value="Insight"
            tag="Analytics"
            description="Executive Power BI reporting suites, drill-through paths, and clear self-service discovery."
          />
          <MetricCard
            overline="Enablement"
            value="Impact"
            tag="Adoption"
            description="Hands-on corporate training, stakeholder alignment, and continuous decision enablement."
          />
        </div>
      </div>

      {/* Workspace Quick Routes */}
      <div>
        <SectionHeading
          overline="Workspace Navigation"
          title="Explore Detailed Sections"
          description="In-depth technical evidence, chronological experience, capability matrices, and published writing."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card hoverable padding="lg" className="flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Case Studies
                </span>
                <Icons.analytics className="text-primary" size={18} />
              </div>
              <h3 className="text-base font-semibold text-text-primary">
                Work & Projects
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Filterable enterprise reporting implementations, data pipelines, and documented business impact.
              </p>
            </div>
            <LinkButton href="/work" variant="ghost" size="sm" showArrow className="self-start p-0">
              View Case Studies
            </LinkButton>
          </Card>

          <Card hoverable padding="lg" className="flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Chronology
                </span>
                <Icons.timeline className="text-primary" size={18} />
              </div>
              <h3 className="text-base font-semibold text-text-primary">
                Career Experience
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Organizational roles, cross-functional department enablement, and end-to-end delivery scope.
              </p>
            </div>
            <LinkButton href="/experience" variant="ghost" size="sm" showArrow className="self-start p-0">
              View Experience
            </LinkButton>
          </Card>

          <Card hoverable padding="lg" className="flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Ecosystem
                </span>
                <Icons.account_tree className="text-primary" size={18} />
              </div>
              <h3 className="text-base font-semibold text-text-primary">
                Technical Expertise
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Toolchain proficiency across Power BI, SQL, Python, Fabric, data modeling, and emerging AI analytics.
              </p>
            </div>
            <LinkButton href="/expertise" variant="ghost" size="sm" showArrow className="self-start p-0">
              View Expertise
            </LinkButton>
          </Card>
        </div>
      </div>
    </div>
  );
}
