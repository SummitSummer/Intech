import { useCart } from "@/hooks/use-cart";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ShieldCheck, CreditCard, Banknote } from "lucide-react";

export default function Checkout() {
  const { total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const cartTotal = total();
  const finalTotal = Math.floor(cartTotal * 1.18);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for shopping with INTech. You will receive an email confirmation shortly.",
      });
      setLocation("/");
    }, 2000);
  };

  if (cartTotal === 0) {
    setLocation("/cart");
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Shipping Form */}
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-card border border-white/5 rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required className="bg-background border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required className="bg-background border-white/10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="bg-background border-white/10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required className="bg-background border-white/10" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required className="bg-background border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" required className="bg-background border-white/10" />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
                <RadioGroup defaultValue="card" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label 
                      htmlFor="card" 
                      className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-white/10 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-white/5 cursor-pointer transition-all"
                    >
                      <CreditCard className="w-6 h-6 mb-2 text-primary" />
                      <span className="font-semibold">Card Payment</span>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                    <Label 
                      htmlFor="cod" 
                      className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-white/10 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-white/5 cursor-pointer transition-all"
                    >
                      <Banknote className="w-6 h-6 mb-2 text-green-500" />
                      <span className="font-semibold">Cash on Delivery</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-card border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-white text-lg mb-4">Order Summary</h3>
              <div className="space-y-2 mb-6 text-sm">
                 <div className="flex justify-between text-muted-foreground">
                  <span>Items Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (18%)</span>
                  <span>₹{Math.floor(cartTotal * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="border-t border-white/10 pt-2 mt-2 flex justify-between font-bold text-white text-base">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form"
                disabled={isProcessing}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold"
              >
                {isProcessing ? "Processing..." : `Pay ₹${finalTotal.toLocaleString('en-IN')}`}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Secure Encrypted Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
