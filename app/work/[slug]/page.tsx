import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';
import { Icons } from '@/components/ui/Icons';
import { CASE_STUDIES } from '@/lib/fixtures/portfolio';
import { ArchitectureDiagram } from '@/components/modules/ArchitectureDiagram';

export function generateStaticParams() {
  return CASE_STUDIES.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Case Study Not Found | Mirza Hammad Baig',
      description: 'The requested enterprise case study could not be located.',
    };
  }

  return {
    title: `${project.title} | Case Study | Mirza Hammad Baig`,
    description: project.summary,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = CASE_STUDIES.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find next project for seamless sequential reading
  const currentIndex = CASE_STUDIES.findIndex((p) => p.slug === slug);
  const nextProject =
    CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <div className="space-y-10">
      {/* 1. Header with Breadcrumbs & Actions */}
      <PageHeader
        badgeText={project.domain}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Work', href: '/work' },
          { label: project.title },
        ]}
        title={project.title}
        description={project.summary}
        actions={
          <>
            <LinkButton href="/work" variant="secondary" size="sm">
              <Icons.arrow_back size={14} className="mr-1" />
              All Case Studies
            </LinkButton>
            {project.githubUrl && (
              <LinkButton
                href={project.githubUrl}
                variant="primary"
                size="sm"
                isExternal
                showArrow
              >
                GitHub Repository
              </LinkButton>
            )}
          </>
        }
      />

      {/* 2. Metadata & Scope Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Challenge */}
        <Card padding="lg" className="lg:col-span-2 space-y-4">
          <SectionHeading
            overline="Business Challenge"
            title="Operational Context & Dilemma"
          />
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            {project.problem}
          </p>

          {project.background && (
            <div className="p-3.5 bg-surface-sidebar rounded-lg border border-border-subtle text-xs text-text-muted leading-relaxed">
              <span className="font-bold text-text-primary block mb-1">
                Background Environment:
              </span>
              {project.background}
            </div>
          )}

          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-2">
              Technology Stack Employed:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="neutral" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Project Metadata Specification */}
        <Card padding="lg" className="space-y-4">
          <SectionHeading overline="Specification" title="Project Details" />
          <dl className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-border-subtle">
              <dt className="text-text-muted">Domain</dt>
              <dd className="font-semibold text-text-primary">{project.domain}</dd>
            </div>
            {project.organization && (
              <div className="flex justify-between py-1 border-b border-border-subtle">
                <dt className="text-text-muted">Organization</dt>
                <dd className="font-semibold text-text-primary">{project.organization}</dd>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-border-subtle">
              <dt className="text-text-muted">Role</dt>
              <dd className="font-semibold text-text-primary">{project.role}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-border-subtle">
              <dt className="text-text-muted">Timeline</dt>
              <dd className="font-semibold text-text-primary">{project.period}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-border-subtle">
              <dt className="text-text-muted">Category</dt>
              <dd className="font-semibold text-primary">{project.category}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-text-muted">Status</dt>
              <dd className="font-semibold text-primary">{project.status}</dd>
            </div>
          </dl>

          {project.confidentiality && (
            <div className="p-2.5 bg-surface-sidebar rounded-lg border border-border-subtle text-[11px] text-text-muted">
              🔒 <strong className="text-text-primary">Data Privacy:</strong> {project.confidentiality}
            </div>
          )}
        </Card>
      </div>

      {/* 3. Objectives Breakdown */}
      {project.objectives && project.objectives.length > 0 && (
        <Card padding="xl" className="space-y-5">
          <SectionHeading
            overline="Requirements"
            title="Strategic Objectives & Deliverables"
            description="Specific analytical goals established with stakeholders prior to implementation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.objectives.map((obj) => (
              <div
                key={obj.id}
                className="p-4 bg-surface-sidebar rounded-xl border border-border-subtle space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <h4 className="text-xs font-bold text-text-primary">
                    {obj.title}
                  </h4>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  {obj.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 4. Architecture Diagram Component */}
      {project.architecture && (
        <ArchitectureDiagram graph={project.architecture} />
      )}

      {/* 5. Calculations / DAX Engine Specification */}
      {project.calculations && project.calculations.length > 0 && (
        <Card padding="xl" className="space-y-5">
          <SectionHeading
            overline="Calculation Layer"
            title="Key Analytical Measures & Formulations"
            description="Core DAX expressions and computational logic deployed to support dynamic aggregations."
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-sidebar/60 text-text-muted text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Measure Name</th>
                  <th className="py-2.5 px-3">Formula / Logic</th>
                  <th className="py-2.5 px-3">Analytical Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {project.calculations.map((calc) => (
                  <tr key={calc.measure} className="hover:bg-surface-hover transition-colors">
                    <td className="py-3 px-3 font-semibold text-text-primary font-mono text-xs whitespace-nowrap">
                      {calc.measure}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-primary break-all max-w-xs">
                      {calc.formula}
                    </td>
                    <td className="py-3 px-3 text-text-secondary text-xs">
                      {calc.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 6. Documented Outcomes & Deliverables */}
      {project.outcomes && project.outcomes.length > 0 && (
        <Card padding="xl" className="space-y-4">
          <SectionHeading
            overline="Verification"
            title="Documented Outcomes & Impact"
            description="Realized operational improvements confirmed following system deployment."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.outcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-surface-sidebar rounded-lg border border-border-subtle flex items-start gap-2.5 text-xs text-text-secondary"
              >
                <span className="text-primary font-bold text-sm shrink-0">✓</span>
                <span className="leading-relaxed">{outcome}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 7. Engineering Decisions & Challenges */}
      {(project.decisions || project.challenges) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.decisions && project.decisions.length > 0 && (
            <Card padding="lg" className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                Architectural Trade-offs
              </span>
              <h4 className="text-sm font-bold text-text-primary">
                Key Architectural Decisions
              </h4>
              <ul className="space-y-2 text-xs text-text-secondary">
                {project.decisions.map((dec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{dec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <Card padding="lg" className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                Production Reality
              </span>
              <h4 className="text-sm font-bold text-text-primary">
                Technical Challenges Overcome
              </h4>
              <ul className="space-y-2 text-xs text-text-secondary">
                {project.challenges.map((chal, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{chal}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}

      {/* 8. Sequential Next Case Study Route */}
      {nextProject && nextProject.slug !== project.slug && (
        <Card padding="lg" hoverable className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
              Next Case Study
            </span>
            <h4 className="text-base font-bold text-text-primary">
              {nextProject.title}
            </h4>
            <p className="text-xs text-text-secondary">
              {nextProject.summary}
            </p>
          </div>
          <LinkButton
            href={`/work/${nextProject.slug}`}
            variant="primary"
            size="sm"
            showArrow
            className="shrink-0 self-start sm:self-center"
          >
            Read Case Study
          </LinkButton>
        </Card>
      )}
    </div>
  );
}
