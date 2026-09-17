import { LinkButton } from '@/components/ui/LinkButton';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <Card padding="xl" className="max-w-lg w-full text-center space-y-6">
        <div className="flex justify-center">
          <Badge variant="tint" size="md">
            404 · Unresolved Dimension
          </Badge>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            Record Not Found
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            The requested resource or page does not exist in this workspace partition. The route may have been archived or restructured.
          </p>
        </div>

        <div className="p-3 bg-surface-sidebar rounded-lg border border-border-subtle text-left text-xs text-text-muted font-mono">
          <span className="text-primary font-semibold">STATUS:</span> 404_PAGE_NOT_FOUND
          <br />
          <span className="text-primary font-semibold">ACTION:</span> Verify route or return to the workspace overview.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <LinkButton href="/" variant="primary" size="md" showArrow>
            Return to Overview
          </LinkButton>
          <LinkButton href="/work" variant="secondary" size="md">
            Browse Projects
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
