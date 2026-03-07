import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-96 md:h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background image */}
      <img 
        src="/images/hero.jpg" 
        alt="Faye's Pottery - Handmade Ceramic Pieces"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <div className="mb-4 text-sm tracking-widest uppercase text-white/90">Handmade in Texas</div>
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
          Pottery Crafted with Care
        </h1>
        <p className="text-lg md:text-2xl mb-10 text-white/95 font-light leading-relaxed max-w-2xl mx-auto">
          Each piece is unique. Hand-thrown, hand-finished, designed to be loved and used every day.
        </p>
        <Link href="/shop" className="inline-block bg-[#ffffff] border text-[#3A3A3A] px-10 py-4 font-semibold hover:bg-glaze hover:border-glaze hover:text-[#ffffff] shadow-lg transition hover:shadow-xl">
          Shop Now
        </Link>
      </div>
    </section>
  )
}
