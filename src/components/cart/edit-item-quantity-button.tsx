'use client';

import { useActionState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import { updateItemQuantity } from '@/components/cart/actions';

import type { CartItem } from '@/types/shopify-types';

import { Minus, Plus } from 'lucide-react';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  return (
    <Button
      type="submit"
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      variant="ghost"
      className={cn(
        {
          'rounded-tr-full rounded-br-full': type === 'plus',
          'rounded-tl-full rounded-bl-full': type === 'minus'
        },
      )}
    >
      {type === 'plus' ? (
        <Plus className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <Minus className="h-4 w-4 dark:text-neutral-500" />
      )}
    </Button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdateAction
}: {
  item: CartItem;
  type: 'plus' | 'minus';
  optimisticUpdateAction: (merchandiseId: string, updateType: 'plus' | 'minus') => void;
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form
      action={async () => {
        optimisticUpdateAction(payload.merchandiseId, type);
        await actionWithVariant();
      }}
    >
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
