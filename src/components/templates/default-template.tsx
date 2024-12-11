import { Prose } from '@/components/prose';

import { type Page } from '@/types/shopify-types';


export function DefaultTemplate({ page }: { page: Page }) {
  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-bold">{page.title}</h1>
      <Prose html={page.body} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(page.updatedAt))}.`}
      </p>
    </div>
  );
}
