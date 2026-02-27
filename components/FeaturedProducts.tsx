import ProductCard from './ProductCard'
import { getFeaturedProducts } from '@/lib/products'
import Link from 'next/link'

export default function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <section className="py-16 md:py-24 bg-sand">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-clay text-center mb-12">Featured Pieces</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop" className="inline-block bg-clay text-white px-8 py-3 rounded-lg font-semibold hover:bg-earth transition">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
