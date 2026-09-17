import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { previewSecret } from '@/sanity/env';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug') || '/';

  // Secure preview secret verification
  if (previewSecret && secret !== previewSecret) {
    return new Response('Invalid preview secret', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  // Redirect to requested slug or root
  redirect(slug);
}
