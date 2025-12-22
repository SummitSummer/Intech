import { useProducts, useSeedProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Truck, ShieldCheck, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: products, isLoading } = useProducts({ sort: 'popular' });
  const { mutate: seed, isPending: isSeeding } = useSeedProducts();

  const categories = [
    { name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80" },
    { name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80" },
    { name: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1572569028738-411a29639581?auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Hero background: futuristic tech abstract */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80"
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/50 bg-primary/10 text-primary font-medium text-sm mb-6 backdrop-blur-sm">
              New Arrival: Horizon Series
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
              Future Tech <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                In Your Hands
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              Experience the cutting edge of technology. Best prices on smartphones, laptops, and premium audio gear in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalog">
                <Button size="lg" className="text-base px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8 py-6 rounded-full border-white/20 text-white hover:bg-white/10"
                onClick={() => seed()}
                disabled={isSeeding}
              >
                {isSeeding ? "Initializing..." : "Reset Demo Data"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On all orders over ₹5000" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure transactions" },
              { icon: Clock, title: "Fast Delivery", desc: "2-3 business days across India" },
              { icon: Zap, title: "Official Warranty", desc: "Original manufacturer warranty" },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find exactly what you're looking for</p>
            </div>
            <Link href="/catalog">
              <span className="text-primary hover:text-blue-400 flex items-center gap-1 cursor-pointer transition-colors">
                View All <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/catalog?category=${cat.name}`}>
                <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-1">{cat.name}</h3>
                    <span className="text-sm text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Trending Now</h2>
            <p className="text-muted-foreground">Top selling products selected for you</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[400px] bg-card rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/catalog">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <span className="font-display text-2xl font-bold text-white block mb-6">NEXUS</span>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your premier destination for high-end electronics and gadgets. Bringing the future of technology to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer">Smartphones</li>
                <li className="hover:text-primary cursor-pointer">Laptops</li>
                <li className="hover:text-primary cursor-pointer">Audio</li>
                <li className="hover:text-primary cursor-pointer">Accessories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer">Contact Us</li>
                <li className="hover:text-primary cursor-pointer">FAQs</li>
                <li className="hover:text-primary cursor-pointer">Shipping & Returns</li>
                <li className="hover:text-primary cursor-pointer">Warranty Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">Subscribe for latest updates and offers.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary text-white"
                />
                <Button className="shrink-0">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Nexus Electronics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
