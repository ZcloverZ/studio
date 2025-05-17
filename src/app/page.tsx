
'use client';

import { useState, useEffect, useMemo } from 'react';
import BookList from '@/components/books/BookList';
import SearchBar from '@/components/books/SearchBar';
import RecommendationsSection from '@/components/books/RecommendationsSection';
import { books as allBooksData } from '@/lib/data';
import type { Book } from '@/lib/types';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>(allBooksData);

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
        <SearchBar onSearch={setSearchTerm} />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">کتاب‌های ویژه</h2>
        <BookList books={books} />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">پیشنهادهای شخصی‌سازی شده برای شما</h2>
        <RecommendationsSection />
      </section>
    </div>
  );
}
