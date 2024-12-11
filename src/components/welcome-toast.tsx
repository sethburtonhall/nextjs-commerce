'use client';

import { useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🛍️ Welcome to Matic Commerce!', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <div className="stack">
          <p>
            This is a high-performance, SSR storefront powered by Shopify, Next.js, and Vercel.
          </p>
          <Button size="sm" asChild>
            <a
              href="https://github.com/Matic-Digital/matic-commerce"
              className="hover:underline"
              target="_blank"
            >
              Check it out on Github
            </a>
          </Button>
          </div>
        )
      });
    }
  }, []);

  return null;
}
