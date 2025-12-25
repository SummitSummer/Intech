<footer className="border-t border-neutral-800 bg-black/40">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Блок с брендом */}
      <div>
        <h3 className="text-lg font-semibold tracking-[0.25em]">INTECH</h3>
        <p className="mt-3 text-sm text-neutral-400 max-w-xs">
          Your premier destination for high-end electronics and gadgets. Bringing the future of technology to your doorstep.
        </p>
      </div>

      {/* Shop */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-200">Shop</h4>
        <ul className="mt-3 space-y-2 text-sm text-neutral-400">
          <li>
            <Link
              href="/catalog?category=Smartphones"
              className="hover:text-white transition"
            >
              Smartphones
            </Link>
          </li>
          <li>
            <Link
              href="/catalog?category=Laptops"
              className="hover:text-white transition"
            >
              Laptops
            </Link>
          </li>
          <li>
            <Link
              href="/catalog?category=Audio"
              className="hover:text-white transition"
            >
              Audio
            </Link>
          </li>
          <li>
            <Link
              href="/catalog?category=Accessories"
              className="hover:text-white transition"
            >
              Accessories
            </Link>
          </li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-200">Support</h4>
        <ul className="mt-3 space-y-2 text-sm text-neutral-400">
          <li>
            <Link href="/support/contact" className="hover:text-white transition">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/support/faqs" className="hover:text-white transition">
              FAQs
            </Link>
          </li>
          <li>
            <Link
              href="/support/shipping-returns"
              className="hover:text-white transition"
            >
              Shipping &amp; Returns
            </Link>
          </li>
          <li>
            <Link
              href="/support/warranty"
              className="hover:text-white transition"
            >
              Warranty Policy
            </Link>
          </li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-200">Newsletter</h4>
        <p className="mt-3 text-sm text-neutral-400">
          Subscribe for latest updates and offers.
        </p>
        <form className="mt-4 flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
            Subscribe
          </Button>
        </form>
      </div>
    </div>

    <div className="mt-10 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
      <p>© 2024 Intech Electronics. All rights reserved.</p>
      <div className="flex gap-4">
        <Link href="/privacy" className="hover:text-white transition">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-white transition">
          Terms of Service
        </Link>
      </div>
    </div>
  </div>
</footer>
