'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation'; // For redirecting

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart, getItemCount } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
  });

  const total = getCartTotal();
  const itemCount = getItemCount();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock order submission
    console.log('Order submitted:', { formData, cartItems, total });
    
    clearCart();
    toast({
      title: "سفارش شما ثبت شد!",
      description: "از خرید شما متشکریم. سفارش شما با موفقیت پردازش شد.",
      variant: "default", // 'default' will use accent color based on theme
    });
    router.push('/'); // Redirect to homepage
  };

  if (itemCount === 0 && !router) { // Check router to avoid issues during initial render before redirect
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">سبد خرید شما برای تسویه حساب خالی است.</h1>
        <Link href="/" passHref>
          <Button size="lg">بازگشت به فروشگاه</Button>
        </Link>
      </div>
    );
  }


  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">تسویه حساب</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>اطلاعات ارسال</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <Label htmlFor="name">نام و نام خانوادگی</Label>
                <Input id="name" type="text" value={formData.name} onChange={handleInputChange} required className="bg-white"/>
              </div>
              <div>
                <Label htmlFor="email">ایمیل</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required className="bg-white"/>
              </div>
              <div>
                <Label htmlFor="address">آدرس</Label>
                <Input id="address" type="text" value={formData.address} onChange={handleInputChange} required className="bg-white"/>
              </div>
              <Button type="submit" size="lg" className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={itemCount === 0}>
                ثبت سفارش
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>خلاصه سفارش</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2">
                <div>
                  <p className="font-medium text-foreground">{item.title} (x{item.quantity.toLocaleString('fa-IR')})</p>
                  <p className="text-xs text-muted-foreground">{item.author}</p>
                </div>
                <p className="text-foreground">
                  {(item.price * item.quantity).toLocaleString('fa-IR', { style: 'currency', currency: 'IRR' }).replace('IRR', 'ریال')}
                </p>
              </div>
            ))}
             {itemCount === 0 && <p className="text-muted-foreground">سبد خرید شما خالی است.</p>}
          </CardContent>
          <CardFooter className="pt-4 border-t">
            <div className="flex justify-between w-full text-xl font-bold text-primary">
              <span>جمع کل:</span>
              <span>{total.toLocaleString('fa-IR', { style: 'currency', currency: 'IRR' }).replace('IRR', 'ریال')}</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
