
'use client';

import Link from 'next/link';
import { ShoppingCart, ChevronDown, Sun, Moon, Menu, Home as HomeIcon, BookOpen } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  const { theme, toggleTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const itemCount = hasMounted ? getItemCount() : 0;

  const navButtonClassName = "text-foreground hover:text-primary hover:bg-primary/10 focus-visible:text-primary focus-visible:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary/70 transition-colors duration-150";
  const mobileNavLinkClassName = "flex items-center w-full p-3 text-lg hover:bg-muted rounded-md transition-colors";
  const mobileNavIconClassName = "ms-3 h-5 w-5";


  return (
    <header className="bg-background text-foreground shadow-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
          Ketab Online
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
          <Link href="/" passHref>
            <Button variant="ghost" className={navButtonClassName}>
              خانه
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={navButtonClassName}>
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
            <Button variant="ghost" className={`relative ${navButtonClassName}`} aria-label="سبد خرید">
              <ShoppingCart className="h-5 w-5" />
              {hasMounted && itemCount > 0 && (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount.toLocaleString('fa-IR')}
                </span>
              )}
              <span className="sr-only">سبد خرید</span>
            </Button>
          </Link>

          {hasMounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`${navButtonClassName} h-9 w-9`}
              aria-label={theme === 'light' ? "تغییر به تم تاریک" : "تغییر به تم روشن"}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span className="sr-only">تغییر تم</span>
            </Button>
          )}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={navButtonClassName}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">باز کردن منو</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-background p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="text-xl text-primary text-right">منو</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 p-4">
                <SheetClose asChild>
                  <Link href="/" className={mobileNavLinkClassName}>
                    <HomeIcon className={mobileNavIconClassName} />
                    <span>خانه</span>
                  </Link>
                </SheetClose>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="genres" className="border-b-0">
                    <AccordionTrigger className={`${mobileNavLinkClassName} hover:no-underline justify-between`}>
                       <div className="flex items-center">
                        <BookOpen className={mobileNavIconClassName} />
                        <span>ژانرها</span>
                       </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-1 pe-3">
                      {genres.map((genre) => (
                        <SheetClose asChild key={genre.slug}>
                          <Link href={`/genre/${genre.slug}`} className={`${mobileNavLinkClassName} text-base py-2 ps-8`}>
                            {genre.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <SheetClose asChild>
                  <Link href="/cart" className={`${mobileNavLinkClassName} relative`}>
                    <ShoppingCart className={mobileNavIconClassName} />
                    <span>سبد خرید</span>
                    {hasMounted && itemCount > 0 && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount.toLocaleString('fa-IR')}
                      </span>
                    )}
                  </Link>
                </SheetClose>
                
                <div className="pt-4">
                    <Button
                        variant="outline"
                        onClick={() => {
                            toggleTheme();
                            // setIsMobileMenuOpen(false); // Optional: close menu on theme change
                        }}
                        className="w-full justify-start p-3 text-lg"
                    >
                        {theme === 'light' ? 
                            <Moon className={`${mobileNavIconClassName} text-foreground`} /> : 
                            <Sun className={`${mobileNavIconClassName} text-foreground`} />
                        }
                        <span className="text-foreground">
                            {theme === 'light' ? 'تغییر به تم تاریک' : 'تغییر به تم روشن'}
                        </span>
                    </Button>
                </div>

              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
