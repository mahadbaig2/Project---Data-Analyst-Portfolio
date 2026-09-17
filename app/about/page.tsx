import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { LinkButton } from '@/components/ui/LinkButton';
import { getAboutPageData } from '@/lib/adapters/sanity-adapter';
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

export default async function AboutPage() {
  const data = await getAboutPageData();

  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <PageHeader
        badgeText={data.badgeText}
        title={data.title}
        description={data.description}
        actions={
          <LinkButton href="#contact" variant="primary" showArrow>
            Direct Contact Channels
          </LinkButton>
        }
      />

      {/* 2. Hero Profile with Monogram Fallback */}
      <AboutHeroSection />

      {/* 3. Four Identity Pillars */}
      <IdentityPillarsGrid pillars={data.pillars} />

      {/* 4. Career Principles & Axioms */}
      <CareerPrinciplesSection principles={data.principles} />

      {/* 5. Education & Certifications (Verified Only) */}
      <EducationAndCertifications
        education={data.education}
        certifications={data.certifications}
      />

      {/* 6. Contact Panel (with #contact anchor target) */}
      <ContactPanel />
    </div>
  );
}
