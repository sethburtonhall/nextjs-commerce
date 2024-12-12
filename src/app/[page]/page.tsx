import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPage } from '@/lib/shopify';

import { type Page } from '@/types/shopify-types';

import { DefaultTemplate, LandingTemplate } from '@/templates';

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

// Get page template from metafields
function getPageTemplate(page: Page): string {
  return page.metafield?.value || 'default';
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;
  const page = await getPage(params.page);
  const template = getPageTemplate(page);

  if (!page) return notFound();

  switch (template) {
    case 'landing':
      return <LandingTemplate page={page} />;
    default:
      return <DefaultTemplate page={page} />;
  }
}
