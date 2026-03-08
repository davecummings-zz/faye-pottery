// Product data - replace with real products and images as they're collected from Faye
export interface ColorVariant {
  name: string
  color: string // hex code or CSS color name
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images?: string[] // Array of additional images for thumbnails
  category: 'bowls' | 'mugs' | 'plates' | 'vases' | 'planters' | 'special'
  featured: boolean
  dimensions?: string
  materials?: string
  quantity: number
  bundleSize?: number // If set, this product is sold as a bundle (e.g., set of 2)
  colorVariants?: ColorVariant[] // Available color options
  selectedColor?: string // Default selected color
}

export const products: Product[] = [
  // {
  //   id: 'bowl-01',
  //   name: 'Rustic Ceramic Bowl - Medium',
  //   description: 'Hand-thrown stoneware bowl with natural glaze. Perfect for serving or everyday use.',
  //   price: 4500,
  //   image: '/images/rustic-ceramic-bowl.jpg',
  //   images: ['/images/rustic-ceramic-bowl.jpg', '/images/hero.jpg', '/images/warm-clay-mug.jpg'],
  //   category: 'bowls',
  //   featured: true,
  //   dimensions: '6" diameter x 3" height',
  //   materials: 'Stoneware, natural glaze',
  //   quantity: 1,
  // },
  {
    id: 'mug-01',
    name: 'Warm Clay Mug',
    description: 'Comfortable, handmade mug with warm earthy tones. Holds 12oz. Great for morning coffee or tea.',
    price: 2800,
    image: '/images/mugs/white/1.jpeg',
    images: ['/images/mugs/white/2.jpeg', '/images/mugs/white/3.jpeg', '/images/mugs/white/4.jpeg'],
    category: 'mugs',
    featured: true,
    dimensions: '3.5" diameter x 4.5" height',
    materials: 'Stoneware, high-fire glaze',
    quantity: 4,
  },
  // {
  //   id: 'plate-01',
  //   name: 'Dinner Plate - Set of 2',
  //   description: 'Elegant hand-thrown dinner plates. Food-safe and dishwasher friendly.',
  //   price: 5600,
  //   image: '/images/dinner-plate.jpg',
  //   category: 'plates',
  //   featured: true,
  //   dimensions: '10" diameter',
  //   materials: 'Porcelain, glazed',
  //   quantity: 2,
  //   bundleSize: 2,
  // },
  // {
  //   id: 'vase-01',
  //   name: 'Sculptural Vase - Large',
  //   description: 'Statement piece. A beautiful sculptural vase that works with or without flowers.',
  //   price: 7500,
  //   image: '/images/rustic-ceramic-bowl.jpg',
  //   category: 'vases',
  //   featured: false,
  //   dimensions: '8" diameter x 12" height',
  //   materials: 'Stoneware, matte glaze',
  //   quantity: 2,
  // },
  // {
  //   id: 'planter-01',
  //   name: 'Geometric Planter',
  //   description: 'Modern planter with drainage hole. Perfect for succulents or small plants.',
  //   price: 3500,
  //   image: '/images/rustic-ceramic-bowl.jpg',
  //   category: 'planters',
  //   featured: true,
  //   dimensions: '5" x 5" x 5"',
  //   materials: 'Stoneware, modern glaze',
  //   quantity: 6,
  // },
  // {
  //   id: 'bowl-02',
  //   name: 'Minimalist Shallow Bowl',
  //   description: 'Shallow bowl perfect for salads or as a serving dish. Simple, elegant design.',
  //   price: 3800,
  //   image: '/images/rustic-ceramic-bowl.jpg',
  //   category: 'bowls',
  //   featured: false,
  //   dimensions: '8" diameter x 2" height',
  //   materials: 'Stoneware, satin glaze',
  //   quantity: 3,
  // },
  {
    id: 'special-01',
    name: 'Artisan Spoon Rest',
    description: 'Unique speckled glaze makes spoon rest a one-of-a-kind. Handmade with love.',
    price: 2200,
    image: '/images/spoon-rests/1.jpeg',
    images: ['/images/spoon-rests/2.jpeg', '/images/spoon-rests/3.jpeg', '/images/spoon-rests/4.jpeg'],
    category: 'special',
    featured: true,
    dimensions: '3.5" diameter x 1" height',
    materials: 'Stoneware, speckled glaze',
    quantity: 7,
    colorVariants: [
      { name: 'Cream', color: '#FDFFFE' },
      { name: 'Brown', color: '#937156' },
      { name: 'Blue', color: '#3C4551' },
    ],
    selectedColor: 'White',
  },
  // {
  //   id: 'vase-02',
  //   name: 'Textured Bud Vase',
  //   description: 'Small, intimate bud vase with beautiful surface texture. Perfect for single stems.',
  //   price: 2400,
  //   image: '/images/rustic-ceramic-bowl.jpg',
  //   category: 'vases',
  //   featured: false,
  //   dimensions: '3" diameter x 4" height',
  //   materials: 'Stoneware, textured glaze',
  //   quantity: 8,
  // },
]

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}
