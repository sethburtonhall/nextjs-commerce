'use client';

import { useActionState } from 'react';

import { removeItem } from '@/components/cart/actions';

import type { CartItem } from '@/types/shopify-types';

import { XMarkIcon } from '@heroicons/react/24/outline';

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
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
