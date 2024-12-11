'use client';

import { useActionState } from 'react';

import { Button } from '@/components/ui/button';

import { removeItem } from '@/components/cart/actions';

import type { CartItem } from '@/types/shopify-types';

import { X } from 'lucide-react';

export function DeleteItemButton({
  item,
  optimisticUpdateAction
}: {
  item: CartItem;
  optimisticUpdateAction: (merchandiseId: string, updateType: 'delete') => void;
}) {
  const [message, formAction] = useActionState(removeItem, null);
  const merchandiseId = item.merchandise.id;
  const actionWithVariant = formAction.bind(null, merchandiseId);

  return (
    <form
      action={async () => {
        optimisticUpdateAction(merchandiseId, 'delete');
        await actionWithVariant();
      }}
    >
      <Button
        type="submit"
        aria-label="Remove cart item"
        className="flex size-6 p-2 items-center justify-center rounded-full bg-foreground hover:bg-foreground/90"
      >
        <X className="text-background"/>
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
