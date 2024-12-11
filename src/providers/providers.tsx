'use client'

// State Management
import { Provider as JotaiProvider } from "jotai";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

// Theme
import { ThemeProvider } from "@/providers/theme-provider";

// Cart
import { CartProvider } from '@/providers/cart-provider';

import type { Cart } from '@/types/shopify-types';

export function Providers({ cart, children }: { cart: Cart | undefined; children: React.ReactNode }) {
    return (
        <JotaiProvider>
            <ThemeProvider>
                <CartProvider cart={cart}>{children}</CartProvider>
            </ThemeProvider>
            <DevTools />
        </JotaiProvider>
    );
}