
'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import BookList from '@/components/books/BookList';
// SearchBar is now in Header
import RecommendationsSection from '@/components/books/RecommendationsSection';
import { books as allBooksData } from '@/lib/data';
import type { Book } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton'; // For Suspense fallback

// Helper component to use useSearchParams
function SearchAwareHomePageContent() {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);
  const [books, setBooks] = useState<Book[]>(allBooksData);

  // Update searchTerm if URL query changes
  useEffect(() => {
    setSearchTerm(queryFromUrl);
  }, [queryFromUrl]);

  const filteredBooks = useMemo(() => {
    if (!searchTerm) {
      return allBooksData;
    }
    return allBooksData.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
    );
  }, [searchTerm]);

  useEffect(() => {
    setBooks(filteredBooks);
  }, [filteredBooks]);

  return (
    <div className="space-y-12">
      <section className="text-center py-8 bg-card rounded-xl shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-primary">به کتاب آنلاین خوش آمدید!</h1>
        <p className="text-lg text-card-foreground mb-8">کتاب مورد علاقه بعدی خود را کشف کنید.</p>
        {/* SearchBar removed from here, it's now in Header */}
        {/* We can display the current search term if any */}
        {queryFromUrl && (
          <p className="text-md text-muted-foreground mb-4">
            نتایج جستجو برای: <span className="font-semibold text-primary">{queryFromUrl}</span>
          </p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
          {searchTerm ? 'نتایج جستجو' : 'کتاب‌های ویژه'}
        </h2>
        <BookList books={books} />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">پیشنهادهای شخصی‌سازی شده برای شما</h2>
        <RecommendationsSection />
      </section>
    </div>
  );
}

// Main HomePage component wrapped with Suspense
export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <SearchAwareHomePageContent />
    </Suspense>
  );
}

// Skeleton for HomePage content
const HomePageSkeleton = () => (
  <div className="space-y-12">
    <section className="text-center py-8 bg-card rounded-xl shadow-md">
      <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
      <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
    </section>
    <section>
      <Skeleton className="h-8 w-1/3 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 p-4 border rounded-lg shadow-md bg-card">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </section>
    <section>
      <Skeleton className="h-8 w-1/2 mb-6" />
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 p-4 border rounded-lg shadow-md bg-card">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </section>
  </div>
);
