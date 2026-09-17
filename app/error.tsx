'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/LinkButton';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log safe error telemetry without exposing secrets
    console.error('Workspace boundary error:', error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4">
      <Card padding="xl" className="max-w-lg w-full text-center space-y-6">
        <div className="flex justify-center">
          <Badge variant="tint" size="md">
            System Error · Pipeline Interrupted
          </Badge>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            An Unexpected Exception Occurred
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            The workspace was unable to complete rendering this view. Your session remains secure.
          </p>
        </div>

        {error.digest && (
          <div className="p-2.5 bg-surface-sidebar rounded-lg border border-border-subtle text-xs text-text-muted font-mono">
            Digest: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button onClick={() => reset()} variant="primary" size="md">
            Retry View
          </Button>
          <LinkButton href="/" variant="secondary" size="md">
            Return to Overview
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
