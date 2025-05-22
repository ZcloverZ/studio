'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import BookList from '@/components/books/BookList';
// SearchBar is now in Header
import RecommendationsSection from '@/components/books/RecommendationsSection';
// حذف import استاتیک داده‌ها
// import { books as allBooksData } from '@/lib/data';
import type { Book } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton'; // For Suspense fallback
import SearchBar from '@/components/books/SearchBar';
import { UserProvider } from '@/contexts/UserContext';

// Helper component to use useSearchParams
function SearchAwareHomePageContent() {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState<number | null>(null);
  const LIMIT = 12;

  // Update searchTerm if URL query changes
  useEffect(() => {
    setSearchTerm(queryFromUrl);
    setPage(1);
    setBooks([]);
    setHasMore(true);
    setTotal(null);
  }, [queryFromUrl]);

  // حذف فیلتر سمت کلاینت، چون از API می‌گیریم

  // گرفتن کتاب‌ها با صفحه‌بندی
  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = `/api/books?page=${page}&limit=${LIMIT}`;
    // اگر جستجو داریم، می‌توانیم بعداً به API اضافه کنیم
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('خطا در دریافت داده‌ها');
        return res.json();
      })
      .then((data) => {
        // مقداردهی پیش‌فرض فیلدهای مورد نیاز
        const mapped = data.books.map((item: any, idx: number) => ({
          id: item.ISBN || item.id || (page-1)*LIMIT + idx + '',
          title: item.title,
          author: item.author,
          isbn: item.ISBN || item.isbn || '',
          coverImage: item.coverImage || '/default-cover.png',
          price: item.price ? Number(item.price) : 100000,
          description: item.summary || item.description || '',
          genre: item.genre || '',
        }));
        setBooks(prev => page === 1 ? mapped : [...prev, ...mapped]);
        setTotal(data.total);
        setHasMore((page - 1) * LIMIT + mapped.length < data.total);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (loading && books.length === 0) {
    return <HomePageSkeleton />;
  }
  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }

  return (
    <div className="space-y-12">
      <section className="relative text-center py-16 rounded-3xl shadow-2xl bg-gradient-to-br from-[#022d2bcc] via-green-900/80 to-green-800/80 border-2 border-green-900/40 backdrop-blur-xl overflow-hidden flex flex-col items-center">
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-20 blur-lg pointer-events-none select-none">
          <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="110" cy="60" rx="100" ry="40" fill="#22c55e" />
          </svg>
        </span>
        <h1 className="text-5xl font-black mb-2 text-green-100 drop-shadow-xl tracking-tight">به سبز خوش آمدید!</h1>
        <p className="text-xl text-green-200 mb-8 font-semibold drop-shadow-xl">کتاب مورد علاقه بعدی خود را در دنیای سبز کشف کنید.</p>
        <div className="w-full max-w-2xl mb-8">
          <SearchBar onSearch={setSearchTerm} initialQuery={searchTerm} />
        </div>
        {/* We can display the current search term if any */}
        {queryFromUrl && (
          <p className="text-lg text-green-200 mb-4 font-bold drop-shadow-xl">
            نتایج جستجو برای: <span className="font-extrabold text-green-400">{queryFromUrl}</span>
          </p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-black mb-2 text-green-100 drop-shadow-xl tracking-tight border-b-2 border-green-400 pb-2">{searchTerm ? 'نتایج جستجو' : 'کتاب‌های ویژه'}</h2>
        <p className="text-lg text-green-200 mb-6 font-semibold drop-shadow-xl">برترین کتاب‌ها را در این بخش مشاهده کنید.</p>
        <BookList books={books} />
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPage(p => p + 1)}
              className="px-8 py-3 rounded-xl bg-green-700 text-white font-bold shadow hover:bg-green-800 transition-colors border border-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'در حال بارگذاری...' : 'نمایش بیشتر'}
            </button>
          </div>
        )}
        {total !== null && books.length >= total && (
          <div className="text-center text-green-400 mt-6 font-bold">همه کتاب‌ها نمایش داده شد.</div>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-black mb-2 text-green-100 drop-shadow-xl tracking-tight border-b-2 border-green-400 pb-2">پیشنهادهای شخصی‌سازی شده برای شما</h2>
        <p className="text-lg text-green-200 mb-6 font-semibold drop-shadow-xl">بر اساس علاقه‌مندی‌ها و سوابق شما</p>
        <RecommendationsSection />
      </section>
    </div>
  );
}

// Main HomePage component wrapped with Suspense
export default function HomePage() {
  return (
    <UserProvider>
      <Suspense fallback={<HomePageSkeleton />}>
        <SearchAwareHomePageContent />
      </Suspense>
    </UserProvider>
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
