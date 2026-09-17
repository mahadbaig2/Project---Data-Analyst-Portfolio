import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { LinkButton } from '@/components/ui/LinkButton';
import {
  IDENTITY_PILLARS,
  CAREER_PRINCIPLES,
  EDUCATION_ITEMS,
  CERTIFICATIONS,
} from '@/lib/fixtures/portfolio';
import {
  AboutHeroSection,
  IdentityPillarsGrid,
  CareerPrinciplesSection,
  EducationAndCertifications,
  ContactPanel,
} from '@/components/modules/AboutSections';

export const metadata: Metadata = {
  title: 'About & Direct Inquiries | Mirza Hammad Baig',
  description:
    'Professional profile, 4 identity pillars, verified education at KIET & Aligarh, career principles, and direct contact channels for Mirza Hammad Baig.',
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <PageHeader
        badgeText="Professional Profile"
        title="About Mirza Hammad Baig"
        description="Analyst · Solutions Architect · Educator · Builder. Operating at the convergence of enterprise data modeling, business intelligence, and practical knowledge transfer."
        actions={
          <LinkButton href="#contact" variant="primary" showArrow>
            Direct Contact Channels
          </LinkButton>
        }
      />

      {/* 2. Hero Profile with Monogram Fallback */}
      <AboutHeroSection />

      {/* 3. Four Identity Pillars */}
      <IdentityPillarsGrid pillars={IDENTITY_PILLARS} />

      {/* 4. Career Principles & Axioms */}
      <CareerPrinciplesSection principles={CAREER_PRINCIPLES} />

      {/* 5. Education & Certifications (Verified Only) */}
      <EducationAndCertifications
        education={EDUCATION_ITEMS}
        certifications={CERTIFICATIONS}
      />

      {/* 6. Contact Panel (with #contact anchor target) */}
      <ContactPanel />
    </div>
  );
}
