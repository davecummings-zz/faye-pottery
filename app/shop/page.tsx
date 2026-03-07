import { Suspense } from 'react'
import ShopContent from './shop-content'

export default function Shop() {
  return (
    <>
      <div className="bg-white text-[#3A3A3A] py-12 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Shop</h1>
          <p className="text-lg mt-2 text-[rgba(58,58,58,0.9)]">Browse our collection of handmade pottery</p>
        </div>
      </div>

      <Suspense fallback={<div className="py-12 text-center">Loading...</div>}>
        <ShopContent />
      </Suspense>
    </>
  )
}
