import { revalidateTag, revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { revalidateSecret } from '@/sanity/env';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret') || req.headers.get('x-sanity-revalidate-secret');

    // Secure secret comparison
    if (!revalidateSecret || secret !== revalidateSecret) {
      return NextResponse.json(
        { message: 'Invalid or missing revalidation secret.' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const tag = body?._type || searchParams.get('tag');
    const slug = body?.slug?.current || searchParams.get('slug');

    if (tag) {
      // Revalidate content tag
      revalidateTag(tag, 'max');
    }

    if (slug) {
      // Revalidate specific dynamic route
      revalidatePath(`/work/${slug}`);
      revalidateTag(`caseStudy:${slug}`, 'max');
    }

    // Always revalidate root sitemap and index when content changes
    revalidatePath('/sitemap.xml');
    revalidatePath('/');

    return NextResponse.json({
      revalidated: true,
      tag: tag || null,
      slug: slug || null,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Revalidate Error]:', message);
    return NextResponse.json(
      { message: 'Error revalidating content.', error: message },
      { status: 500 }
    );
  }
}
