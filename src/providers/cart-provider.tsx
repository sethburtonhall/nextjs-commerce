'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';

import { useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import { cartAtom, setCartAtom } from '@/stores/cartStore';

import type { Cart } from '@/types/shopify-types';

function HydrateAtoms({
  initialValues,
  children
}: PropsWithChildren<{ initialValues: Cart | undefined }>) {
  useHydrateAtoms([[cartAtom, { type: 'SET_CART', payload: initialValues }]]);
  return children;
}

export function CartProvider({
  children,
  cart
}: PropsWithChildren<{
  cart: Cart | undefined;
}>) {
  const initializedRef = useRef(false);
  const setCart = useSetAtom(setCartAtom);

  if (!initializedRef.current) {
    initializedRef.current = true;
  }

  useEffect(() => {
    setCart(cart);
  }, [cart, setCart]);

  return <HydrateAtoms initialValues={cart}>{children}</HydrateAtoms>;
}
