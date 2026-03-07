import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <div className="bg-white text-[#3A3A3A] py-12 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">About Faye</h1>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold text-[#3A3A3A] mb-6">My Story</h2>
              <p className="text-lg text-[#3A3A3A] mb-4 leading-relaxed">
                I've been a ceramic artist for [X years], creating functional pottery that brings joy and beauty to everyday life. My journey began when I first stepped into a pottery studio and felt the clay in my hands—there was something magical about transforming raw earth into something beautiful and useful.
              </p>
              <p className="text-lg text-[#3A3A3A] mb-4 leading-relaxed">
                Every piece I create is hand-thrown and hand-finished. I believe in slow, intentional work. There are no shortcuts in my studio, and each bowl, mug, and vase carries a piece of my creative energy.
              </p>
              <p className="text-lg text-[#3A3A3A] leading-relaxed">
                Today, I run my own studio where I create pottery while also teaching the next generation of ceramic artists. Whether you're a collector, a home cook, or someone who simply loves beautiful things, I hope my work brings warmth to your space.
              </p>
            </div>

            <div className="relative h-96 overflow-hidden shadow-lg">
              <Image
                src="/images/faye.jpeg"
                alt="Faye in her pottery studio"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Values */}
          <div className="bg-white p-12 mb-16">
            <h3 className="text-2xl font-bold text-[#3A3A3A] mb-8 text-center">My Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">♻️</div>
                <h4 className="font-bold text-[#3A3A3A] mb-3">Sustainability</h4>
                <p className="text-[#3A3A3A]">
                  I source sustainable materials and minimize waste in my studio. Each piece is made to last a lifetime.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✋</div>
                <h4 className="font-bold text-[#3A3A3A] mb-3">Craftsmanship</h4>
                <p className="text-[#3A3A3A]">
                  Handmade means every piece is unique. Small imperfections are evidence of authentic human artistry.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">❤️</div>
                <h4 className="font-bold text-[#3A3A3A] mb-3">Connection</h4>
                <p className="text-[#3A3A3A]">
                  I create pottery to be used and loved daily. I love hearing how my pieces enhance your life.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#3A3A3A] mb-6">Ready to Find Your Favorite Piece?</h3>
            <Link href="/shop" className="inline-block bg-white text-[#3A3A3A] border px-8 py-3 font-semibold hover:bg-glaze hover:text-[#ffffff] transition">
              Explore the Shop
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
