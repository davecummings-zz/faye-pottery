'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'

export default function ShopContent() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Initialize selectedCategory from URL query params
  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    if (!selectedCategory) return products
    return products.filter(p => p.category === selectedCategory)
  }, [selectedCategory])

  const categories = ['bowls', 'mugs', 'plates', 'vases', 'planters', 'special'] as const

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Filters */}
        <div className="mb-12">
          <h3 className="font-bold text-2xl  text-[#3A3A3A] mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 transition ${
                selectedCategory === null
                  ? 'bg-glaze text-white'
                  : 'bg-white text-[#3A3A3A] border hover:bg-[#b6bfb2] hover:text-white'
              }`}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 transition capitalize ${
                  selectedCategory === cat
                    ? 'bg-glaze text-white'
                    : 'bg-white text-[#3A3A3A] border hover:bg-[#b6bfb2] hover:text-white'
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
          <div className="text-center py-12">
            <p className="text-xl text-[#3A3A3A]/60">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
