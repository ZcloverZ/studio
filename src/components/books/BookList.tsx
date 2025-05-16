import type { Book } from '@/lib/types';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
}

export default function BookList({ books }: BookListProps) {
  if (books.length === 0) {
    return <p className="text-center text-muted-foreground text-lg">هیچ کتابی یافت نشد.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
