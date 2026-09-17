import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LinkButton } from '@/components/ui/LinkButton';
import {
  TEACHING_TOPICS,
  LEARNING_FLOW,
  MENTORSHIP_THEMES,
} from '@/lib/fixtures/portfolio';
import {
  AtomcampLecturerHero,
  LearningFlowSection,
  TeachingTopicCards,
  MentorshipAndEditorial,
} from '@/components/modules/TeachingModules';

export const metadata: Metadata = {
  title: 'Teaching & Mentorship | Mirza Hammad Baig',
  description:
    'Applied data analytics education, Power BI lecturing at Atomcamp, corporate workshops, and technical mentorship in Kimball modeling and DAX.',
};

export default function TeachingPage() {
  return (
    <div className="space-y-12">
      {/* 1. Page Header */}
      <PageHeader
        badgeText="Faculty & Mentorship"
        title="Teaching & Knowledge Transfer"
        description="Treating education as an essential engineering discipline. Guiding aspiring analysts and corporate teams from theoretical syntax to production business intelligence."
        actions={
          <>
            <LinkButton href="/about#contact" variant="primary" showArrow>
              Inquire About Workshops
            </LinkButton>
            <LinkButton href="/writing" variant="secondary">
              Read Technical Articles
            </LinkButton>
          </>
        }
      />

      {/* 2. Atomcamp Lecturer Hero & Corporate Enablement */}
      <AtomcampLecturerHero />

      {/* 3. 6-Phase Applied Learning Flow */}
      <LearningFlowSection flow={LEARNING_FLOW} />

      {/* 4. Core Curriculum Modules */}
      <div className="space-y-6">
        <SectionHeading
          overline="Curriculum"
          title="Instructional Focus Areas"
          description="Modular technical tracks delivered across cohort-based bootcamps and enterprise upskilling sessions."
        />

        <TeachingTopicCards topics={TEACHING_TOPICS} />
      </div>

      {/* 5. Mentorship Themes & Editorial Statement */}
      <MentorshipAndEditorial themes={MENTORSHIP_THEMES} />
    </div>
  );
}
