'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getProduct } from '@/lib/products'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(product?.image || '')
  const [zoomLevel, setZoomLevel] = useState(1)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product?.selectedColor || '')

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

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product, quantity, selectedColor || undefined)
    setIsLoading(true)
    // Simulate a brief loading state for feedback
    setTimeout(() => {
      setIsLoading(false)
      // Reset quantity after adding
      setQuantity(1)
    }, 500)
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
              {product.images && product.images.length > 0 && (
                <div className="flex gap-3 overflow-x-auto">
                  {/* Main image always first */}
                  <button
                    onClick={() => setSelectedImage(product.image)}
                    className={`flex-shrink-0 w-20 h-20 rounded border-2 transition ${
                      selectedImage === product.image
                        ? 'border-glaze'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} main`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  
                  {/* Additional images */}
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
                        alt={`${product.name} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-[#3A3A3A] capitalize mb-4">
                {product.name}
              </h1>

              <p className="text-2xl font-bold mb-6">
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

              {/* Color Variants */}
              {product.colorVariants && product.colorVariants.length > 0 && (
                <div className="mb-8">
                  <label className="font-bold text-[#3A3A3A] block mb-3">Color:</label>
                  <div className="flex flex-wrap gap-3">
                    {product.colorVariants.map(variant => (
                      <button
                        key={variant.name}
                        onClick={() => setSelectedColor(variant.name)}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-full transition ${
                          selectedColor === variant.name
                            ? 'border-[#3A3A3A]'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div
                          className="w-6 h-6 border border-gray-400 rounded-full"
                          style={{ backgroundColor: variant.color }}
                        />
                        <span className="text-[#3A3A3A]">{variant.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

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

                  <div className="space-y-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={isLoading}
                      className={`w-full px-8 py-4 font-bold text-lg transition ${
                        isLoading
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-glaze text-[#fff] border hover:border-glaze  hover:text-[#3a3a3a]'
                      }`}
                    >
                      {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
                    </button>
                    <Link
                      href="/cart"
                      className="block w-full px-8 py-3 text-center bg-white text-[#3A3A3A] border hover:bg-glaze hover:text-white font-semibold transition"
                    >
                      View Cart
                    </Link>
                  </div>

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
