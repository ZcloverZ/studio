
'use client';

import Link from 'next/link';
import { ShoppingCart, ChevronDown, Sun, Moon } from 'lucide-react'; // Added Sun and Moon icons
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext'; // Added useTheme hook
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from 'react';

const genres = [
  { name: 'داستانی', slug: 'Fiction' },
  { name: 'غیرداستانی', slug: 'Non-Fiction' },
  { name: 'کلاسیک', slug: 'Classic' },
  { name: 'ویران‌شهری', slug: 'Dystopian' },
  { name: 'خودسازی', slug: 'Self-Help' },
  { name: 'فانتزی', slug: 'Fantasy' },
];

export default function Header() {
  const { getItemCount } = useCart();
  const { theme, toggleTheme } = useTheme(); // Destructure theme and toggleTheme
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const itemCount = hasMounted ? getItemCount() : 0;

  return (
    <header className="bg-card text-card-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
          Ketab Online
        </Link>
        <nav className="flex items-center space-x-1 rtl:space-x-reverse"> {/* Reduced space for theme toggle */}
          <Link href="/" passHref>
            <Button
              variant="ghost"
              className="text-card-foreground hover:text-primary hover:bg-primary/10 focus-visible:text-primary focus-visible:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary/70 transition-colors duration-150"
            >
              خانه
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-card-foreground hover:text-primary hover:bg-primary/10 focus-visible:text-primary focus-visible:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary/70 transition-colors duration-150"
              >
                ژانرها
                <ChevronDown className="me-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-card text-card-foreground">
              {genres.map((genre) => (
                <DropdownMenuItem key={genre.slug} asChild>
                  <Link href={`/genre/${genre.slug}`} className="hover:!bg-primary/20 focus:!bg-primary/20 w-full text-right">
                    {genre.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/cart" passHref>
            <Button
              variant="ghost"
              className="relative text-card-foreground hover:text-primary hover:bg-primary/10 focus-visible:text-primary focus-visible:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary/70 transition-colors duration-150"
              aria-label="سبد خرید"
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

          {/* Theme Toggle Button */}
          {hasMounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-card-foreground hover:text-primary hover:bg-primary/10 focus-visible:text-primary focus-visible:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary/70 transition-colors duration-150 h-9 w-9" // Adjusted size to match other buttons better
              aria-label={theme === 'light' ? "تغییر به تم تاریک" : "تغییر به تم روشن"}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">تغییر تم</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
