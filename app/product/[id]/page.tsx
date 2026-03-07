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
  const [selectedImage, setSelectedImage] = useState(product?.image || '')
  const [zoomLevel, setZoomLevel] = useState(1)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#3A3A3A] mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition">
            ← Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const formattedPrice = (product.price / 100).toFixed(2)
  const totalPrice = ((product.price * quantity) / 100).toFixed(2)

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
    setZoomLevel(2)
  }

  const handleImageLeave = () => {
    setZoomLevel(1)
    setIsHovering(false)
  }

  const handleImageEnter = () => {
    setIsHovering(true)
  }

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
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link href="/shop" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition flex items-center gap-2">
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
            {/* Images */}
            <div>
              {/* Main Image with Zoom */}
              <div 
                className="relative h-96 md:h-[56vh] overflow-hidden shadow-lg bg-white mb-4 cursor-zoom-in"
                onMouseMove={handleImageHover}
                onMouseEnter={handleImageEnter}
                onMouseLeave={handleImageLeave}
              >
                <div
                  className="w-full h-full transition-transform duration-200"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                >
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Zoom indicator */}
                {isHovering && (
                  <div className="absolute top-4 right-4 bg-[#3A3A3A] text-white px-3 py-1 text-sm rounded opacity-75">
                    🔍 Zoom
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`flex-shrink-0 w-20 h-20 rounded border-2 transition ${
                        selectedImage === image
                          ? 'border-glaze'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-[#3A3A3A] mb-4">
                {product.name}
              </h1>

              <p className="text-xl font-bold text-glaze mb-6">
                ${formattedPrice}
              </p>

              <p className="text-lg text-[#3A3A3A] mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              <div className="bg-white p-6 mb-8">
                {product.dimensions && (
                  <p className="mb-3">
                    <span className="font-bold text-[#3A3A3A]">Dimensions:</span> {product.dimensions}
                  </p>
                )}
                {product.materials && (
                  <p>
                    <span className="font-bold text-[#3A3A3A]">Materials:</span> {product.materials}
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <p className={`text-sm font-semibold mb-6 ${product.quantity > 0 ? 'text-[#3A3A3A]' : 'text-[#3A3A3A]'}`}>
                {product.quantity > 0 
                  ? `${product.quantity} ${product.bundleSize ? `sets of ${product.bundleSize}` : 'in stock'}`
                  : 'Out of stock'
                }
              </p>

              {/* Quantity and Add to Cart */}
              {product.quantity > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <label className="font-bold text-[#3A3A3A]">Quantity:</label>
                    <div className="flex items-center border border-clay">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-[#3A3A3A] hover:bg-white transition"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 border-l border-r border-clay">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                        disabled={quantity >= product.quantity}
                        className={`px-3 py-2 transition ${
                          quantity >= product.quantity
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#3A3A3A] hover:bg-white'
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[#3A3A3A]/70">
                    Maximum available: {product.quantity} {product.bundleSize ? `sets of ${product.bundleSize}` : 'item'}
                  </p>

                  <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className={`px-8 py-4 font-bold text-lg transition ${
                      isLoading
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-white text-[#3A3A3A] border border-clay hover:bg-glaze hover:border-glaze hover:text-[#ffffff]'
                    }`}
                  >
                    {isLoading ? 'Processing...' : `Add to Cart - $${totalPrice}`}
                  </button>

                  <p className="text-sm text-[#3A3A3A]/60">
                    🚚 Free shipping on orders over $100 | Handmade to order, ships within 2 weeks
                  </p>
                </div>
              )}

              {product.quantity === 0 && (
                <button
                  disabled
                  className="bg-gray-400 text-white px-8 py-4 font-bold text-lg cursor-not-allowed"
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
