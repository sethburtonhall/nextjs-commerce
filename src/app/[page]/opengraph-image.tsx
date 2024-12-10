import { getPage } from '@/lib/shopify';

import OpengraphImage from '@/components/opengraph-image';

// This disables static generation warning since it's expected for OpenGraph images
export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
