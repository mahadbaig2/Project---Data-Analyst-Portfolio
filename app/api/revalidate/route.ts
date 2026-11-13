import { revalidateTag, revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { revalidateSecret } from '@/sanity/env';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-sanity-revalidate-secret');
  if (!revalidateSecret || secret !== revalidateSecret) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (body?._type !== 'article') return NextResponse.json({ message: 'Only blog articles can be revalidated' }, { status: 400 });
  revalidateTag('article', 'max');
  revalidatePath('/blog');
  if (body?.slug?.current) revalidatePath(`/blog/${body.slug.current}`);
  return NextResponse.json({ revalidated: true });
}
