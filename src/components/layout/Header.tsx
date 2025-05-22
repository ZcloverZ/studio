'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ChevronDown, Sun, Moon, Menu, Home as HomeIcon, BookOpen, Book, Star, Globe, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
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
import SearchBar from '@/components/books/SearchBar';
import { useState, useEffect, useRef } from 'react';
import GenreMegaMenu from '@/components/books/GenreMegaMenu';
import Image from 'next/image';
import LogoImage from '@/components/layout/logo.jpg';
import { useUser } from '@/contexts/UserContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const genres = [
  { name: 'داستانی', slug: 'Fiction' },
  { name: 'غیرداستانی', slug: 'Non-Fiction' },
  { name: 'کلاسیک', slug: 'Classic' },
  { name: 'ویران‌شهری', slug: 'Dystopian' },
  { name: 'خودسازی', slug: 'Self-Help' },
  { name: 'فانتزی', slug: 'Fantasy' },
];

const genreGroups = [
  {
    title: 'داستانی',
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    genres: [
      { name: 'فانتزی', slug: 'Fantasy' },
      { name: 'کلاسیک', slug: 'Classic' },
      { name: 'ویران‌شهری', slug: 'Dystopian' },
    ],
  },
  {
    title: 'غیرداستانی',
    icon: <Globe className="h-5 w-5 text-primary" />,
    genres: [
      { name: 'خودسازی', slug: 'Self-Help' },
      { name: 'علمی', slug: 'Science' },
    ],
  },
  {
    title: 'محبوب',
    icon: <Star className="h-5 w-5 text-yellow-400" />,
    genres: [
      { name: 'پرفروش', slug: 'Bestseller' },
      { name: 'جدید', slug: 'New' },
    ],
  },
];

export default function Header() {
  const { getItemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useUser();

  useEffect(() => {
    setHasMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      if (progressRef.current) progressRef.current.style.width = percent + '%';
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const itemCount = hasMounted ? getItemCount() : 0;

  const handleHeaderSearch = (query: string) => {
    router.push(`/?search=${encodeURIComponent(query)}`);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false); 
    }
  };

  const navButtonClassName = "text-foreground hover:text-primary hover:bg-primary/10 focus-visible:text-primary focus-visible:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary/70 transition-colors duration-150";
  const mobileNavLinkClassName = "flex items-center w-full p-3 text-lg hover:bg-muted rounded-md transition-colors";
  const mobileNavIconClassName = "ms-3 h-5 w-5";

  return (
    <header className={
      `sticky top-0 z-50 transition-all duration-300 border-b border-green-900/40` +
      ` bg-[#022d2bcc] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(2,45,43,0.25)]`
    }>
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 z-0 bg-black/60 dark:bg-black/70 pointer-events-none" />
      {/* Scroll progress bar */}
      <div ref={progressRef} className="fixed top-0 right-0 left-0 h-1.5 z-[60] bg-gradient-to-l from-green-400 via-green-600 to-[#022d2b] rounded-b-full shadow-green-400/30 shadow-lg transition-all duration-200" style={{width:0}} />
      <div className={`relative z-10 container mx-auto px-4 flex items-center justify-between transition-[padding] duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
        {/* Right: Hamburger menu for categories */}
        <div className="flex items-center gap-2 min-w-[120px] justify-start">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-green-900/30 h-12 w-12 shadow-green-400/20 shadow-lg">
                <Menu className="h-7 w-7" />
                <span className="sr-only">دسته‌بندی کتاب‌ها</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="fixed inset-y-0 right-0 z-50 w-[90vw] max-w-sm bg-background/95 backdrop-blur-md flex flex-col p-0 animate-in fade-in slide-in-from-right duration-300">
              <SheetHeader className="p-4 border-b shrink-0">
                <SheetTitle className="text-xl text-primary text-right">دسته‌بندی کتاب‌ها</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 p-4 overflow-y-auto flex-grow">
                <GenreMegaMenu />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* Center: Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex items-center gap-6 group focus:outline-none">
            <span className="inline-block transition-transform duration-200 group-hover:scale-110 group-focus:scale-110 drop-shadow-xl flex-shrink-0">
              <Image src={LogoImage} alt="لوگو" width={64} height={64} className="rounded-lg shadow-lg object-cover" priority />
            </span>
            <span className="text-4xl font-black text-white tracking-tight drop-shadow-xl transition-colors group-hover:text-green-200 group-focus:text-green-200 select-none font-sans">سبز</span>
          </Link>
        </div>
        {/* Left: Theme toggle, Cart and User */}
        <div className="flex items-center gap-3 min-w-[120px] justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-green-900/30 h-12 w-12 shadow-green-400/20 shadow-lg"
            aria-label={theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تیره'}
            title={theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تیره'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="h-7 w-7" /> : <Moon className="h-7 w-7" />}
          </Button>
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-green-900/30 h-12 w-12 shadow-green-400/20 shadow-lg" aria-label="سبد خرید">
              <ShoppingCart className="h-7 w-7" />
              {hasMounted && itemCount > 0 && (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs rounded-full h-7 w-7 flex items-center justify-center border-2 border-white shadow-lg">
                  {itemCount.toLocaleString('fa-IR')}
                </span>
              )}
              <span className="sr-only">سبد خرید</span>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-green-900/30 h-12 w-12 shadow-green-400/20 shadow-lg" aria-label="حساب کاربری">
                {user ? (
                  <Avatar>
                    <AvatarFallback>{user.username?.[0] || user.email?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                ) : (
                  <User className="h-7 w-7" />
                )}
                <span className="sr-only">حساب کاربری</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuItem disabled>
                    {user.username || user.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    خروج
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/account">
                      ورود / ثبت نام مشتریان
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/staff/login">
                      ورود کارکنان
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
