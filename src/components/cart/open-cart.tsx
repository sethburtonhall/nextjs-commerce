import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

import { ShoppingCart } from 'lucide-react';

export function OpenCart({ className, quantity }: { className?: string; quantity?: number }) {
  return (
    <>
      <ShoppingCart className={cn('h-4 transition-all ease-in-out hover:scale-110', className)} />

      {quantity ? (
        <Badge className="absolute flex items-center justify-center right-0 top-0 -mr-2 -mt-2 size-4 p-0 rounded-full bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </Badge>
      ) : null}
    </>
  );
}
