import Image from 'next/image'

export default function About() {
  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-serif font-bold text-clay mb-8">About Faye</h2>
            <p className="text-lg text-earth mb-6 leading-relaxed font-light">
              I'm a ceramic artist dedicated to creating beautiful, functional pottery that brings joy to everyday moments. Each piece is hand-thrown and hand-finished with intention and care.
            </p>
            <p className="text-lg text-earth mb-6 leading-relaxed font-light">
              My work celebrates the natural beauty of clay—the organic forms, warm glazes, and tactile surfaces that make handmade ceramics special. Whether it's a morning coffee mug or a statement vase, I create pieces meant to be used and loved.
            </p>
            <p className="text-lg text-earth leading-relaxed font-light">
              Based in [Your Location], I work from my studio creating unique pottery while also teaching others the meditative art of ceramic work.
            </p>
          </div>
          
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://picsum.photos/600/600?random=9"
              alt="Faye working on pottery"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
