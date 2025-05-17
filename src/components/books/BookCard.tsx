
import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} passHref legacyBehavior>
      <a className="block h-full">
        <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out hover:border-primary/50">
          <CardHeader className="p-4">
            <div className="relative w-full aspect-[2/3]"> {/* Maintain aspect ratio */}
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                fill={true}
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={book.id === '1' || book.id === '2' || book.id === '3' || book.id === '4'} // Prioritize loading for first few books
                className="rounded-t-lg"
                data-ai-hint={book.dataAiHint || "book cover"}
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg font-semibold mb-1 line-clamp-2" title={book.title}>{book.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-1">{book.author}</CardDescription>
            <p className="text-primary font-bold text-lg">{book.price.toLocaleString('fa-IR', { style: 'currency', currency: 'IRR' }).replace('IRR', 'ریال')}</p>
          </CardContent>
          {/* CardFooter and AddToCartButton removed as per design decision to have it on detail page */}
        </Card>
      </a>
    </Link>
  );
}
