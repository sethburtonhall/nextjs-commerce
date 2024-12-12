'use client';
import { useEffect } from 'react';

import { useTheme } from 'next-themes';

import { Prose } from '@/components/prose';

import { type Page } from '@/types/shopify-types';

export function LandingTemplate({ page }: { page: Page }) {
  const { setTheme } = useTheme();

  // Force light theme when component mounts
  useEffect(() => {
    setTheme('light');
    // Optionally reset theme on unmount
    return () => setTheme('system');
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="mb-6 text-6xl font-bold">{page.title}</h1>
            <p className="text-xl text-muted-foreground">{page.bodySummary}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 py-16">
        <Prose html={page.body} />
      </div>
    </div>
  );
}
