'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getProduct } from '@/lib/products'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-clay mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-glaze hover:text-clay transition">
            ← Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const formattedPrice = (product.price / 100).toFixed(2)
  const totalPrice = ((product.price * quantity) / 100).toFixed(2)

  const handleAddToCart = async () => {
    if (!product) return

    setIsLoading(true)
    try {
      // Call our checkout API endpoint
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: quantity,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      )
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-sand">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link href="/shop" className="text-clay hover:text-glaze transition flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Shop
          </Link>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative h-96 md:h-screen rounded-lg overflow-hidden shadow-lg bg-sand">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-clay mb-4">
                {product.name}
              </h1>

              <p className="text-2xl font-bold text-glaze mb-6">
                ${formattedPrice}
              </p>

              <p className="text-lg text-earth mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              <div className="bg-sand p-6 rounded-lg mb-8">
                {product.dimensions && (
                  <p className="mb-3">
                    <span className="font-bold text-clay">Dimensions:</span> {product.dimensions}
                  </p>
                )}
                {product.materials && (
                  <p>
                    <span className="font-bold text-clay">Materials:</span> {product.materials}
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <p className={`text-sm font-semibold mb-6 ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.quantity > 0 
                  ? `${product.quantity} ${product.bundleSize ? `sets of ${product.bundleSize}` : 'in stock'}`
                  : 'Out of stock'
                }
              </p>

              {/* Quantity and Add to Cart */}
              {product.quantity > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <label className="font-bold text-clay">Quantity:</label>
                    <div className="flex items-center border border-clay rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-clay hover:bg-sand transition"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 border-l border-r border-clay">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-clay hover:bg-sand transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className={`px-8 py-4 rounded-lg font-bold text-lg transition ${
                      isLoading
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-clay text-white hover:bg-earth'
                    }`}
                  >
                    {isLoading ? 'Processing...' : `Add to Cart - $${totalPrice}`}
                  </button>

                  <p className="text-sm text-earth/60">
                    🚚 Free shipping on orders over $100 | Handmade to order, ships within 2 weeks
                  </p>
                </div>
              )}

              {product.quantity === 0 && (
                <button
                  disabled
                  className="bg-gray-400 text-white px-8 py-4 rounded-lg font-bold text-lg cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
