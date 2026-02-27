import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-earth text-sand border-t-4 border-glaze">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Faye's Pottery</h3>
            <p className="text-sm text-sand/80">
              Handcrafted ceramics made with love and intention.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="hover:text-glaze transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bowls" className="hover:text-glaze transition">
                  Bowls
                </Link>
              </li>
              <li>
                <Link href="/shop?category=mugs" className="hover:text-glaze transition">
                  Mugs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=vases" className="hover:text-glaze transition">
                  Vases
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-glaze transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-glaze transition">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-glaze transition">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-glaze transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-glaze transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-glaze transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sand/20 pt-8 text-sm text-sand/60 text-center">
          <p>&copy; 2024 Faye's Pottery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
