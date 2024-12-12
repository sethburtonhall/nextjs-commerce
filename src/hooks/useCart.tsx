'use client';

import { useAtomValue, useSetAtom } from 'jotai';

import { addCartItemAtom, cartAtom, updateCartItemAtom } from '@/stores/cartStore';

import type { Product, ProductVariant } from '@/types/shopify-types';

type UpdateType = 'plus' | 'minus' | 'delete';

export function useCart() {
  const cart = useAtomValue(cartAtom);
  const updateCartItem = useSetAtom(updateCartItemAtom);
  const addCartItem = useSetAtom(addCartItemAtom);

  return {
    cart,
    updateCartItem: (merchandiseId: string, updateType: UpdateType) =>
      updateCartItem({ merchandiseId, updateType }),
    addCartItem: (variant: ProductVariant, product: Product) => addCartItem({ variant, product })
  };
}
