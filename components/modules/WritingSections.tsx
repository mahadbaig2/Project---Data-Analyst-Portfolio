import React from 'react';
import type { ArticleItem } from '@/lib/types/portfolio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icons } from '@/components/ui/Icons';
import { LinkButton } from '@/components/ui/LinkButton';

export function WritingHeroBanner() {
  return (
    <Card padding="xl" className="space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <Badge variant="tint" size="sm">
              Publication & Field Mapping
            </Badge>
            <span className="text-xs text-text-muted">Medium & Technical Journals</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Understanding the Data Field: A Comprehensive Series
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed">
            Deconstructing the fragmented data landscape into first principles. Exploring how raw bits translate through transactional infrastructure, dimensional engineering, business intelligence, and emerging autonomous analytical agents.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
          <LinkButton
            href="https://medium.com/@mirzahammad"
            variant="primary"
            isExternal
            showArrow
            className="w-full justify-center"
          >
            Visit Medium Publication
          </LinkButton>
          <div className="p-3 bg-surface-sidebar rounded-lg border border-border-subtle text-xs text-text-muted text-center sm:text-left">
            <span>Published independently to provide clear field taxonomies for students and practitioners.</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function KnowledgeMapSection({
  layers,
}: {
  layers: { layer: string; description: string; examples: string[] }[];
}) {
  return (
    <Card padding="xl" className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            Field Architecture
          </span>
        </div>
        <h3 className="text-lg font-bold text-text-primary">
          The Full Data Ecosystem: Layered Knowledge Map
        </h3>
        <p className="text-xs text-text-secondary">
          How foundational infrastructure layers support analytical and decision engineering.
        </p>
      </div>

      {/* Vertical responsive layer stack */}
      <div className="space-y-3 relative">
        {layers.map((layer, idx) => (
          <div
            key={layer.layer}
            className="p-4 rounded-xl bg-surface-sidebar border border-border-subtle hover:border-primary/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-primary">
                  LAYER 0{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-text-primary">
                  {layer.layer}
                </h4>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {layer.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 shrink-0 md:max-w-xs">
              {layer.examples.map((example) => (
                <span
                  key={example}
                  className="px-2 py-0.5 bg-surface-card text-text-secondary rounded text-[11px] border border-border-subtle font-mono"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Cross-Cutting Governance Banner */}
        <div className="p-3.5 bg-surface-card rounded-xl border border-primary/30 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Badge variant="tint" size="sm">
              Cross-Cutting Foundation
            </Badge>
            <span className="font-semibold text-text-primary">
              Data Governance, Lineage, Security, and Quality Assurance
            </span>
          </div>
          <span className="text-text-muted text-[11px] hidden sm:block">
            Spanning all layers from ingestion to executive delivery
          </span>
        </div>
      </div>
    </Card>
  );
}

export function ArticleCardsGrid({ articles }: { articles: ArticleItem[] }) {
  const featured = articles.find((a) => a.isFeatured);
  const others = articles.filter((a) => a.id !== featured?.id);

  return (
    <div className="space-y-6">
      {/* Featured Deep Dive */}
      {featured && (
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Foundational Essay
          </span>
          <Card padding="xl" hoverable className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="tint" size="sm">
                  {featured.series}
                </Badge>
                <Badge variant="neutral" size="sm">
                  {featured.category}
                </Badge>
              </div>
              <span className="text-[11px] text-text-muted">
                Core Publication
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                {featured.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {featured.summary}
              </p>
            </div>

            <div className="pt-2">
              <LinkButton
                href={featured.mediumUrl}
                variant="primary"
                size="sm"
                isExternal
                showArrow
              >
                Read Article on Medium
              </LinkButton>
            </div>
          </Card>
        </div>
      )}

      {/* Series Grid */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          All Essays in the Series
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((article) => (
            <Card
              key={article.id}
              padding="lg"
              hoverable
              className="space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="neutral" size="sm">
                    {article.category}
                  </Badge>
                  <Icons.article size={14} className="text-text-muted" />
                </div>

                <h4 className="text-sm font-bold text-text-primary">
                  {article.title}
                </h4>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle">
                <LinkButton
                  href={article.mediumUrl}
                  variant="ghost"
                  size="sm"
                  isExternal
                  showArrow
                  className="p-0 text-primary font-semibold"
                >
                  Read on Medium
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhyIWriteSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card padding="lg" className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-surface-sidebar border border-border-subtle flex items-center justify-center text-primary">
            <Icons.article size={15} />
          </div>
          <h4 className="text-sm font-bold text-text-primary">
            Why I Write Technical Essays
          </h4>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          Writing forces precision. In a domain saturated with marketing jargon and competing vendor terminologies, articulating the structural differences between data infrastructure, dimensional engineering, and statistical analytics solidifies practical understanding.
        </p>
      </Card>

      <Card padding="lg" className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-surface-sidebar border border-border-subtle flex items-center justify-center text-primary">
            <Icons.school size={15} />
          </div>
          <h4 className="text-sm font-bold text-text-primary">
            The Connection to Teaching & Delivery
          </h4>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          Every concept written in my essays feeds directly back into my lectures at Atomcamp and my commercial client workshops. When foundational explanations are stress-tested against real student confusion, client communication becomes sharper and more transparent.
        </p>
      </Card>
    </div>
  );
}
