'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import CartItemCard from '@/components/cart/CartItemCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cartItems, getCartTotal, clearCart, getItemCount } = useCart();
  const total = getCartTotal();
  const itemCount = getItemCount();

  if (itemCount === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">سبد خرید شما خالی است</h1>
        <p className="text-muted-foreground mb-6">به نظر می رسد هنوز کتابی به سبد خرید خود اضافه نکرده اید.</p>
        <Link href="/" passHref>
          <Button size="lg">بازگشت به فروشگاه</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">سبد خرید شما</h1>
      <div className="space-y-6">
        {cartItems.map(item => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>

      <Separator className="my-8" />

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">خلاصه سفارش</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-lg">
            <span>تعداد کل آیتم‌ها:</span>
            <span className="font-semibold">{itemCount.toLocaleString('fa-IR')}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-primary">
            <span>جمع کل:</span>
            <span>{total.toLocaleString('fa-IR', { style: 'currency', currency: 'IRR' }).replace('IRR', 'ریال')}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <Button variant="outline" onClick={clearCart} className="w-full sm:w-auto">
            پاک کردن سبد خرید
          </Button>
          <Link href="/checkout" passHref>
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              ادامه جهت تسویه حساب
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
