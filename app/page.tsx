import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LinkButton } from '@/components/ui/LinkButton';
import { Badge } from '@/components/ui/Badge';
import { Icons } from '@/components/ui/Icons';
import {
  PROFILE_IDENTITY,
  CASE_STUDIES,
  EXPERIENCE_ITEMS,
  CAPABILITIES,
  WRITING_SERIES,
  TEACHING_TOPICS,
} from '@/lib/fixtures/portfolio';
import { FeaturedProjectCard } from '@/components/modules/FeaturedProjectCard';
import { ProjectCard } from '@/components/modules/ProjectCard';

export const metadata: Metadata = {
  title: 'Mirza Hammad Baig | Data Analyst & BI Solutions Architect',
  description:
    'Executive analytics workspace, enterprise Power BI architecture, Kimball star schemas, and data engineering by Mirza Hammad Baig.',
};

export default function HomePage() {
  const featuredProject = CASE_STUDIES.find((p) => p.isFeatured) || CASE_STUDIES[0];
  const secondaryProjects = CASE_STUDIES.filter((p) => p.slug !== featuredProject.slug);
  const currentRole = EXPERIENCE_ITEMS.find((e) => e.isCurrent);

  return (
    <div className="space-y-12">
      {/* 1. Hero & Positioning */}
      <PageHeader
        badgeText="Executive Analytics Workspace"
        title="Mirza Hammad Baig"
        description="Data Analyst & BI Solutions Architect specializing in conformed Kimball dimensional models, high-performance Power BI reporting suites, and automated analytical pipelines."
        actions={
          <>
            <LinkButton href="/work" variant="primary" showArrow>
              View Case Studies
            </LinkButton>
            <LinkButton href="/about#contact" variant="secondary">
              Contact Hammad
            </LinkButton>
          </>
        }
      />

      {/* 2. Executive Indicators (Factual & Structural) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="lg" className="space-y-2 border-l-4 border-l-primary">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
            Core Focus
          </span>
          <h3 className="text-base font-bold text-text-primary">
            Enterprise BI Architecture
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Kimball star schemas, conformed dimensions, and sub-second tabular DAX calculation engines.
          </p>
        </Card>

        <Card padding="lg" className="space-y-2 border-l-4 border-l-primary">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
            Scale & Scope
          </span>
          <h3 className="text-base font-bold text-text-primary">
            Cross-Functional Analytics
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Reporting solutions deployed across Commercial Retail, Logistics & Supply Chain, and Finance.
          </p>
        </Card>

        <Card padding="lg" className="space-y-2 border-l-4 border-l-primary">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
            Academic Faculty
          </span>
          <h3 className="text-base font-bold text-text-primary">
            Power BI Lecturer
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Cohort-based data modeling instruction at Atomcamp and internal corporate logistics workshops.
          </p>
        </Card>

        <Card padding="lg" className="space-y-2 border-l-4 border-l-primary">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
            Emerging Tech
          </span>
          <h3 className="text-base font-bold text-text-primary">
            AI-Augmented Workflows
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Multi-agent architectures, RAG knowledge retrieval, and analytical automation pipelines.
          </p>
        </Card>
      </div>

      {/* 3. Value-Chain Operating Model */}
      <Card padding="xl" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="tint" size="sm" hasDot pulseDot>
                Operating Model
              </Badge>
              <span className="text-xs text-text-muted font-medium">Value Creation Flow</span>
            </div>
            <h2 className="text-lg font-bold text-text-primary">
              The End-to-End Analytical Lifecycle
            </h2>
          </div>
          <span className="text-xs font-mono text-primary font-bold bg-surface-sidebar px-3 py-1 rounded-md border border-border-subtle self-start sm:self-auto">
            {PROFILE_IDENTITY.valueChain}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { phase: '01. DATA', role: 'Ingestion & Hygiene', desc: 'Raw ERP, SQL databases, POS transactions, and flat files cleaned and validated.' },
            { phase: '02. SYSTEM', role: 'Dimensional Modeling', desc: 'Normalized staging translated into conformed facts, dimension tables, and clean relationships.' },
            { phase: '03. INSIGHT', role: 'Calculation Layer', desc: 'Performant DAX measures, time intelligence, dynamic ranking, and KPI formulations.' },
            { phase: '04. DECISION', role: 'Executive Delivery', desc: 'Interactive Power BI suites, drill-through workflows, and cross-departmental dashboards.' },
            { phase: '05. IMPACT', role: 'Business Value', desc: 'Immediate operational clarity, stockout reduction, and automated weekly visibility.' },
          ].map((item) => (
            <div
              key={item.phase}
              className="p-3.5 bg-surface-sidebar rounded-lg border border-border-subtle space-y-1.5"
            >
              <span className="text-xs font-mono font-bold text-primary block">
                {item.phase}
              </span>
              <h3 className="text-xs font-bold text-text-primary">
                {item.role}
              </h3>
              <p className="text-[11px] text-text-secondary leading-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Featured Solution Architecture */}
      <div className="space-y-4">
        <SectionHeading
          overline="Selected Case Study"
          title="Featured Production Architecture"
          description="Detailed inspection of conformed data modeling, business constraints, and documented deliverables."
        />
        <FeaturedProjectCard project={featuredProject} />
      </div>

      {/* 5. Additional Case Studies Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <SectionHeading
            overline="Case Studies"
            title="Enterprise Implementations"
            description="Production implementations across retail sales, hospitality revenue, and multi-agent AI systems."
          />
          <LinkButton href="/work" variant="ghost" size="sm" showArrow className="self-start sm:self-auto">
            View All Work
          </LinkButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      {/* 6. Professional Journey & Current Posture */}
      <Card padding="xl" className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                Career Narrative
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-primary tracking-tight">
              From Operational Logistics to Enterprise BI Architecture
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Having advanced from logistics data specialist at Muller & Phipps to BI Architect at Ideas by Gul Ahmed, my perspective is rooted in real commercial workflows. I don&rsquo;t design dashboards in isolation—I build analytical systems that operational teams rely on daily.
            </p>
          </div>

          <div className="p-4 bg-surface-sidebar rounded-xl border border-border-subtle shrink-0 lg:w-72 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
              Active Enterprise Role
            </span>
            <h4 className="text-xs font-bold text-text-primary">
              {currentRole?.role || 'BI Solutions Architect'}
            </h4>
            <p className="text-xs text-primary font-semibold">
              {currentRole?.company || 'Ideas by Gul Ahmed'}
            </p>
            <p className="text-[11px] text-text-muted">
              {currentRole?.period} · Retail & Supply Chain Analytics
            </p>
            <div className="pt-2">
              <LinkButton href="/experience" variant="ghost" size="sm" showArrow className="p-0 text-primary font-semibold">
                Explore Career Timeline
              </LinkButton>
            </div>
          </div>
        </div>
      </Card>

      {/* 7. Expertise Snapshot */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <SectionHeading
            overline="Core Capabilities"
            title="Breadth Beyond Standard Reporting"
            description="Combining engineering foundations, dimensional modeling, and modern AI automation."
          />
          <LinkButton href="/expertise" variant="ghost" size="sm" showArrow className="self-start sm:self-auto">
            Full Capability Matrix
          </LinkButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.slice(0, 3).map((cap) => (
            <Card key={cap.id} padding="lg" hoverable className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                {cap.category}
              </span>
              <h4 className="text-sm font-bold text-text-primary">
                {cap.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {cap.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* 8. Teaching and Writing Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="lg" hoverable className="space-y-4 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Badge variant="tint" size="sm">
                Education & Mentorship
              </Badge>
              <Icons.school size={16} className="text-primary" />
            </div>
            <h4 className="text-base font-bold text-text-primary">
              Data Education at Atomcamp
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Lecturing on Kimball modeling, DAX formulations, and practical data analysis. Guiding students through hands-on capstone projects and commercial problem decomposition.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {TEACHING_TOPICS.slice(0, 3).map((t) => (
                <span key={t.id} className="text-[10px] px-2 py-0.5 bg-surface-sidebar rounded border border-border-subtle font-mono text-text-secondary">
                  {t.title}
                </span>
              ))}
            </div>
          </div>
          <LinkButton href="/teaching" variant="ghost" size="sm" showArrow className="p-0 text-primary font-semibold">
            View Teaching Curriculum
          </LinkButton>
        </Card>

        <Card padding="lg" hoverable className="space-y-4 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Badge variant="neutral" size="sm">
                Technical Writing
              </Badge>
              <Icons.article size={16} className="text-primary" />
            </div>
            <h4 className="text-base font-bold text-text-primary">
              Understanding the Data Field Series
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              A comprehensive technical essay series mapping the data landscape from physical bits and infrastructure to business intelligence, machine learning, and governance.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {WRITING_SERIES.slice(0, 3).map((w) => (
                <span key={w.id} className="text-[10px] px-2 py-0.5 bg-surface-sidebar rounded border border-border-subtle font-mono text-text-secondary">
                  {w.category}
                </span>
              ))}
            </div>
          </div>
          <LinkButton href="/writing" variant="ghost" size="sm" showArrow className="p-0 text-primary font-semibold">
            Explore Publication Hub
          </LinkButton>
        </Card>
      </div>

      {/* 9. Final Executive CTA */}
      <Card padding="xl" className="bg-surface-card border-primary/20 text-center py-10">
        <div className="max-w-xl mx-auto space-y-4">
          <Badge variant="tint" size="sm">
            Engagement & Collaboration
          </Badge>
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Ready to architect your enterprise analytical layer?
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Whether designing a new conformed data warehouse, diagnosing a slow Power BI tabular model, or upskilling internal analytics staff.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <LinkButton href="/about#contact" variant="primary" showArrow>
              Get in Touch
            </LinkButton>
            <LinkButton href="/work" variant="secondary">
              Review Case Studies
            </LinkButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
