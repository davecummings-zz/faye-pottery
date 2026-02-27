// Product data - replace with real products and images as they're collected from Faye
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'bowls' | 'mugs' | 'plates' | 'vases' | 'planters' | 'special'
  featured: boolean
  dimensions?: string
  materials?: string
  stock: number
}

export const products: Product[] = [
  {
    id: 'bowl-01',
    name: 'Rustic Ceramic Bowl - Medium',
    description: 'Hand-thrown stoneware bowl with natural glaze. Perfect for serving or everyday use.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    category: 'bowls',
    featured: true,
    dimensions: '6" diameter x 3" height',
    materials: 'Stoneware, natural glaze',
    stock: 3,
  },
  {
    id: 'mug-01',
    name: 'Warm Clay Mug',
    description: 'Comfortable, handmade mug with warm earthy tones. Holds 12oz. Great for morning coffee or tea.',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    category: 'mugs',
    featured: true,
    dimensions: '3.5" diameter x 4.5" height',
    materials: 'Stoneware, high-fire glaze',
    stock: 5,
  },
  {
    id: 'plate-01',
    name: 'Dinner Plate - Set of 2',
    description: 'Elegant hand-thrown dinner plates. Food-safe and dishwasher friendly.',
    price: 5600,
    image: 'https://images.unsplash.com/photo-1634482298928-30126306f827?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    category: 'plates',
    featured: true,
    dimensions: '10" diameter',
    materials: 'Porcelain, glazed',
    stock: 4,
  },
  {
    id: 'vase-01',
    name: 'Sculptural Vase - Large',
    description: 'Statement piece. A beautiful sculptural vase that works with or without flowers.',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1578761519125-f2baf0eacba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    category: 'vases',
    featured: false,
    dimensions: '8" diameter x 12" height',
    materials: 'Stoneware, matte glaze',
    stock: 2,
  },
  {
    id: 'planter-01',
    name: 'Geometric Planter',
    description: 'Modern planter with drainage hole. Perfect for succulents or small plants.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1578906450891-4b769bcce551?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    category: 'planters',
    featured: true,
    dimensions: '5" x 5" x 5"',
    materials: 'Stoneware, modern glaze',
    stock: 6,
  },
  {
    id: 'bowl-02',
    name: 'Minimalist Shallow Bowl',
    description: 'Shallow bowl perfect for salads or as a serving dish. Simple, elegant design.',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    category: 'bowls',
    featured: false,
    dimensions: '8" diameter x 2" height',
    materials: 'Stoneware, satin glaze',
    stock: 3,
  },
  {
    id: 'mug-02',
    name: 'Artisan Speckled Mug',
    description: 'Unique speckled glaze makes each mug one-of-a-kind. Handmade with love.',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    category: 'mugs',
    featured: false,
    dimensions: '3.5" diameter x 4" height',
    materials: 'Stoneware, speckled glaze',
    stock: 7,
  },
  {
    id: 'vase-02',
    name: 'Textured Bud Vase',
    description: 'Small, intimate bud vase with beautiful surface texture. Perfect for single stems.',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1578905372441-42451fbfe33d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    category: 'vases',
    featured: false,
    dimensions: '3" diameter x 4" height',
    materials: 'Stoneware, textured glaze',
    stock: 8,
  },
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
