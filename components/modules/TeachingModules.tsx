import React from 'react';
import type { TeachingTopic } from '@/lib/types/portfolio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';

export function AtomcampLecturerHero() {
  return (
    <Card padding="xl" className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="tint" size="sm" hasDot pulseDot>
              Academic Faculty Role
            </Badge>
            <span className="text-xs text-text-muted">Atomcamp</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Power BI Lecturer & Technical Mentor
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed">
            Delivering cohort-based professional data education bridging theoretical database concepts with production enterprise Power BI reporting. Guiding emerging analysts through hands-on data modeling, DAX formulation, and commercial problem solving.
          </p>
        </div>

        <div className="p-4 bg-surface-sidebar rounded-xl border border-border-subtle shrink-0 lg:w-72 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
            Pedagogical Focus
          </span>
          <ul className="space-y-2 text-xs text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Kimball Dimensional Star Schema Design</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Context Transition & Advanced DAX</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Executive Reporting & Drillthroughs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Individual Capstone Project Mentorship</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Verified Muller & Phipps Enablement Callout */}
      <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <span className="font-semibold text-text-primary">
            Corporate Logistics Training & Internal Enablement
          </span>
          <p className="text-text-muted text-[11px]">
            Conducted internal hands-on Power BI training for logistics and operations analysts at Muller & Phipps, transitioning teams from static spreadsheets to automated dashboard consumption.
          </p>
        </div>
        <Badge variant="neutral" size="sm" className="shrink-0 self-start sm:self-center">
          Corporate Practice
        </Badge>
      </div>
    </Card>
  );
}

export function LearningFlowSection({
  flow,
}: {
  flow: { step: string; title: string; description: string }[];
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
          Pedagogical Framework
        </span>
        <h3 className="text-base font-bold text-text-primary">
          From Concept to Independent Application
        </h3>
        <p className="text-xs text-text-secondary">
          Structured 6-phase learning loop ensuring analysts develop genuine problem-solving independence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {flow.map((item, idx) => (
          <Card key={item.step} padding="md" className="space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-primary font-bold">
                  {item.step}
                </span>
                {idx < flow.length - 1 && (
                  <span className="hidden lg:block text-text-muted text-xs">→</span>
                )}
              </div>
              <h4 className="text-xs font-bold text-text-primary">
                {item.title}
              </h4>
            </div>
            <p className="text-[11px] text-text-secondary leading-snug">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function TeachingTopicCards({ topics }: { topics: TeachingTopic[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {topics.map((topic) => (
        <Card key={topic.id} padding="lg" hoverable className="space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="tint" size="sm">
                {topic.track}
              </Badge>
              <span className="text-[10px] text-text-muted font-medium">
                {topic.targetAudience}
              </span>
            </div>

            <h3 className="text-base font-bold text-text-primary">
              {topic.title}
            </h3>

            <p className="text-xs text-text-secondary leading-relaxed">
              {topic.description}
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-border-subtle">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
              Core Modules Covered:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {topic.coreConcepts.map((concept) => (
                <span
                  key={concept}
                  className="px-2 py-0.5 bg-surface-sidebar text-text-secondary rounded text-[11px] border border-border-subtle font-mono"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function MentorshipAndEditorial({
  themes,
}: {
  themes: { title: string; description: string }[];
}) {
  return (
    <div className="space-y-8">
      {/* Editorial Statement */}
      <Card padding="xl" className="bg-primary/5 border-primary/20 text-center py-10">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-2xl text-primary font-serif">“</span>
          <blockquote className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
            Good analytics training connects tools to business questions.
          </blockquote>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Tools change, libraries evolve, and syntax is easily referenced. True analytical maturity lies in the ability to decompose ambiguous commercial dilemmas into clean, testable dimensional hypotheses.
          </p>
        </div>
      </Card>

      {/* Mentorship Themes */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            1-on-1 Guidance
          </span>
          <h3 className="text-base font-bold text-text-primary">
            Mentorship & Capstone Advisory Themes
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <Card key={theme.title} padding="md" className="space-y-2">
              <h4 className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                <span className="text-primary">•</span>
                {theme.title}
              </h4>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                {theme.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <Card padding="lg" className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-text-primary">
            Interested in Corporate Workshops or Analytical Mentorship?
          </h4>
          <p className="text-xs text-text-secondary">
            Available for enterprise data modeling training, Power BI curriculum design, and guest lectures.
          </p>
        </div>
        <LinkButton href="/about#contact" variant="primary" size="sm" showArrow className="shrink-0">
          Inquire About Training
        </LinkButton>
      </Card>
    </div>
  );
}
