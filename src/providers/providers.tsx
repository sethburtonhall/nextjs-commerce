'use client'

import { useState, useEffect } from 'react';

import { Provider as JotaiProvider } from "jotai";
import { DevTools } from 'jotai-devtools';
import { ThemeProvider } from 'next-themes'
import 'jotai-devtools/styles.css';

import { CartProvider } from '@/providers/cart-provider';

import type { Cart } from '@/types/shopify-types';

export function Providers({ cart, children }: { cart: Cart | undefined; children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <JotaiProvider>
            <ThemeProvider attribute="class">
                <CartProvider cart={cart}>
                    {mounted ? children : null}
                </CartProvider>
            </ThemeProvider>
            {mounted && <DevTools />}
        </JotaiProvider>
    );
}