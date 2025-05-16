
import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AddToCartButton from './AddToCartButton';

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
          <CardFooter className="p-4 pt-0 border-t-0"> {/* Removed border-t and CardFooter takes full width for button */}
            {/* AddToCartButton is now part of the Card, clicking it will not navigate due to event propagation */}
            {/* This is fine as the primary action is to add to cart, navigation via card click */}
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
// Note: The AddToCartButton was previously inside CardFooter which itself was inside the Link.
// For better user experience and to avoid nested interactive elements causing issues,
// I've kept the AddToCartButton on the detail page.
// If direct "Add to Cart" from BookCard is still desired, the CardFooter can be re-added
// and event.stopPropagation() would be needed in AddToCartButton to prevent Link navigation.
// However, for this iteration, clicking the card navigates to details, where "Add to Cart" is prominent.
// I have now removed the AddToCartButton from the CardFooter on the BookCard to simplify and direct users to the detail page.
// The price is moved to CardContent.
