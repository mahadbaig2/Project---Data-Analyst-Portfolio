import { NextRequest, NextResponse } from 'next/server';
import { executeCaseStudyGeneration } from '@/lib/ai/orchestration/generate-case-study';
import { getAiConfig } from '@/lib/ai/config';
import { AiCaseStudyError } from '@/lib/ai/errors';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

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

  // In production, require at least one configured secret
  if (validSecrets.length === 0 && process.env.NODE_ENV === 'production') {
    return false;
  }

  // If no secret configured in local dev, allow generation with mock mode
  if (validSecrets.length === 0 && process.env.NODE_ENV !== 'production') {
    return true;
  }

  return (
    validSecrets.includes(token) ||
    validSecrets.includes(querySecret) ||
    req.headers.get('x-editorial-secret') === editorialSecret
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

  try {
    const body = await req.json();

    if (!body.sourceContent || typeof body.sourceContent !== 'string') {
      return NextResponse.json(
        {
          error: 'INVALID_INPUT',
          message: 'Missing or empty sourceContent string in request body.',
        },
        { status: 400 }
      );
    }

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
  }
}
