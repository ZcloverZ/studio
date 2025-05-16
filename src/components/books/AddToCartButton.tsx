'use client';

import { useCart } from '@/contexts/CartContext';
import type { Book } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  book: Book;
}

export default function AddToCartButton({ book }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button onClick={() => addToCart(book)} className="w-full">
      <ShoppingCart className="ms-2 h-4 w-4" />
      افزودن به سبد
    </Button>
  );
}
