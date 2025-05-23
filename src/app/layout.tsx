import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/contexts/ThemeContext'; // Added ThemeProvider
import { UserProvider } from '@/contexts/UserContext';
import { Analytics } from '@vercel/analytics/react';

const vazirmatn = Vazirmatn({
  subsets: ['latin', 'arabic'],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'سبز',
  description: 'Your online bookstore for discovering and purchasing books.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className={`font-sans antialiased`}>
        <UserProvider>
          <ThemeProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen bg-background">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </ThemeProvider>
        </UserProvider>
        <Analytics />
      </body>
    </html>
  );
}
