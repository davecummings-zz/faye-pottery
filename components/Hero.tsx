import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-96 md:h-[600px] bg-gradient-to-br from-warm via-glaze to-clay flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1578905372441-42451fbfe33d?w=1200&h=1200&fit=crop')] bg-cover bg-center" />
      
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <div className="mb-4 text-sm tracking-widest uppercase text-white/80">Handmade in Texas</div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
          Pottery Crafted with Care
        </h1>
        <p className="text-lg md:text-2xl mb-10 text-white/95 font-light leading-relaxed max-w-2xl mx-auto">
          Each piece is unique. Hand-thrown, hand-finished, designed to be loved and used every day.
        </p>
        <Link href="/shop" className="inline-block bg-cream text-clay px-10 py-4 rounded font-semibold hover:bg-white shadow-lg transition hover:shadow-xl">
          Shop Now
        </Link>
      </div>
    </section>
  )
}
