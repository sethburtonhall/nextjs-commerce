'use client';

import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useAtom, useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import { 
  productAtom, 
  updateOptionAtom, 
  updateImageAtom, 
  setProductStateAtom,
  type ProductState 
} from '@/stores/productStore';

function HydrateProduct({ initialState, children }: PropsWithChildren<{ initialState: ProductState }>) {
  useHydrateAtoms([[productAtom, { type: 'SET_STATE', payload: initialState }]]);
  return children;
}

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const initializedRef = useRef(false);
  const setProductState = useSetAtom(setProductStateAtom);

  const getInitialState = useCallback(() => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }, [searchParams]);

  if (!initializedRef.current) {
    initializedRef.current = true;
  }

  useEffect(() => {
    setProductState(getInitialState());
  }, [searchParams, setProductState, getInitialState]);

  return (
    <HydrateProduct initialState={getInitialState()}>{children}</HydrateProduct>
  );
}

export function useProduct() {
  const [state] = useAtom(productAtom);
  const updateOption = useSetAtom(updateOptionAtom);
  const updateImage = useSetAtom(updateImageAtom);

  return {
    state,
    updateOption: (name: string, value: string) => {
      updateOption({ name, value });
      return { ...state, [name]: value };
    },
    updateImage: (index: string) => {
      updateImage(index);
      return { ...state, image: index };
    }
  };
}

export function useUpdateURL() {
  const router = useRouter();

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}
