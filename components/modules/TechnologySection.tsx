import React from 'react';
import type { CapabilityItem, TechnologyGroup } from '@/lib/types/portfolio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icons } from '@/components/ui/Icons';

export function ValueChainDiagram() {
  const steps = [
    { label: 'Raw Data', sub: 'Transactions & APIs' },
    { label: 'Foundation', sub: 'SQL & Ingestion Pipelines' },
    { label: 'Modeling', sub: 'Kimball Star Schema' },
    { label: 'Analytics', sub: 'DAX & Performance' },
    { label: 'Business Intelligence', sub: 'Executive Power BI' },
    { label: 'Automation & AI', sub: 'LLM & Agent Workflows' },
    { label: 'Decisions', sub: 'Measurable Business Impact' },
  ];

  return (
    <div className="w-full bg-surface-card border border-border-subtle rounded-xl p-5 sm:p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
          End-to-End Data Value Chain
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
        {steps.map((step, idx) => (
          <div
            key={step.label}
            className="relative flex flex-col justify-between p-3 rounded-lg bg-surface-sidebar border border-border-subtle group hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-text-muted font-bold">
                0{idx + 1}
              </span>
              {idx < steps.length - 1 && (
                <span className="hidden lg:block text-text-muted text-xs">→</span>
              )}
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-primary">
                {step.label}
              </h4>
              <p className="text-[10px] text-text-muted mt-0.5 leading-tight">
                {step.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CapabilitiesGrid({ capabilities }: { capabilities: CapabilityItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {capabilities.map((cap) => {
        const IconComponent = Icons[cap.icon as keyof typeof Icons] || Icons.analytics;
        return (
          <Card key={cap.id} padding="lg" hoverable className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  {cap.category}
                </span>
                <div className="w-8 h-8 rounded-lg bg-surface-sidebar border border-border-subtle flex items-center justify-center text-primary">
                  <IconComponent size={18} />
                </div>
              </div>

              <h3 className="text-base font-bold text-text-primary">
                {cap.title}
              </h3>

              <p className="text-xs text-text-secondary leading-relaxed">
                {cap.description}
              </p>
            </div>

            <div className="pt-3 border-t border-border-subtle flex flex-wrap gap-1.5">
              {cap.skills.map((skill) => (
                <Badge key={skill} variant="neutral" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export function TechnologyEcosystem({ groups }: { groups: TechnologyGroup[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {groups.map((grp) => (
        <Card key={grp.category} padding="lg" className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-text-primary">
              {grp.category}
            </h3>
            <p className="text-xs text-text-muted">
              {grp.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {grp.technologies.map((tech) => (
              <div
                key={tech.name}
                className="p-2.5 rounded-lg bg-surface-sidebar border border-border-subtle flex flex-col justify-between space-y-1"
              >
                <span className="text-xs font-bold text-text-primary">
                  {tech.name}
                </span>
                <span className="text-[11px] text-text-secondary leading-tight">
                  {tech.context}
                </span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

export function SystemArchitectureFlow() {
  const flowStages = [
    {
      title: 'Business Systems',
      items: ['ERP (SAP, Navision)', 'WMS Logistics', 'CRM / POS Files'],
    },
    {
      title: 'Ingestion & Staging',
      items: ['SQL Server Stored Procedures', 'Azure Data Factory Pipelines', 'Automated Cleaning Scripts'],
    },
    {
      title: 'Analytical Data Model',
      items: ['Conformed Kimball Star Schema', 'Calculated DAX Measures', 'Fact / Dimension Granularity'],
    },
    {
      title: 'Executive Presentation',
      items: ['Power BI Certified Reports', 'Interactive Drillthroughs', 'Role-Based Row Security'],
    },
    {
      title: 'Decision Makers',
      items: ['Supply Chain Operations', 'Commercial Retail Leadership', 'Executive Directors'],
    },
  ];

  return (
    <Card padding="xl" className="space-y-5">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            Architecture Blueprint
          </span>
        </div>
        <h3 className="text-lg font-bold text-text-primary">
          Enterprise Analytical Flow & Data Lineage
        </h3>
        <p className="text-xs text-text-secondary">
          How raw transactions transform deterministically through dimensional modeling into verified business intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {flowStages.map((stage, i) => (
          <div
            key={stage.title}
            className="p-3.5 bg-surface-sidebar rounded-lg border border-border-subtle space-y-2 relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-primary font-bold">
                STAGE 0{i + 1}
              </span>
              {i < flowStages.length - 1 && (
                <span className="hidden md:block text-text-muted text-xs">→</span>
              )}
            </div>
            <h4 className="text-xs font-bold text-text-primary">
              {stage.title}
            </h4>
            <ul className="space-y-1">
              {stage.items.map((item, idx) => (
                <li key={idx} className="text-[11px] text-text-secondary flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Augmented AI Layer callout */}
      <div className="p-3.5 bg-surface-sidebar/60 rounded-lg border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <span className="font-bold text-primary text-xs flex items-center gap-1.5">
            <Icons.school size={14} />
            Augmented Analytical Layer (RAG & Agent Workflows)
          </span>
          <p className="text-[11px] text-text-secondary">
            Synthesizing natural language questions directly against curated dimensional schemas and vector knowledge bases.
          </p>
        </div>
        <Badge variant="tint" size="sm">
          Applied R&D
        </Badge>
      </div>
    </Card>
  );
}

export function ProblemsAndApproach({
  problems,
  approach,
}: {
  problems: { title: string; description: string }[];
  approach: { step: string; title: string; detail: string }[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Problems I Solve */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            Problem Identification
          </span>
          <h3 className="text-base font-bold text-text-primary">
            Analytical Bottlenecks I Solve
          </h3>
          <p className="text-xs text-text-secondary">
            Common architectural and operational friction points addressed across enterprise engagements.
          </p>
        </div>

        <div className="space-y-3">
          {problems.map((prob) => (
            <Card key={prob.title} padding="md" className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-text-primary">
                  {prob.title}
                </h4>
                <Badge variant="neutral" size="sm">
                  Operational Focus
                </Badge>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                {prob.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Professional 7-Step Approach */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            Delivery Methodology
          </span>
          <h3 className="text-base font-bold text-text-primary">
            7-Step Engineering Methodology
          </h3>
          <p className="text-xs text-text-secondary">
            Disciplined execution lifecycle from requirements gathering to ongoing enablement.
          </p>
        </div>

        <div className="space-y-2.5">
          {approach.map((app) => (
            <div
              key={app.step}
              className="p-3 bg-surface-card rounded-lg border border-border-subtle flex items-start gap-3 hover:border-primary/40 transition-colors"
            >
              <span className="text-xs font-mono font-bold text-primary shrink-0 mt-0.5 px-2 py-0.5 bg-surface-sidebar rounded border border-border-subtle">
                {app.step}
              </span>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-text-primary">
                  {app.title}
                </h4>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  {app.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
