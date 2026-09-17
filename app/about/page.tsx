import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';
import { Icons } from '@/components/ui/Icons';
import { PROFILE_IDENTITY } from '@/lib/fixtures/portfolio';

export const metadata: Metadata = {
  title: 'About & Contact',
  description:
    'Professional profile, background, core values, and contact channels for Mirza Hammad Baig.',
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        badgeText="Professional Profile"
        title="About & Identity"
        description="Analyst · Solutions Architect · Educator · Builder. Dedicated to translating complex organizational data into clear decision paths."
        actions={
          <LinkButton href="#contact" variant="primary">
            Direct Contact
          </LinkButton>
        }
      />

      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding="xl" className="lg:col-span-2 space-y-4">
          <SectionHeading
            overline="Background"
            title="The Intersection of Engineering and Business Strategy"
          />
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              I am a data professional working across business intelligence, dimensional modeling, and end-to-end data systems. My work focuses on building high-trust analytics solutions that enterprise leaders rely on to make informed strategic decisions.
            </p>
            <p>
              Rather than treating data as an isolated technical exercise, I view reporting environments as decision-enablement systems. Every table, relationship, and measure must directly answer a concrete business question and provide transparent auditability.
            </p>
            <p>
              Beyond technical delivery, I actively teach and mentor in applied data analysis, helping professionals and students bridge the gap between tool syntax and real-world analytical reasoning.
            </p>
          </div>
        </Card>

        {/* Identity Quick Card */}
        <Card padding="lg" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg shrink-0">
              MH
            </div>
            <div>
              <h3 className="text-base font-bold text-text-primary">
                {PROFILE_IDENTITY.name}
              </h3>
              <p className="text-xs text-text-secondary">
                {PROFILE_IDENTITY.role}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border-subtle text-xs">
            <div className="flex justify-between py-1">
              <span className="text-text-muted">Location</span>
              <span className="font-medium text-text-primary">{PROFILE_IDENTITY.location}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-text-muted">Status</span>
              <Badge variant="tint" size="sm" hasDot pulseDot>
                Available
              </Badge>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-text-muted">Engagement</span>
              <span className="font-medium text-text-primary">Full-Time / Consulting</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Career Principles */}
      <div>
        <SectionHeading
          overline="Guiding Values"
          title="Core Professional Principles"
          description="The standards that guide every architecture and analysis project."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card padding="lg" className="space-y-2.5">
            <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">
              Principle 01
            </span>
            <h3 className="text-base font-bold text-text-primary">
              Evidence Before Decoration
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Never prioritize visual gimmicks over data accuracy, clear context, and mathematical correctness.
            </p>
          </Card>

          <Card padding="lg" className="space-y-2.5">
            <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">
              Principle 02
            </span>
            <h3 className="text-base font-bold text-text-primary">
              System Over Ad-Hoc
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Design conformed, reusable dimensional models rather than brittle one-off report queries.
            </p>
          </Card>

          <Card padding="lg" className="space-y-2.5">
            <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">
              Principle 03
            </span>
            <h3 className="text-base font-bold text-text-primary">
              Calm Decision Clarity
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Create executive interfaces that inspire confidence, eliminate noise, and prompt definitive action.
            </p>
          </Card>
        </div>
      </div>

      {/* Direct Contact Section (Stable Anchor #contact) */}
      <div id="contact" className="scroll-mt-20">
        <SectionHeading
          overline="Direct Channels"
          title="Connect & Inquire"
          description="Open for enterprise analytics roles, BI architecture consulting, and corporate training partnerships."
        />

        <Card padding="xl" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-text-primary">
                Reach Out Directly
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Whether you need a senior BI architect to structure your reporting foundations or a trainer to upskill your data teams, I welcome conversation.
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${PROFILE_IDENTITY.email}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm sm:text-base"
                >
                  <Icons.email size={16} />
                  <span>{PROFILE_IDENTITY.email}</span>
                </a>
              </div>
            </div>

            <div className="p-5 bg-surface-sidebar rounded-xl border border-border-subtle flex flex-col justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-text-primary">
                  Professional Credentials & Profiles
                </span>
                <p className="text-xs text-text-secondary">
                  Connect across direct professional networks.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {PROFILE_IDENTITY.socialLinks.map((social) => {
                  const IconComponent = Icons[social.platform];
                  return (
                    <LinkButton
                      key={social.platform}
                      href={social.href}
                      variant="secondary"
                      size="sm"
                      isExternal
                    >
                      {IconComponent && <IconComponent size={14} className="mr-1.5" />}
                      <span>{social.label}</span>
                    </LinkButton>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
