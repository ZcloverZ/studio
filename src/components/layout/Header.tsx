
'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function Header() {
  const { getItemCount } = useCart();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Get itemCount after hasMounted is true to ensure client-side value
  const itemCount = hasMounted ? getItemCount() : 0;

  return (
    <header className="bg-card text-card-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
          Ketab Online
        </Link>
        <nav className="flex items-center space-x-4 rtl:space-x-reverse">
          <Link href="/" passHref>
            <Button 
              variant="ghost" 
              className="text-card-foreground hover:text-primary hover:bg-primary/10 focus-visible:text-primary focus-visible:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary/70 transition-colors duration-150"
            >
              خانه
            </Button>
          </Link>
          <Link href="/cart" passHref>
            <Button 
              variant="ghost" 
              className="relative text-card-foreground hover:text-primary hover:bg-primary/10 focus-visible:text-primary focus-visible:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary/70 transition-colors duration-150"
            >
              <ShoppingCart className="h-5 w-5" />
              {hasMounted && itemCount > 0 && (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount.toLocaleString('fa-IR')}
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

