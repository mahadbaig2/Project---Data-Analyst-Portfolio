import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LinkButton } from '@/components/ui/LinkButton';
import { getExpertisePageData } from '@/lib/adapters/sanity-adapter';
import {
  ValueChainDiagram,
  CapabilitiesGrid,
  TechnologyEcosystem,
  SystemArchitectureFlow,
  ProblemsAndApproach,
} from '@/components/modules/TechnologySection';

export const metadata: Metadata = {
  title: 'Expertise & Technical Architecture | Mirza Hammad Baig',
  description:
    'Core technical capabilities across Kimball star schemas, Power BI, SQL, Python, Microsoft Fabric, and AI-augmented analytics.',
};

export default async function ExpertisePage() {
  const data = await getExpertisePageData();

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
              View Applied Case Studies
            </LinkButton>
            <LinkButton href="/about#contact" variant="secondary">
              Discuss Technical Scope
            </LinkButton>
          </>
        }
      />

      {/* 2. End-to-End Value Chain */}
      <ValueChainDiagram />

      {/* 3. Six Core Capability Pillars */}
      <div className="space-y-6">
        <SectionHeading
          overline="Core Disciplines"
          title="Six Functional Capability Domains"
          description="A balanced analytical practice connecting raw infrastructure with executive commercial decision-making."
        />

        <CapabilitiesGrid capabilities={data.capabilities} />
      </div>

      {/* 4. End-to-End System Flow Diagram */}
      <SystemArchitectureFlow />

      {/* 5. Grouped Technology Ecosystem */}
      <div className="space-y-6">
        <SectionHeading
          overline="Toolchain & Ecosystem"
          title="Grouped Technology Stack"
          description="Curated tools and engines deployed in production. Grouped by architectural responsibility rather than a superficial logo wall."
        />

        <TechnologyEcosystem groups={data.technologyGroups} />
      </div>

      {/* 6. Problems I Work On & 7-Step Methodology */}
      <ProblemsAndApproach
        problems={data.problems}
        approach={data.approach}
      />

      {/* 7. Final Action CTA */}
      <Card padding="xl" className="bg-surface-card border-primary/20 text-center py-10">
        <div className="max-w-xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-text-primary tracking-tight">
            Looking to modernize your data reporting architecture?
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            From cleaning legacy operational databases to publishing certified Power BI suites and conducting corporate upskilling.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <LinkButton href="/about#contact" variant="primary" showArrow>
              Initiate Technical Consultation
            </LinkButton>
            <LinkButton href="/work" variant="secondary">
              Review Work Samples
            </LinkButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
