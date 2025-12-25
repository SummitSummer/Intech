import { useProducts, useSeedProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight,
  ChevronRight,
  Truck,
  ShieldCheck,
  Clock,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: products, isLoading } = useProducts({ sort: "popular" });
  const { mutate: seed, isPending: isSeeding } = useSeedProducts();

  const categories = [
    {
      name: "Smartphones",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Laptops",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Audio",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Accessories",
      image:
        "https://img3.akspic.ru/crops/8/2/4/6/3/136428/136428-ustrojstvo_vvoda-igrovaya_konsol-prisposoblenie-gadzhet-videoigra-1920x1080.jpg",
    },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free fast delivery",
      desc: "Across India on all orders over ₹999.",
    },
    {
      icon: ShieldCheck,
      title: "Official warranty",
      desc: "Only original, certified products.",
    },
    {
      icon: Clock,
      title: "24/7 support",
      desc: "Help with orders and devices anytime.",
    },
    {
      icon: Zap,
      title: "Exclusive deals",
      desc: "Special prices and launches every week.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-900 bg-gradient-to-b from-neutral-950 via-black to-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 lg:flex-row lg:items-center lg:pb-24 lg:pt-16">
          {/* Left text */}
          <div className="flex-1 space-y-6">
            <motion.h1
              className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Experience the cutting edge of technology.
            </motion.h1>
            <motion.p
              className="max-w-xl text-neutral-400"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Best prices on smartphones, laptops, and premium audio gear in
              India. Curated selection, ultra-fast delivery, and secure
              checkout.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="/catalog">
                  Browse catalog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-neutral-700 text-neutral-200 hover:bg-neutral-900"
                onClick={() => seed()}
                disabled={isSeeding}
              >
                {isSeeding ? "Seeding products..." : "Seed demo products"}
              </Button>
            </motion.div>

            <motion.div
              className="mt-4 flex flex-wrap gap-6 text-sm text-neutral-400"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-400" />
                <span>Free delivery from ₹999</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sky-400" />
                <span>1 year official warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>Same‑day dispatch</span>
              </div>
            </motion.div>
          </div>

          {/* Right / categories */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/catalog?category=${encodeURIComponent(cat.name)}`}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/60"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-sm font-medium">
                    <span>{cat.name}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-neutral-900 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 md:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="flex gap-3 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                <div className="mt-1 rounded-full bg-neutral-900 p-2">
                  <feature.icon className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-medium">{feature.title}</div>
                  <div className="mt-1 text-xs text-neutral-400">
                    {feature.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular products */}
      <section className="border-b border-neutral-900 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Find exactly what you're looking for</h2>
              <p className="text-sm text-neutral-400">
                Top selling products selected for you.
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/catalog" className="gap-2">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-xl bg-neutral-900"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(products ?? []).slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-black/40">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold tracking-[0.25em]">
                INTECH
              </h3>
              <p className="mt-3 max-w-xs text-sm text-neutral-400">
                Your premier destination for high-end electronics and gadgets.
                Bringing the future of technology to your doorstep.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-200">Shop</h4>
              <ul className="mt-3 space-y-2 text-sm text-neutral-400">
                <li>
                  <Link
                    href="/catalog?category=Smartphones"
                    className="transition hover:text-white"
                  >
                    Smartphones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalog?category=Laptops"
                    className="transition hover:text-white"
                  >
                    Laptops
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalog?category=Audio"
                    className="transition hover:text-white"
                  >
                    Audio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalog?category=Accessories"
                    className="transition hover:text-white"
                  >
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-200">
                Support
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-neutral-400">
                <li>
                  <Link
                    href="/support/contact"
                    className="transition hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support/faqs"
                    className="transition hover:text-white"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support/shipping-returns"
                    className="transition hover:text-white"
                  >
                    Shipping &amp; Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support/warranty"
                    className="transition hover:text-white"
                  >
                    Warranty Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-200">
                Newsletter
              </h4>
              <p className="mt-3 text-sm text-neutral-400">
                Subscribe for latest updates and offers.
              </p>
              <form className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 text-xs text-neutral-500 sm:flex-row">
            <p>© 2024 Intech Electronics. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="transition hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
