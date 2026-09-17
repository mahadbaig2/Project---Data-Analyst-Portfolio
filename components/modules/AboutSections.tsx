import React from 'react';
import type {
  IdentityPillar,
  CareerPrinciple,
  EducationItem,
  CertificationItem,
} from '@/lib/types/portfolio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function AboutHeroSection() {
  return (
    <Card padding="xl" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Monogram / Avatar fallback */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-surface-sidebar border-2 border-primary/20 flex flex-col items-center justify-center shrink-0 shadow-inner">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-primary tracking-tight">
            MHB
          </span>
          <span className="text-[10px] uppercase font-bold text-text-muted mt-1">
            Mirza Hammad
          </span>
        </div>

        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="tint" size="sm" hasDot pulseDot>
              Professional Profile
            </Badge>
            <span className="text-xs text-text-muted">
              Karachi, Pakistan · Available for BI Consulting & Roles
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Architecting Resilient Data Systems & Business Intelligence
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed">
            I am a Data Analyst and BI Solutions Architect operating at the convergence of transactional data engineering, conformed dimensional modeling, and executive dashboard delivery. My professional focus centers on transforming unorganized operational data into verifiable commercial clarity.
          </p>
        </div>
      </div>
    </Card>
  );
}

export function IdentityPillarsGrid({ pillars }: { pillars: IdentityPillar[] }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
          Core Identity
        </span>
        <h3 className="text-base font-bold text-text-primary">
          Four Dimensions of Practice
        </h3>
        <p className="text-xs text-text-secondary">
          How analytical rigor, architectural discipline, teaching, and applied coding integrate in my daily work.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((pillar) => (
          <Card key={pillar.number} padding="lg" hoverable className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-primary">
                  {pillar.number}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  {pillar.role}
                </span>
              </div>
              <h4 className="text-sm font-bold text-text-primary">
                {pillar.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <div className="pt-2 border-t border-border-subtle">
              <span className="text-[11px] font-medium text-text-muted">
                Focus: <span className="text-text-primary">{pillar.focusArea}</span>
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function CareerPrinciplesSection({
  principles,
}: {
  principles: CareerPrinciple[];
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
          Operating Standards
        </span>
        <h3 className="text-base font-bold text-text-primary">
          Career Principles & Axioms
        </h3>
        <p className="text-xs text-text-secondary">
          Non-negotiable guidelines governing every query, data model, and report I publish.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {principles.map((pr) => (
          <Card key={pr.number} padding="lg" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-primary">
                {pr.number}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Standard
              </span>
            </div>
            <h4 className="text-sm font-bold text-text-primary">
              {pr.title}
            </h4>
            <p className="text-xs font-semibold text-primary italic">
              &ldquo;{pr.axiom}&rdquo;
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              {pr.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function EducationAndCertifications({
  education,
  certifications,
}: {
  education: EducationItem[];
  certifications: CertificationItem[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Education */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            Academic Foundation
          </span>
          <h3 className="text-base font-bold text-text-primary">
            Education
          </h3>
        </div>

        <div className="space-y-3">
          {education.map((edu) => (
            <Card key={edu.id} padding="lg" className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-text-primary">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-semibold text-primary">
                    {edu.institution}
                  </p>
                </div>
                <Badge variant="neutral" size="sm">
                  {edu.period}
                </Badge>
              </div>

              {edu.honors && (
                <div className="inline-block">
                  <Badge variant="tint" size="sm">
                    ★ {edu.honors}
                  </Badge>
                </div>
              )}

              <p className="text-xs text-text-secondary leading-relaxed">
                {edu.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            Verified Competencies
          </span>
          <h3 className="text-base font-bold text-text-primary">
            Certifications & Training
          </h3>
        </div>

        <div className="space-y-3">
          {certifications.map((cert) => (
            <Card key={cert.id} padding="lg" className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-text-primary">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-text-muted">
                    Issued by <span className="text-text-primary font-medium">{cert.issuer}</span>
                  </p>
                </div>
                <Badge variant="neutral" size="sm">
                  {cert.credentialType}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1 pt-1 border-t border-border-subtle">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-surface-sidebar text-text-secondary rounded text-[10px] border border-border-subtle"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactPanel() {
  return (
    <div id="contact" className="space-y-6 pt-4 scroll-mt-20">
      <Card padding="xl" className="space-y-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
              Direct Inquiries
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Let&rsquo;s turn data into something useful.
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            For analytics consulting, enterprise BI solution architecture, corporate training, or career opportunities.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-surface-sidebar rounded-xl border border-border-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
              Direct Email
            </span>
            <a
              href="mailto:hammadbaig.work@gmail.com"
              className="text-xs font-bold text-primary hover:underline break-all"
            >
              hammadbaig.work@gmail.com
            </a>
          </div>

          <div className="p-4 bg-surface-sidebar rounded-xl border border-border-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
              Location
            </span>
            <span className="text-xs font-bold text-text-primary block">
              Karachi, Pakistan (PKT / UTC+5)
            </span>
          </div>

          <div className="p-4 bg-surface-sidebar rounded-xl border border-border-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
              Professional Network
            </span>
            <a
              href="https://linkedin.com/in/mirzahammadbaig"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              LinkedIn Profile ↗
            </a>
          </div>

          <div className="p-4 bg-surface-sidebar rounded-xl border border-border-subtle space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
              Code & Articles
            </span>
            <div className="flex items-center gap-3 text-xs font-bold text-primary">
              <a
                href="https://github.com/mirzahammadbaig"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub ↗
              </a>
              <span>·</span>
              <a
                href="https://medium.com/@mirzahammad"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Medium ↗
              </a>
            </div>
          </div>
        </div>

        {/* Honest CV status notice */}
        <div className="p-4 bg-surface-sidebar rounded-xl border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-semibold text-text-primary">
              Curriculum Vitae (PDF) Status
            </span>
            <p className="text-text-muted text-[11px]">
              The official CV PDF document is being finalized with verified 2026 enterprise milestones. Please email directly for formal employment verification or immediate dossier requests.
            </p>
          </div>
          <Badge variant="neutral" size="sm" className="shrink-0 self-start sm:self-center">
            Verification on Request
          </Badge>
        </div>
      </Card>
    </div>
  );
}
