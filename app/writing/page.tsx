import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LinkButton } from '@/components/ui/LinkButton';
import { Icons } from '@/components/ui/Icons';
import { getWritingPageData, getSiteSettings } from '@/lib/adapters/sanity-adapter';
import {
  WritingHeroBanner,
  KnowledgeMapSection,
  ArticleCardsGrid,
  WhyIWriteSection,
} from '@/components/modules/WritingSections';

export const metadata: Metadata = {
  title: 'Writing & Technical Publications | Mirza Hammad Baig',
  description:
    'Educational essays and field mappings: "Understanding the Data Field", data infrastructure, Kimball dimensional engineering, and AI analytics.',
};

export default async function WritingPage() {
  const [data, siteSettings] = await Promise.all([
    getWritingPageData(),
    getSiteSettings(),
  ]);

  const mediumLink =
    siteSettings.socialLinks.find((s) => s.platform === 'medium')?.href ||
    'https://medium.com/@mirzahammad';

  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <PageHeader
        badgeText={data.badgeText}
        title={data.title}
        description={data.description}
        actions={
          <LinkButton href={mediumLink} variant="secondary" isExternal showArrow>
            <Icons.medium size={14} className="mr-1.5" />
            Medium Profile
          </LinkButton>
        }
      />

      {/* 2. Writing Hero & Featured Series */}
      <WritingHeroBanner />

      {/* 3. Layered Knowledge Map */}
      <KnowledgeMapSection layers={data.knowledgeMap} />

      {/* 4. Categorized Article Cards Grid */}
      <div className="space-y-6">
        <SectionHeading
          overline="Flagship Series"
          title="Understanding the Data Field: Topic Directory"
          description="Curated essays exploring key layers of data engineering, dimensional business intelligence, and analytical workflows."
        />

        <ArticleCardsGrid articles={data.articles} />
      </div>

      {/* 5. Why I Write & Teaching Connection */}
      <div className="space-y-4">
        <SectionHeading
          overline="Philosophy"
          title="The Purpose of Technical Writing"
          description="Why articulating data concepts in written prose elevates engineering and teaching clarity."
        />

        <WhyIWriteSection />
      </div>
    </div>
  );
}
