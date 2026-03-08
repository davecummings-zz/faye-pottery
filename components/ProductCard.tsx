'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = (product.price / 100).toFixed(2)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const images = product.images && product.images.length > 0 
    ? [product.image, ...product.images]
    : [product.image]
  
  const currentImage = images[currentImageIndex]
  const hasMultipleImages = images.length > 1

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
    handleSwipe()
  }

  const handleSwipe = () => {
    if (!hasMultipleImages) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    } else if (isRightSwipe) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Only allow link click on the text area or when no images to swipe
    if (!hasMultipleImages) return
    
    const target = e.target as HTMLElement
    if (!target.closest('[data-image-container]')) {
      return
    }
  }

  return (
    <div onClick={handleCardClick}>
      <Link href={`/product/${product.id}`}>
        <div className="group cursor-pointer">
          <div 
            className="relative h-72 overflow-hidden shadow-md mb-6 bg-white"
            data-image-container
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={currentImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
            {product.quantity === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Out of Stock</span>
              </div>
            )}

            {/* Image Indicators (Dots) - Mobile Only */}
            {hasMultipleImages && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 md:hidden">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition ${
                      index === currentImageIndex ? 'bg-[#3A3A3A]' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        
        <h3 className="text-xl font-bold text-[#3A3A3A] capitalize mb-2 group-hover:text-[#3A3A3A] transition">
          {product.name}
        </h3>
        
        <p className="text-[#3A3A3A] text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#3A3A3A]">
            ${formattedPrice}
          </span>
          <span className={`text-sm font-semibold ${product.quantity > 0 ? 'text-[#3A3A3A]' : 'text-[#3A3A3A]'}`}>
            {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>
    </Link>
    </div>
  )
}
