import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';
import { Icons } from '@/components/ui/Icons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} | Case Study`,
    description: `Detailed case study and architectural overview for ${formattedTitle}.`,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const displayTitle = slug === 'retail-store-weekly-sales-analysis'
    ? 'Weekly Sales Dashboard for Departmental Stores'
    : slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

  return (
    <div className="space-y-10">
      {/* Page Header with Breadcrumb and Back Button */}
      <PageHeader
        badgeText="Case Study Detail"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Work', href: '/work' },
          { label: displayTitle },
        ]}
        title={displayTitle}
        description="Management-focused reporting architecture with conformed dimensional schemas, DAX measures, and executive KPI visibility."
        actions={
          <>
            <LinkButton href="/work" variant="secondary" size="sm">
              <Icons.arrow_back size={15} className="mr-1" />
              Back to Projects
            </LinkButton>
            <LinkButton href="/about#contact" variant="primary" size="sm">
              Inquire About Solution
            </LinkButton>
          </>
        }
      />

      {/* Snapshot Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding="lg" className="lg:col-span-2 space-y-4">
          <SectionHeading
            overline="Project Overview"
            title="Business Problem & Objectives"
          />
          <p className="text-sm text-text-secondary leading-relaxed">
            Designed around executive requirements for clear, mobile-friendly reporting to monitor weekly performance across store locations and departments, calculate YoY/YTD variances, and track manager commissions.
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            {['Power BI', 'DAX', 'Star Schema', 'Data Modeling', 'Excel / CSV Ingestion'].map((tech) => (
              <Badge key={tech} variant="tint" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>

        <Card padding="lg" className="space-y-4">
          <SectionHeading overline="Scope" title="Architecture Metadata" />
          <dl className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-border-subtle">
              <dt className="text-text-muted">Domain</dt>
              <dd className="font-semibold text-text-primary">Retail & Commerce</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-border-subtle">
              <dt className="text-text-muted">Role</dt>
              <dd className="font-semibold text-text-primary">BI Architect & Analyst</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-border-subtle">
              <dt className="text-text-muted">Solution Type</dt>
              <dd className="font-semibold text-text-primary">Executive Dashboard</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-text-muted">Delivery Phase</dt>
              <dd className="font-semibold text-primary">Production Deployed</dd>
            </div>
          </dl>
        </Card>
      </div>

      {/* Architecture & Flow Skeleton */}
      <Card padding="xl" className="space-y-4">
        <SectionHeading
          overline="System Architecture"
          title="Data Pipeline & Model Flow"
          description="Structured data flow from raw transactional feeds to conformed star schema and visual presentation layer."
        />

        <div className="p-6 bg-surface-sidebar rounded-xl border border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <div className="p-3 bg-surface-card rounded-lg border border-border-subtle shadow-xs w-full md:w-auto">
            <span className="text-[10px] font-semibold uppercase text-text-muted block">Source Layer</span>
            <span className="text-xs font-semibold text-text-primary">Raw POS / Excel Feeds</span>
          </div>
          <Icons.arrow_forward className="text-primary hidden md:block" size={16} />
          <div className="p-3 bg-surface-card rounded-lg border border-border-subtle shadow-xs w-full md:w-auto">
            <span className="text-[10px] font-semibold uppercase text-text-muted block">Transformation</span>
            <span className="text-xs font-semibold text-text-primary">Power Query / SQL Cleanse</span>
          </div>
          <Icons.arrow_forward className="text-primary hidden md:block" size={16} />
          <div className="p-3 bg-surface-card rounded-lg border border-border-subtle shadow-xs w-full md:w-auto">
            <span className="text-[10px] font-semibold uppercase text-text-muted block">Dimensional Model</span>
            <span className="text-xs font-semibold text-text-primary">Star Schema & DAX Engine</span>
          </div>
          <Icons.arrow_forward className="text-primary hidden md:block" size={16} />
          <div className="p-3 bg-surface-card rounded-lg border border-border-subtle shadow-xs w-full md:w-auto">
            <span className="text-[10px] font-semibold uppercase text-text-muted block">Delivery</span>
            <span className="text-xs font-semibold text-text-primary">Executive Power BI Suite</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
