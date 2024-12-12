'use client';

import { useActionState } from 'react';

import { useCart } from '@/hooks/useCart';

import { useProduct } from '@/providers/product-provider';

import { Button } from '@/components/ui/button';

import { addItem } from '@/components/cart/actions';

import type { Product, ProductVariant } from '@/types/shopify-types';

import { Plus } from 'lucide-react';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  if (!availableForSale) {
    return <Button disabled>Out Of Stock</Button>;
  }

  console.log(selectedVariantId);
  if (!selectedVariantId) {
    return (
      <Button aria-label="Please select an option" disabled className="relative w-full">
        <Plus className="h-5" />
        Add To Cart
      </Button>
    );
  }

  return (
    <Button className="relative w-full" aria-label="Add to cart">
      <Plus className="h-5" />
      Add To Cart
    </Button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        await actionWithVariant();
      }}
    >
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
