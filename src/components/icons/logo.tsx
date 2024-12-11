import { cn } from '@/lib/utils';

interface LogoIconProps extends React.ComponentProps<'svg'> {
  size?: 'sm' | 'lg' | 'xl' | 'og';
}

export function LogoIcon({ size = 'lg', ...props }: LogoIconProps) {
  const sizeClasses = {
    sm: 'size-4', // 16px
    lg: 'size-6', // 24px
    xl: 'size-8', // 32px
    og: 'w-[64px] h-[58px]' // OpenGraph specific size
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Matic Digital logo"
      viewBox="0 0 24 24"
      {...props}
      className={cn('fill-black dark:fill-white', sizeClasses[size], props.className)}
    >
      {/* Left Bar */}
      <path d="M4 4h4v16H4z" />
      {/* Middle Bar */}
      <path d="M10 4h4v16h-4z" />
      {/* Right Bar */}
      <path d="M16 4h4v16h-4z" />
    </svg>
  );
}
