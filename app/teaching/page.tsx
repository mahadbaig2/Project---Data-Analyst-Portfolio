import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';

export const metadata: Metadata = {
  title: 'Teaching & Mentorship',
  description:
    'Applied data analytics education, corporate training, and mentoring in Power BI, SQL, and Python by Mirza Hammad Baig.',
};

export default function TeachingPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        badgeText="Instruction & Mentoring"
        title="Teaching & Knowledge Transfer"
        description="Hands-on training programs designed to bridge the gap between textbook data theory and real-world enterprise analytics."
        actions={
          <LinkButton href="/about#contact" variant="primary">
            Inquire for Training / Workshops
          </LinkButton>
        }
      />

      {/* Applied Learning Approach */}
      <Card padding="xl">
        <SectionHeading
          overline="Philosophy"
          title="Applied Case-Study Learning"
          description="Focusing on problem discovery, data realities, business metrics, and decision-driven reporting."
        />
        <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">
          Training focuses on practical application rather than syntax memorization. Learners work directly with messy datasets, build conformed dimensional models, author performant DAX measures, and present findings in executive-ready dashboards.
        </p>
      </Card>

      {/* Core Topics Covered */}
      <div>
        <SectionHeading
          overline="Curriculum Modules"
          title="Instructional Focus Areas"
          description="Specialized programs taught through bootcamps, corporate sessions, and 1-on-1 mentorship."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card padding="lg" className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="tint" size="sm">
                BI Track
              </Badge>
            </div>
            <h3 className="text-base font-bold text-text-primary">
              Enterprise Power BI & DAX
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              From data connection and star schema design to complex filter context, time intelligence, and polished visual delivery.
            </p>
          </Card>

          <Card padding="lg" className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="tint" size="sm">
                Data Foundation Track
              </Badge>
            </div>
            <h3 className="text-base font-bold text-text-primary">
              SQL for Analytics & EDA
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Relational query construction, joins, aggregation, window functions, and data validation techniques for decision support.
            </p>
          </Card>

          <Card padding="lg" className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="tint" size="sm">
                Python Track
              </Badge>
            </div>
            <h3 className="text-base font-bold text-text-primary">
              Python for Data Analysis
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Exploratory data analysis (EDA), data wrangling with Pandas/NumPy, pattern detection, and clean reporting automation.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
