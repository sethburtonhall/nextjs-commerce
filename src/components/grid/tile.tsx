import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Label } from '@/components/label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  alt,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  alt: string;
} & Omit<React.ComponentProps<typeof Image>, 'alt'>) {
  return (
    <div
      className={cn(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          'relative': label,
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {props.src ? (
        <Image
          className={cn('relative h-full w-full object-cover', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          alt={alt}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}