import ProductCard from './ProductCard'
import { getFeaturedProducts } from '@/lib/products'
import Link from 'next/link'

export default function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#3A3A3A] mb-4">Featured Pieces</h2>
          <p className="text-lg text-[#3A3A3A]/70 font-light">Handmade ceramics, each one unique</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop" className="inline-block bg-white text-[#3A3A3A] border px-8 py-3 font-semibold hover:bg-glaze hover:text-[#ffffff] transition">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
