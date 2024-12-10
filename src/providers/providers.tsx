'use client'

import { Provider as JotaiProvider } from "jotai";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

import { CartProvider } from '@/providers/cart-provider';

import type { Cart } from '@/types/shopify-types';

export function Providers({ cart, children }: { cart: Cart | undefined; children: React.ReactNode }) {
    return (
        <JotaiProvider>
            <CartProvider cart={cart}>{children}</CartProvider>
            <DevTools />
        </JotaiProvider>
    );
}