import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = (product.price / 100).toFixed(2)

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer">
        <div className="relative h-72 overflow-hidden shadow-md mb-6 bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          {product.quantity === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
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
  )
}
