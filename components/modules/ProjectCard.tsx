import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';
import { CaseStudy } from '@/lib/types/portfolio';

export interface ProjectCardProps {
  project: CaseStudy;
  className?: string;
}

export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  return (
    <Card hoverable padding="none" className={`flex flex-col overflow-hidden ${className}`}>
      {/* Visual Header / Media Placeholder */}
      <div className="relative aspect-video bg-surface-canvas-subtle border-b border-border-subtle p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="tint" size="sm">
            {project.category}
          </Badge>
          <span className="text-[11px] font-medium text-text-muted bg-surface-card/90 px-2 py-0.5 rounded border border-border-subtle">
            {project.domain}
          </span>
        </div>

        <div className="p-3 bg-surface-card/95 rounded-lg border border-border-subtle shadow-xs">
          <span className="text-[10px] font-semibold uppercase text-text-muted tracking-wider block">
            Solution Architecture
          </span>
          <p className="text-xs font-semibold text-text-primary truncate">
            {project.title}
          </p>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2.5">
          <h3 className="text-base font-bold text-text-primary leading-snug">
            {project.title}
          </h3>

          <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
            {project.summary}
          </p>

          {/* Technology Chips */}
          <div className="flex flex-wrap gap-1 pt-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="neutral" size="sm">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[11px] text-text-muted self-center ml-1">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Card Action Footer */}
        <div className="pt-3.5 border-t border-border-subtle flex items-center justify-between">
          <span className="text-[11px] text-text-muted">
            {project.status}
          </span>
          <LinkButton
            href={`/work/${project.slug}`}
            variant="primary"
            size="sm"
            showArrow
          >
            Case Study
          </LinkButton>
        </div>
      </div>
    </Card>
  );
}
