'use client';

import { Fragment } from 'react';

import { useSearchParams } from 'next/navigation';

// Ensure children are re-rendered when the search query changes
export function ChildrenWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  return <Fragment key={searchParams.get('q')}>{children}</Fragment>;
}
