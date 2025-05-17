
'use client'; // Add this to ensure useEffect and useState can be used

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { books } from '@/lib/data';
import type { Book } from '@/lib/types';
import AddToCartButton from '@/components/books/AddToCartButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BookOpen, FileText, Tag, Info, AlertTriangle, Sparkles } from 'lucide-react';
import { generateBookInsights } from '@/ai/flows/book-insights-flow';
import type { BookInsightsOutput } from '@/ai/flows/book-insights-flow';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from '@/components/ui/skeleton';

export async function generateStaticParams() {
  return books.map((book) => ({
    id: book.id,
  }));
}

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const book: Book | undefined = books.find(b => b.id === params.id);
  const [insights, setInsights] = useState<BookInsightsOutput | null>(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  useEffect(() => {
    if (book) {
      async function fetchInsights() {
        setInsightsLoading(true);
        setInsightsError(null);
        try {
          const result = await generateBookInsights({
            title: book.title,
            author: book.author,
            description: book.description,
          });
          setInsights(result);
        } catch (error) {
          console.error("Error fetching book insights:", error);
          setInsightsError("متاسفانه در دریافت تحلیل هوشمند کتاب خطایی رخ داد.");
        } finally {
          setInsightsLoading(false);
        }
      }
      fetchInsights();
    }
  }, [book]);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-20rem)]">
        <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-destructive">کتاب مورد نظر یافت نشد!</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          متاسفانه کتابی با این مشخصات در فروشگاه ما موجود نیست. ممکن است آدرس را اشتباه وارد کرده باشید یا کتاب از فهرست ما حذف شده باشد.
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
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Card className="overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-96 md:h-auto min-h-[300px] bg-muted/30 flex items-center justify-center p-4 md:p-8">
            <Image
              src={book.coverImage}
              alt={`جلد کتاب ${book.title}`}
              width={300}
              height={450}
              style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%'}}
              className="rounded-md shadow-lg"
              data-ai-hint={book.dataAiHint || "book cover"}
              priority
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <CardHeader className="px-0 pt-0 pb-4">
                <CardTitle className="text-3xl font-bold text-primary mb-2">{book.title}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  نوشته: {book.author}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-0 space-y-4">
                <div className="flex items-center text-md">
                  <Tag className="ms-2 h-5 w-5 text-secondary" />
                  <span className="font-semibold me-2">ژانر:</span>
                  <span>{book.genre}</span>
                </div>
                <div className="flex items-center text-md">
                  <Info className="ms-2 h-5 w-5 text-secondary" />
                  <span className="font-semibold me-2">شابک:</span>
                  <span>{book.isbn}</span>
                </div>
                
                <Separator className="my-4" />

                <div className="space-y-2">
                    <h3 className="text-xl font-semibold flex items-center text-primary">
                        <FileText className="ms-2 h-5 w-5" />
                        توضیحات کتاب
                    </h3>
                    <p className="text-foreground/80 leading-relaxed text-justify">{book.description}</p>
                </div>
                
                <Separator className="my-4" />

                <p className="text-3xl font-extrabold text-primary py-2">
                  {book.price.toLocaleString('fa-IR', { style: 'currency', currency: 'IRR' }).replace('IRR', 'ریال')}
                </p>
              </CardContent>
            </div>
            
            <div className="mt-6">
              <AddToCartButton book={book} />
              <Link href="/cart" passHref>
                <Button variant="outline" className="w-full mt-3">
                  مشاهده سبد خرید
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Insights Section */}
      <Card className="mt-10 shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-semibold text-primary">
            <Sparkles className="ms-2 h-6 w-6" />
            تحلیل هوشمند کتاب
          </CardTitle>
        </CardHeader>
        <CardContent>
          {insightsLoading && (
            <div className="space-y-4 py-4">
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Separator className="my-4" />
              <Skeleton className="h-6 w-1/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          )}
          {insightsError && <p className="text-destructive text-center py-4">{insightsError}</p>}
          {insights && !insightsLoading && !insightsError && (
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl hover:no-underline">خلاصه کتاب</AccordionTrigger>
                <AccordionContent className="pt-2 text-base leading-relaxed text-foreground/80 text-justify">
                  {insights.summary}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl hover:no-underline">موضوعات کلیدی</AccordionTrigger>
                <AccordionContent className="pt-2">
                  <ul className="list-disc list-inside space-y-1 text-base text-foreground/80">
                    {insights.keyThemes.map((theme, index) => (
                      <li key={index}>{theme}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl hover:no-underline">مخاطب هدف</AccordionTrigger>
                <AccordionContent className="pt-2 text-base leading-relaxed text-foreground/80 text-justify">
                  {insights.targetAudience}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </CardContent>
      </Card>

      <div className="mt-12 text-center">
        <Link href="/" passHref>
          <Button variant="link" className="text-lg">
            <ArrowRight className="ms-2 h-5 w-5" />
            بازگشت به لیست کتاب‌ها
          </Button>
        </Link>
      </div>
    </div>
  );
}
