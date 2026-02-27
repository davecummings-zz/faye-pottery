'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!selectedCategory) return products
    return products.filter(p => p.category === selectedCategory)
  }, [selectedCategory])

  const categories = ['bowls', 'mugs', 'plates', 'vases', 'planters', 'special'] as const

  return (
    <>
      <div className="bg-glaze text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Shop</h1>
          <p className="text-lg mt-2 text-white/90">Browse our collection of handmade pottery</p>
        </div>
      </div>

      <section className="py-12 bg-sand">
        <div className="max-w-6xl mx-auto px-4">
          {/* Filters */}
          <div className="mb-12">
            <h3 className="font-bold text-clay mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === null
                    ? 'bg-clay text-white'
                    : 'bg-white text-earth border border-clay hover:bg-clay hover:text-white'
                }`}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg transition capitalize ${
                    selectedCategory === cat
                      ? 'bg-clay text-white'
                      : 'bg-white text-earth border border-clay hover:bg-clay hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-earth">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
