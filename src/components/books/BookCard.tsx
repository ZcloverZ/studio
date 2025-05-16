import Image from 'next/image';
import type { Book } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AddToCartButton from './AddToCartButton';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="p-4">
        <div className="relative w-full h-60">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            layout="fill"
            objectFit="contain"
            data-ai-hint={book.dataAiHint || "book cover"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 line-clamp-2" title={book.title}>{book.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2">{book.author}</CardDescription>
        <p className="text-primary font-bold text-lg">{book.price.toLocaleString('fa-IR', { style: 'currency', currency: 'IRR' }).replace('IRR', 'ریال')}</p>
      </CardContent>
      <CardFooter className="p-4 border-t border-border">
        <AddToCartButton book={book} />
      </CardFooter>
    </Card>
  );
}
