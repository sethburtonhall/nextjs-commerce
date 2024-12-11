import { cn } from '@/lib/utils';

import { LogoIcon } from '@/components/icons/logo';

export function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={cn(
        'flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black',
        {
          'h-[40px] w-[40px] rounded-xl': !size, // default
          'h-[30px] w-[30px] rounded-lg': size === 'sm'
        }
      )}
    >
      <LogoIcon
        size={size}
      />
    </div>
  );
}
