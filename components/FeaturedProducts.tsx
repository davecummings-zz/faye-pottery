import ProductCard from './ProductCard'
import { getFeaturedProducts } from '@/lib/products'
import Link from 'next/link'

export default function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <section className="py-20 md:py-32 bg-sand">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-clay mb-4">Featured Pieces</h2>
          <p className="text-lg text-earth/70 font-light">Handmade ceramics, each one unique</p>
        </div>
        
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
