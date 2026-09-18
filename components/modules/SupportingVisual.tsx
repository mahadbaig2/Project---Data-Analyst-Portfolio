import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icons } from '@/components/ui/Icons';
import { SupportingVisualSpec } from '@/lib/ai/schemas/visual-spec';

export interface SupportingVisualProps {
  spec: SupportingVisualSpec;
  className?: string;
}

export function SupportingVisual({ spec, className = '' }: SupportingVisualProps) {
  return (
    <Card padding="lg" className={`space-y-5 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Supporting Visual Specification
            </span>
            {!spec.isImplemented && (
              <Badge variant="tint" size="sm">
                Proposed Recommendation
              </Badge>
            )}
          </div>
          <h4 className="text-base font-bold text-text-primary mt-0.5">{spec.title}</h4>
          {spec.purpose && <p className="text-xs text-text-secondary mt-0.5">{spec.purpose}</p>}
        </div>
        <Badge variant="tint" size="sm">
          {spec.visualType.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      {/* Visual Content based on type */}
      {spec.visualType === 'process_flow' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {spec.elements.map((el, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-surface-sidebar rounded-xl border border-border-subtle flex flex-col justify-between gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary bg-highlight-tint px-1.5 py-0.5 rounded">
                  0{idx + 1}
                </span>
                {el.tag && (
                  <span className="text-[9px] uppercase font-semibold text-text-muted">
                    {el.tag}
                  </span>
                )}
              </div>
              <div>
                <h5 className="text-xs font-bold text-text-primary">{el.label}</h5>
                {el.description && (
                  <p className="text-[11px] text-text-secondary mt-1">{el.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {spec.visualType === 'before_after' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-surface-sidebar rounded-xl border border-red-500/20 space-y-2">
            <div className="flex items-center gap-1.5 text-red-600 font-bold text-xs uppercase tracking-wider">
              <Icons.close size={14} />
              <span>Prior Manual Workflow</span>
            </div>
            <ul className="space-y-1.5 text-xs text-text-secondary">
              {(spec.beforeState || spec.elements.filter((e) => e.status === 'current')).map(
                (item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                    <span>{typeof item === 'string' ? item : item.label}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="p-4 bg-surface-sidebar rounded-xl border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-1.5 text-chart-accent-emerald font-bold text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-chart-accent-emerald" />
              <span>Automated Semantic Architecture</span>
            </div>
            <ul className="space-y-1.5 text-xs text-text-secondary">
              {(spec.afterState || spec.elements.filter((e) => e.status === 'improved')).map(
                (item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-chart-accent-emerald mt-1.5 shrink-0" />
                    <span>{typeof item === 'string' ? item : item.label}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}

      {(spec.visualType === 'stakeholder_map' ||
        spec.visualType === 'capability_map' ||
        spec.visualType === 'qualitative_pipeline') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {spec.elements.map((el, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-surface-sidebar rounded-xl border border-border-subtle space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-text-primary">{el.label}</h5>
                {el.tag && (
                  <Badge variant="neutral" size="sm">
                    {el.tag}
                  </Badge>
                )}
              </div>
              {el.description && (
                <p className="text-[11px] text-text-secondary leading-relaxed">{el.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Accessible Text Summary */}
      <div className="p-3 bg-surface-sidebar rounded-lg border border-border-subtle text-xs text-text-secondary flex items-start gap-2">
        <Icons.analytics size={15} className="text-primary shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">{spec.accessibleSummary}</p>
      </div>
    </Card>
  );
}
