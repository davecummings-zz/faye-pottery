import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-96 md:h-screen bg-gradient-to-br from-glaze to-clay flex items-center justify-center text-white">
      <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1578905372441-42451fbfe33d?w=1200&h=1200&fit=crop')] bg-cover bg-center" />
      
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
          Handmade Pottery Crafted with Care
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/90">
          Each piece is unique. Made by hand, designed to be loved and used every day.
        </p>
        <Link href="/shop" className="inline-block bg-white text-clay px-8 py-3 rounded-lg font-semibold hover:bg-sand transition">
          Explore Our Shop
        </Link>
      </div>
    </section>
  )
}
