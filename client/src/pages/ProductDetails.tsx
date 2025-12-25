import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Shield, Truck, RotateCcw, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const id = parseInt(params?.id || "0");
  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const { toast } = useToast();
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) return <div className="min-h-screen pt-24 flex justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"/></div>;
  if (!product) return <div className="min-h-screen pt-24 text-center">Product not found</div>;

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const images = [
    product.imageUrl,
    "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=500&q=80"
  ];

  const specs = product.specifications as Record<string, string>;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-card border border-white/5 relative group">
              <img 
                src={images[activeImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${activeImage === idx ? 'border-primary' : 'border-transparent hover:border-white/20'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                {product.brand}
              </span>
              <span className="text-muted-foreground text-sm flex items-center">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                4.8 (124 reviews)
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {product.name}
            </h1>

            <div className="text-3xl font-bold text-primary mb-6">
              ₹{product.price.toLocaleString('en-IN')}
              <span className="text-lg text-muted-foreground font-normal line-through ml-3">
                ₹{Math.floor(product.price * 1.2).toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex gap-4 mb-8">
              <Button size="lg" className="flex-1 h-14 text-base bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 w-5 h-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/5">
                Buy Now
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-white/5">
                <Truck className="w-6 h-6 text-primary" />
                <div>
                  <h4 className="font-bold text-white text-sm">Free Delivery</h4>
                  <p className="text-xs text-muted-foreground">Within 2-4 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-white/5">
                <Shield className="w-6 h-6 text-primary" />
                <div>
                  <h4 className="font-bold text-white text-sm">1 Year Warranty</h4>
                  <p className="text-xs text-muted-foreground">Official support</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-xl font-display font-bold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
