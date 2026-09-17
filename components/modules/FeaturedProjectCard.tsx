import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';
import { Icons } from '@/components/ui/Icons';
import { CaseStudy } from '@/lib/types/portfolio';

export interface FeaturedProjectCardProps {
  project: CaseStudy;
  className?: string;
}

export function FeaturedProjectCard({ project, className = '' }: FeaturedProjectCardProps) {
  return (
    <Card hoverable padding="none" className={`overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Visual Architecture Preview */}
        <div className="lg:col-span-5 bg-surface-canvas-subtle p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-border-subtle flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Icons.analytics size={14} className="text-primary" />
              <span>Architectural Blueprint</span>
            </span>
            <Badge variant="tint" size="sm">
              {project.status}
            </Badge>
          </div>

          {/* Designed Mock Canvas Representation */}
          <div className="bg-surface-card rounded-xl border border-border-subtle p-4 shadow-xs space-y-3">
            <div className="flex justify-between items-start border-b border-border-subtle pb-2.5">
              <div>
                <span className="text-[10px] uppercase font-semibold text-text-muted">Primary Focus</span>
                <p className="text-sm font-bold text-text-primary mt-0.5">{project.domain}</p>
              </div>
              <Badge variant="soft" size="sm">
                Verified System
              </Badge>
            </div>

            {/* Architecture Node Snippet */}
            <div className="p-2.5 rounded-lg bg-surface-sidebar border border-border-subtle space-y-1 text-xs">
              <span className="text-[10px] font-semibold text-primary uppercase block">Core Model</span>
              <p className="font-medium text-text-primary text-xs">Conformed Star Schema & DAX Layer</p>
              <p className="text-[11px] text-text-secondary">Single-directional 1:N relations</p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
              <span>Platform: Power BI / Fabric</span>
              <span>Granularity: Weekly / Dept</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-text-muted">
            <span>Role: {project.role}</span>
            <span>{project.category}</span>
          </div>
        </div>

        {/* Right Column: Context, Problem & Impact */}
        <div className="lg:col-span-7 p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <Badge variant="tint" size="sm">
                {project.category}
              </Badge>
              <span className="text-xs text-text-muted">{project.domain}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-text-primary leading-tight">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {project.problem}
            </p>

            {/* Objectives / Deliverables Highlights */}
            {project.objectives && project.objectives.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                  Key Objectives & Architectural Scope
                </span>
                <ul className="space-y-1.5 text-xs text-text-secondary">
                  {project.objectives.slice(0, 3).map((obj) => (
                    <li key={obj.id} className="flex items-start gap-2">
                      <Icons.analytics size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-text-primary font-medium">{obj.title}:</strong>{' '}
                        {obj.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer Technologies & Primary Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border-subtle">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="neutral" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <LinkButton
                href={`/work/${project.slug}`}
                variant="primary"
                size="md"
                showArrow
              >
                View Full Case Study
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
