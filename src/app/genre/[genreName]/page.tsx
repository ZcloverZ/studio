
import { books as allBooksData } from '@/lib/data';
import type { Book } from '@/lib/types';
import BookList from '@/components/books/BookList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, ArrowRight } from 'lucide-react';

// Define genre mapping for titles (Persian display)
const genreDisplayNames: { [key: string]: string } = {
  'Fiction': 'داستانی',
  'Non-Fiction': 'غیرداستانی',
  'Classic': 'کلاسیک',
  'Dystopian': 'ویران‌شهری',
  'Self-Help': 'خودسازی',
  'Fantasy': 'فانتزی',
};

export async function generateStaticParams() {
  const uniqueGenres = Array.from(new Set(allBooksData.map(book => book.genre)));
  return uniqueGenres.map((genre) => ({
    genreName: genre,
  }));
}

export default function GenrePage({ params }: { params: { genreName: string } }) {
  const decodedGenreName = decodeURIComponent(params.genreName);
  const booksInGenre: Book[] = allBooksData.filter(
    book => book.genre.toLowerCase() === decodedGenreName.toLowerCase()
  );

  const displayGenre = genreDisplayNames[decodedGenreName] || decodedGenreName;

  if (booksInGenre.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-20rem)]">
        <AlertTriangle className="w-16 h-16 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4">کتابی در ژانر "{displayGenre}" یافت نشد</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          متاسفانه در حال حاضر کتابی با این ژانر در فروشگاه موجود نیست. می‌توانید به صفحه اصلی بازگردید و سایر کتاب‌ها را مشاهده کنید.
        </p>
        <Link href="/" passHref>
          <Button size="lg">
             <ArrowRight className="ms-2 h-4 w-4" />
            بازگشت به صفحه اصلی
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="text-center py-6 bg-card rounded-xl shadow-md">
        <h1 className="text-4xl font-bold text-primary">کتاب‌های ژانر: {displayGenre}</h1>
      </section>
      <BookList books={booksInGenre} />
      <div className="mt-12 text-center">
        <Link href="/" passHref>
          <Button variant="link" className="text-lg">
             <ArrowRight className="ms-2 h-5 w-5" />
            بازگشت به لیست همه‌ی کتاب‌ها
          </Button>
        </Link>
      </div>
    </div>
  );
}
