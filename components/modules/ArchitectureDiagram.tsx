import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icons } from '@/components/ui/Icons';
import { ArchitectureGraph } from '@/lib/types/portfolio';

export interface ArchitectureDiagramProps {
  graph: ArchitectureGraph;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ArchitectureDiagram({
  graph,
  title = 'Data Lineage & Dimensional Flow',
  subtitle = 'Deterministic end-to-end data pipeline from raw sources through dimensional modeling to visual layer.',
  className = '',
}: ArchitectureDiagramProps) {
  return (
    <Card padding="xl" className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            System Architecture & Lineage
          </span>
          <h3 className="text-lg font-bold text-text-primary mt-0.5">
            {title}
          </h3>
          <p className="text-xs text-text-secondary mt-1">
            {subtitle}
          </p>
        </div>
        <Badge variant="tint" size="sm" hasDot>
          Structured Pipeline
        </Badge>
      </div>

      {/* Visual Pipeline Flow Container */}
      <div className="overflow-x-auto pb-4 custom-scroll">
        <div className="min-w-[720px] flex items-stretch justify-between gap-3 relative py-2">
          {graph.nodes.map((node, index) => {
            const isLast = index === graph.nodes.length - 1;
            const edge = graph.edges.find((e) => e.from === node.id);

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div className="flex-1 bg-surface-sidebar rounded-xl border border-border-subtle p-4 flex flex-col justify-between gap-3 shadow-xs hover:border-border-hover transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                        {node.category}
                      </span>
                      <span className="text-[10px] font-bold text-primary bg-highlight-tint px-1.5 py-0.5 rounded">
                        0{index + 1}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-text-primary">
                      {node.title}
                    </h4>

                    {node.items && node.items.length > 0 && (
                      <ul className="space-y-1 pt-1 text-[11px] text-text-secondary">
                        {node.items.map((item) => (
                          <li key={item} className="flex items-center gap-1.5 truncate">
                            <span className="w-1 h-1 rounded-full bg-chart-accent-emerald shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {node.detail && (
                    <div className="pt-2 border-t border-border-subtle text-[10px] text-text-muted">
                      {node.detail}
                    </div>
                  )}
                </div>

                {/* Connecting Edge Arrow */}
                {!isLast && (
                  <div className="flex flex-col items-center justify-center px-1 shrink-0">
                    <Icons.arrow_forward size={18} className="text-primary" />
                    {edge?.label && (
                      <span className="text-[9px] font-semibold text-text-muted uppercase mt-1 text-center max-w-[60px] leading-tight">
                        {edge.label}
                      </span>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Accessible Text Alternative (WCAG AA) */}
      <div className="p-3 bg-surface-sidebar rounded-lg border border-border-subtle text-xs text-text-secondary flex items-start gap-2.5">
        <Icons.analytics size={16} className="text-primary shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-text-primary block text-[11px] uppercase tracking-wider mb-0.5">
            Architecture Lineage Summary
          </span>
          <p className="text-[11px] leading-relaxed text-text-secondary">
            {graph.textSummary}
          </p>
        </div>
      </div>
    </Card>
  );
}
