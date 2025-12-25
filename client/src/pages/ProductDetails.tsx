import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Star,
  Shield,
  Truck,
  RotateCcw,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const id = parseInt(params?.id || "0");

  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const { toast } = useToast();
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });

    setLocation("/cart");
  };

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb
