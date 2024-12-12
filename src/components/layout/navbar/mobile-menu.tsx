'use client';

import { Suspense, useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';

import Search, { SearchSkeleton } from '@/components/layout/navbar/search';

import type { Menu } from '@/types/shopify-types';

import { Menu as MenuIcon } from 'lucide-react';

export function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <Button onClick={openMobileMenu} aria-label="Open mobile menu" variant="outline" size="icon">
        <MenuIcon className="h-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-full">
          <div className="pt-14">
            <div className="mb-4 w-full">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
            {menu.length ? (
              <ul className="flex w-full flex-col">
                {menu.map((item: Menu) => (
                  <li
                    className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
                    key={item.title}
                  >
                    <Link href={item.path} prefetch={true} onClick={closeMobileMenu}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
