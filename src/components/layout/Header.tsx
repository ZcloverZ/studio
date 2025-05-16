'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="bg-card text-card-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
          Ketab Online
        </Link>
        <nav className="flex items-center space-x-4 rtl:space-x-reverse">
          <Link href="/" passHref>
            <Button variant="ghost" className="text-card-foreground hover:bg-accent/20">خانه</Button>
          </Link>
          <Link href="/cart" passHref>
            <Button variant="ghost" className="relative text-card-foreground hover:bg-accent/20">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">سبد خرید</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
