import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';
import { PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';

export const metadata: Metadata = {
  title: 'Experience & Career Chronology',
  description:
    'Professional career trajectory, organizational impact, and business intelligence leadership of Mirza Hammad Baig.',
};

export default function ExperiencePage() {
  return (
    <div className="space-y-10">
      <PageHeader
        badgeText="Career Journey"
        title="Experience & Chronology"
        description="Chronological record of enterprise data roles, cross-functional department enablement, dimensional modeling, and BI delivery."
        actions={
          <LinkButton href={PROFILE_IDENTITY.cvUrl} variant="primary" isExternal>
            Download Formal CV
          </LinkButton>
        }
      />

      {/* Timeline Section */}
      <div className="space-y-6">
        <SectionHeading
          overline="Chronological History"
          title="Organizational Roles"
          description="Direct impact across data architecture, business intelligence, and stakeholder decision support."
        />

        <div className="relative pl-6 sm:pl-8 border-l-2 border-border-subtle space-y-8">
          {/* Timeline Item 1 */}
          <div className="relative">
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-surface-canvas" />
            <Card padding="lg" className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary">
                    Data Analyst & BI Solutions Architect
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    Enterprise Data Practice · Solutions Delivery
                  </p>
                </div>
                <Badge variant="tint" size="sm" hasDot>
                  Current / Strategic Focus
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Architecting dimensional star schemas, high-performance DAX measure layers, and executive dashboards. Leading discovery sessions with business leaders to align reporting structures with key organizational decisions.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Power BI', 'Microsoft Fabric', 'DAX', 'SQL', 'Dimensional Modeling'].map((tech) => (
                  <Badge key={tech} variant="neutral" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Timeline Item 2 */}
          <div className="relative">
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-border-hover ring-4 ring-surface-canvas" />
            <Card padding="lg" className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary">
                    Data Science & BI Instructor / Trainer
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    Atomcamp · Applied Analytics Programs
                  </p>
                </div>
                <Badge variant="neutral" size="sm">
                  Teaching & Mentorship
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Delivering intensive hands-on curricula across Power BI, SQL, Python for Data Analysis, and Exploratory Data Analysis (EDA). Mentoring aspiring analysts on case-study-driven problem solving.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Curriculum Design', 'Power BI Training', 'Python EDA', 'SQL Instruction'].map((tech) => (
                  <Badge key={tech} variant="neutral" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Operational Working Style */}
      <div>
        <SectionHeading
          overline="Methodology"
          title="Operational Engagement Style"
          description="How technical analysis connects systematically to stakeholder decision workflows."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md" className="space-y-2">
            <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">01 · Discovery</span>
            <h4 className="text-sm font-bold text-text-primary">Stakeholder Alignment</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Uncovering the underlying business questions and metric definitions before designing data structures.
            </p>
          </Card>
          <Card padding="md" className="space-y-2">
            <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">02 · Modeling</span>
            <h4 className="text-sm font-bold text-text-primary">Dimensional Rigor</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Constructing robust star schemas that ensure reporting consistency, high calculation speed, and auditability.
            </p>
          </Card>
          <Card padding="md" className="space-y-2">
            <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">03 · Delivery</span>
            <h4 className="text-sm font-bold text-text-primary">Executive Visualization</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Crafting calm, intuitive report layouts that emphasize variance, trends, and decision paths.
            </p>
          </Card>
          <Card padding="md" className="space-y-2">
            <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">04 · Enablement</span>
            <h4 className="text-sm font-bold text-text-primary">Adoption & Training</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Conducting hands-on walkthroughs to ensure ongoing self-service adoption and data trust across teams.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
