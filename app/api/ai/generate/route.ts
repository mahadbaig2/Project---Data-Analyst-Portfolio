import { NextRequest, NextResponse } from 'next/server';
import { executeCaseStudyGeneration } from '@/lib/ai/orchestration/generate-case-study';
import { getAiConfig } from '@/lib/ai/config';
import { AiCaseStudyError } from '@/lib/ai/errors';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// In-memory concurrency tracker to prevent duplicate concurrent runs on the same document
const activeRuns = new Set<string>();

function isAuthorized(req: NextRequest): boolean {
  const config = getAiConfig();
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const querySecret = req.nextUrl.searchParams.get('secret') || '';

  const writeToken = process.env.SANITY_API_WRITE_TOKEN || '';
  const previewSecret = process.env.SANITY_PREVIEW_SECRET || '';
  const editorialSecret = config.editorialSecret;

  const validSecrets = [writeToken, previewSecret, editorialSecret].filter(
    (s) => typeof s === 'string' && s.trim().length > 0
  );

  // Check for Next.js Draft Mode bypass cookie (authenticated editor session)
  const draftBypassCookie = req.cookies.get('__prerender_bypass')?.value;
  const isDraftSession = Boolean(draftBypassCookie && draftBypassCookie.length > 0);

  // In production, require at least one configured secret or authenticated draft session
  if (validSecrets.length === 0 && !isDraftSession && process.env.NODE_ENV === 'production') {
    return false;
  }

  // If no secret configured in local dev, allow generation with mock mode
  if (validSecrets.length === 0 && !isDraftSession && process.env.NODE_ENV !== 'production') {
    return true;
  }

  return (
    isDraftSession ||
    validSecrets.includes(token) ||
    validSecrets.includes(querySecret) ||
    (Boolean(editorialSecret) && req.headers.get('x-editorial-secret') === editorialSecret)
  );
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'Valid editorial authentication credentials are required to trigger AI case-study generation.',
      },
      { status: 401 }
    );
  }

  const config = getAiConfig();
  let runLockKey: string | null = null;

  try {
    const body = await req.json();

    // 1. Source content validation
    if (!body.sourceContent || typeof body.sourceContent !== 'string') {
      return NextResponse.json(
        {
          error: 'INVALID_INPUT',
          message: 'Missing or empty sourceContent string in request body.',
        },
        { status: 400 }
      );
    }

    // 2. Source file size guard
    const contentBytes = Buffer.byteLength(body.sourceContent, 'utf-8');
    if (contentBytes > config.maxSourceSizeBytes) {
      return NextResponse.json(
        {
          error: 'PAYLOAD_TOO_LARGE',
          message: `Source content exceeds maximum allowed size of ${Math.round(config.maxSourceSizeBytes / 1024)} KB.`,
        },
        { status: 413 }
      );
    }

    // 3. Confidentiality guards
    if (!body.confidentialityAcknowledged) {
      return NextResponse.json(
        {
          error: 'CONFIDENTIALITY_REQUIRED',
          message: 'Confidentiality acknowledgement must be explicitly confirmed.',
        },
        { status: 400 }
      );
    }

    if (body.confidentialityStatus === 'confidential_do_not_process') {
      return NextResponse.json(
        {
          error: 'CONFIDENTIALITY_BLOCKED',
          message: 'Document is classified as confidential and processing is blocked.',
        },
        { status: 403 }
      );
    }

    // 4. Source document ID safety check
    if (body.sourceDocumentId && typeof body.sourceDocumentId === 'string') {
      if (!/^[a-zA-Z0-9_.-]+$/.test(body.sourceDocumentId)) {
        return NextResponse.json(
          {
            error: 'INVALID_SOURCE_ID',
            message: 'Source document ID contains invalid characters or path traversal.',
          },
          { status: 400 }
        );
      }
    }

    // 5. Target case study ID safety check
    if (body.targetCaseStudyId && typeof body.targetCaseStudyId === 'string') {
      if (!/^(drafts\.)?caseStudy-[a-z0-9-]+$/.test(body.targetCaseStudyId)) {
        return NextResponse.json(
          {
            error: 'INVALID_TARGET_ID',
            message: 'Target case study ID must follow the pattern "caseStudy-[slug]" or "drafts.caseStudy-[slug]".',
          },
          { status: 400 }
        );
      }
    }

    // 6. Concurrency lock on source document ID
    const key: string = body.sourceDocumentId || body.fileName || 'adhoc-run';
    runLockKey = key;
    if (activeRuns.has(key)) {
      return NextResponse.json(
        {
          error: 'CONCURRENT_RUN_IN_PROGRESS',
          message: `A generation run is already currently active for document "${key}". Please wait for it to complete.`,
        },
        { status: 409 }
      );
    }
    activeRuns.add(key);

    const snapshot = await executeCaseStudyGeneration({
      sourceContent: body.sourceContent,
      fileName: body.fileName,
      sourceDocumentId: body.sourceDocumentId,
      projectTitleHint: body.projectTitleHint,
      relatedOrganization: body.relatedOrganization,
      relatedExperienceId: body.relatedExperienceId,
      relatedTechnologies: body.relatedTechnologies,
      confidentialityStatus: body.confidentialityStatus || 'anonymized',
      confidentialityAcknowledged: Boolean(body.confidentialityAcknowledged),
      targetCaseStudyId: body.targetCaseStudyId,
    });

    return NextResponse.json({
      success: true,
      data: snapshot,
    });
  } catch (err: unknown) {
    if (err instanceof AiCaseStudyError) {
      return NextResponse.json(
        {
          success: false,
          code: err.code,
          message: err.userMessage,
          isRetryable: err.isRetryable,
        },
        { status: err.code === 'CONFIDENTIALITY_BLOCKED' ? 403 : 422 }
      );
    }

    console.error('[AI Generation Error]:', err);
    return NextResponse.json(
      {
        success: false,
        code: 'INTERNAL_ERROR',
        message: 'An unexpected internal error occurred during case study generation.',
      },
      { status: 500 }
    );
  } finally {
    if (runLockKey) {
      activeRuns.delete(runLockKey);
    }
  }
}
