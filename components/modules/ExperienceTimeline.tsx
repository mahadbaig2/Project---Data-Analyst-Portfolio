import React from 'react';
import type { ExperienceItem } from '@/lib/types/portfolio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icons } from '@/components/ui/Icons';

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="relative border-l border-border-subtle ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
      {items.map((item) => {
        return (
          <div key={item.id} className="relative group">
            {/* Timeline Marker Node */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 ${
                item.isCurrent
                  ? 'bg-primary border-primary-light shadow-[0_0_0_4px_rgba(46,125,79,0.15)]'
                  : 'bg-surface-card border-border-strong'
              }`}
            />

            <Card padding="lg" className="space-y-5">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-border-subtle pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-text-primary tracking-tight">
                      {item.role}
                    </h3>
                    {item.isCurrent && (
                      <Badge variant="tint" size="sm" hasDot pulseDot>
                        Current Role
                      </Badge>
                    )}
                    {item.appointmentType && (
                      <Badge variant="neutral" size="sm">
                        {item.appointmentType}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-primary">
                    {item.company}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium shrink-0 bg-surface-sidebar px-2.5 py-1 rounded-md border border-border-subtle self-start">
                  <Icons.timeline size={13} className="text-text-muted" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Scope Overview */}
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.scopeOverview}
              </p>

              {/* Key Responsibilities */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  Key Responsibilities & System Ownership
                </h4>
                <ul className="space-y-1.5">
                  {item.responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="text-xs text-text-secondary flex items-start gap-2"
                    >
                      <span className="text-primary mt-0.5 shrink-0">▸</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Quantitative / Architecture Outcomes */}
              {item.verifiedOutcomes && item.verifiedOutcomes.length > 0 && (
                <div className="p-3.5 bg-surface-sidebar rounded-lg border border-border-subtle space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                    Documented Operational Impact
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.verifiedOutcomes.map((outcome, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-bold text-primary">
                            {outcome.metric}
                          </span>
                          <span className="text-xs font-medium text-text-primary">
                            {outcome.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-text-muted leading-normal">
                          {outcome.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Supported Departments & Tech Stack */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-border-subtle">
                {item.supportedDepartments && item.supportedDepartments.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-text-muted font-medium text-[11px]">
                      Stakeholders:
                    </span>
                    {item.supportedDepartments.map((dept) => (
                      <span
                        key={dept}
                        className="px-2 py-0.5 bg-surface-sidebar text-text-secondary rounded text-[11px] border border-border-subtle"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="neutral" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export function WorkingStyleCards() {
  const styles = [
    {
      title: 'Stakeholder Discovery',
      icon: 'search',
      description:
        'Interviewing department heads to isolate core business bottlenecks, identify unstated operational needs, and establish precise analytical definitions before writing any query.',
    },
    {
      title: 'Data Modeling & Architecture',
      icon: 'account_tree',
      description:
        'Designing conformed dimensional Kimball star schemas with granular fact tables and dimension hierarchies to eliminate circular relationships and guarantee sub-second dashboard performance.',
    },
    {
      title: 'Enterprise BI Delivery',
      icon: 'analytics',
      description:
        'Building standardized, certified Power BI reporting suites with defensive DAX measures, row-level security, and structured drill-through paths tailored for executive decision-makers.',
    },
    {
      title: 'Training & Enablement',
      icon: 'school',
      description:
        'Empowering operational and analytical staff through systematic workshops and documentation, ensuring business teams independently navigate and utilize deployed analytical systems.',
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {styles.map((style) => {
        const IconComponent = Icons[style.icon as keyof typeof Icons];
        return (
          <Card key={style.title} padding="lg" hoverable className="space-y-3">
            <div className="w-8 h-8 rounded-lg bg-surface-sidebar border border-border-subtle flex items-center justify-center text-primary">
              <IconComponent size={18} />
            </div>
            <h4 className="text-sm font-bold text-text-primary">
              {style.title}
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              {style.description}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
