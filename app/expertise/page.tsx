import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';

export const metadata: Metadata = {
  title: 'Expertise & Capabilities',
  description:
    'Core technical capabilities, system architecture proficiencies, and technology ecosystem of Mirza Hammad Baig.',
};

export default function ExpertisePage() {
  return (
    <div className="space-y-10">
      <PageHeader
        badgeText="Technical Capabilities"
        title="Expertise & Architecture"
        description="Comprehensive technical capabilities across the entire data lifecycle: dimensional modeling, BI solutions architecture, pipeline development, and applied AI."
        actions={
          <LinkButton href="/work" variant="primary" showArrow>
            View Applied Solutions
          </LinkButton>
        }
      />

      {/* Grouped Ecosystem Matrix */}
      <div>
        <SectionHeading
          overline="Technology Ecosystem"
          title="Technical Core & Competencies"
          description="Grouped by functional domain rather than a generic logo wall, reflecting architectural ownership."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card padding="lg" className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">
                Primary Specialty
              </span>
              <h3 className="text-base font-bold text-text-primary">
                Business Intelligence & Visualization
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Executive dashboard design, semantic reporting layers, drill-through workflows, and mobile-responsive report interfaces.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle">
              {['Power BI', 'DAX Measures', 'Paginated Reports', 'Row-Level Security', 'Power BI Service'].map((tech) => (
                <Badge key={tech} variant="tint" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>

          <Card padding="lg" className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">
                Architecture & Foundation
              </span>
              <h3 className="text-base font-bold text-text-primary">
                Data Modeling & Dimensional Design
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Kimball dimensional schemas, conformed dimensions, surrogate keys, slowly changing dimensions, and relationship optimization.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle">
              {['Star Schema', 'Snowflake Modeling', 'Relational Schemas', 'Granularity Alignment'].map((tech) => (
                <Badge key={tech} variant="tint" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>

          <Card padding="lg" className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">
                Engineering & Querying
              </span>
              <h3 className="text-base font-bold text-text-primary">
                Data Engineering & Transformation
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Complex SQL querying, window functions, CTEs, Power Query ETL procedures, and automated data ingestion pipelines.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle">
              {['SQL (PostgreSQL / T-SQL)', 'Python (Pandas, NumPy)', 'Power Query M', 'Microsoft Fabric'].map((tech) => (
                <Badge key={tech} variant="tint" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
