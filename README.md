# Faye Nicole Pottery Website

A beautiful, fully functional e-commerce website for a pottery artist. Built with **Next.js 14**, **Tailwind CSS**, **Stripe**, and **Resend** for payments and emails.

**Live:** https://fayenicolepottery.com (Vercel: https://faye-pottery-site.vercel.app)

## ✅ Features (Production-Ready)

### Shopping & Products
- 🎨 **Responsive Design** - Mobile-first with touch gestures (image swiping on shop cards)
- 🛍️ **Product Shop** - Browse and filter pottery by category (URL params: `?category=bowls`)
- 🖼️ **Product Gallery** - Multiple images per product with thumbnails and 2x zoom on hover
- 📱 **Mobile Image Swiping** - Touch-based swipe left/right on product cards to preview images
- 🎯 **Color Variants** - Products with multiple colors (e.g., Spoon Rest: White, Brown, Blue)
- 📦 **Shopping Cart** - React Context + localStorage persistence, independent color variant management
- 💳 **Stripe Integration** - Fully functional checkout with multiple items and color variants (test mode: 4242 4242 4242 4242)

### Content & Engagement
- 📬 **Contact Form** - Email integration with Resend (sends to faye.n.cummings@gmail.com)
- 📸 **Instagram Feed** - Live feed from @fayenicolepottery (Elfsight embed, ready for API upgrade)
- 📢 **Announcement Bar** - Easy on/off toggle for promotions/events (doesn't affect sticky nav)
- ℹ️ **About Page** - Faye's story and pottery philosophy
- 🏠 **Hero Section** - Beautiful pottery-inspired hero with call-to-action

### Technical
- ⚡ **Next.js 14 App Router** - Fast, modern, and SEO-ready
- 🎨 **Tailwind CSS** - Custom pottery color scheme (clay, glaze, earth, sand)
- 🔐 **Environment Variables** - Secure API key management via Vercel
- 🚀 **Auto-Deployment** - Vercel auto-deploys on git push (main branch)
- 📱 **Mobile UX** - Hamburger menu with animated icon toggle, touch-friendly interactions
- 🖼️ **Image Optimization** - Next.js Image component for performance
- ✅ **Favicon Setup** - Complete favicon & PWA icons configured

## Project Structure

```
faye-pottery/
├── app/
│   ├── layout.tsx              # Root layout with CartProvider, AnnouncementBar
│   ├── page.tsx                # Home (Hero, About, Featured Products, Instagram Feed)
│   ├── shop/page.tsx           # Shop with category filtering
│   ├── product/[id]/page.tsx   # Product detail with gallery, zoom, variants
│   ├── about/page.tsx          # About Faye
│   ├── contact/page.tsx        # Contact form (Resend)
│   ├── cart/page.tsx           # Shopping cart with checkout
│   ├── api/
│   │   ├── checkout/route.ts   # Stripe checkout session creation
│   │   ├── contact/route.ts    # Resend email handler
│   │   └── webhook/route.ts    # Stripe webhook (optional)
│   └── globals.css             # Global styles, Elfsight CSS overrides
├── components/
│   ├── Navigation.tsx          # Sticky nav with cart icon, mobile menu
│   ├── AnnouncementBar.tsx     # Promotional announcement (toggle on/off)
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── FeaturedProducts.tsx
│   ├── ProductCard.tsx         # Card with image swiping on mobile
│   ├── Footer.tsx
│   └── InstagramFeed.tsx       # Elfsight Instagram feed
├── lib/
│   ├── products.ts             # Product catalog with ColorVariant support
│   ├── cartContext.tsx         # Cart state management (React Context)
│   └── announcement.ts         # Announcement bar configuration
├── public/
│   └── images/                 # Product images, favicon, etc.
├── tailwind.config.ts          # Tailwind colors & theme
└── package.json
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
# Stripe (https://dashboard.stripe.com → Developers → API Keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE

# Resend (https://resend.com → API Keys)
RESEND_API_KEY=your_resend_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Adding/Updating Products

Edit `/lib/products.ts`:

```typescript
{
  id: 'mug-01',
  name: 'Warm Clay Mug',
  description: 'Handmade ceramic mug with natural glaze',
  price: 3500, // in cents ($35.00)
  image: '/images/products/mug-01.jpg',
  images: ['/images/products/mug-01-alt.jpg'], // optional alt images
  category: 'mugs',
  featured: true,
  quantity: 10, // stock
  colorVariants: [
    { color: 'White', value: 'white' },
    { color: 'Brown', value: 'brown' },
  ],
}
```

### Color Scheme

Edit `/tailwind.config.ts`:

```typescript
colors: {
  clay: '#9d7a6e',
  glaze: '#b6bfb2',
  earth: '#3A3A3A',
  sand: '#f6f6f6',
}
```

### Announcement Bar

Toggle promotions on/off in `/lib/announcement.ts`:

```typescript
export const ANNOUNCEMENT = {
  ENABLED: true,  // Set to true to show
  TEXT: "Free shipping on orders over $50!",
}
```

When enabled, the navbar becomes non-sticky. When disabled, navbar is sticky (original behavior).

### Instagram Feed

Currently uses **Elfsight** (temporary solution). To upgrade to **Instafeed.js** (when API token available):

1. Get Instagram API access token from Meta/Facebook
2. Update `/components/InstagramFeed.tsx` to use Instafeed.js library
3. No layout changes needed — component already structured for easy swap

## Key Features Explained

### Shopping Cart System

- React Context + localStorage (persists across sessions)
- **Color Variants:** Same product in different colors = separate line items
  - Cart ID format: `${product.id}-${selectedColor}` (e.g., `special-01-white`)
  - Delete cream Spoon Rest → only cream removed, brown & blue stay
- Quantity controls with stock limit enforcement
- Stripe checkout with multiple items in one session

### Mobile UX

- **Hamburger Menu:** Icon toggles between ☰ (closed) and ✕ (open)
- **Image Swiping:** Swipe left/right on product cards to preview images
- **Touch Gestures:** Responsive to mobile interactions
- **Full Responsive:** Works beautifully on all screen sizes

### Stripe Integration

- Test mode only (default)
- Test card: `4242 4242 4242 4242` (any future date, any CVC) — use for development testing
- Checkout creates session, redirects to Stripe-hosted checkout
- Webhook handling in place (optional order notifications)

### Email Integration (Resend)

- Contact form sends to `faye.n.cummings@gmail.com`
- Free tier: 100 emails/day
- Built-in Next.js support
- Simple to configure

## Deployment

### Vercel (Recommended — Already Configured)

Live deployment at: https://faye-pottery-site.vercel.app

To redeploy:

```bash
git add .
git commit -m "Your message"
git push origin main  # Auto-deploys to Vercel
```

Environment variables already set in Vercel dashboard.

### Custom Domain

Domain: `fayenicolepottery.com` (purchased at Namecheap)
DNS configured at Namecheap (A record + CNAME for Vercel)

## Testing

### Stripe Checkout
1. Add products to cart
2. Go to /cart
3. Click "Proceed to Checkout"
4. Use test card: `4242 4242 4242 4242`
5. Complete checkout

### Contact Form
1. Go to /contact
2. Fill out form
3. Email sends to faye.n.cummings@gmail.com (via Resend)

### Color Variants
1. Go to /shop
2. Find "Artisan Spoon Rest" (special-01)
3. Add cream, brown, blue to cart (click product for color options)
4. Go to /cart
5. Verify each color is a separate line item
6. Delete one → only that color removed ✅

## Roadmap / Future Features

- [ ] Order tracking with email notifications
- [ ] Customer accounts & order history
- [ ] Advanced inventory management dashboard
- [ ] Blog/Content management (pottery process, artist updates)
- [ ] Google Analytics & Vercel Analytics
- [ ] Email newsletter signup
- [ ] Upgrade Instagram feed to API-based (Instafeed.js)
- [ ] Product reviews/ratings
- [ ] Wishlist feature
- [ ] Search functionality

## Maintenance

### Updating Products
- Edit `/lib/products.ts`
- Commit & push → auto-deploys to Vercel

### Monitoring
- Vercel Dashboard: https://vercel.com (deployment status, analytics)
- Stripe Dashboard: https://dashboard.stripe.com (payment details)

### Backups
- All code in GitHub (commits are your backup)
- Stripe payments safely stored with Stripe
- Cart data saved in browser localStorage

## Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Resend Docs](https://resend.com/docs)

## Stack Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | Next.js 14 + React 18 | Framework & UI |
| Styling | Tailwind CSS | Design system |
| State | React Context | Cart management |
| Payments | Stripe | Checkout & payments |
| Email | Resend | Contact form |
| Hosting | Vercel | Deployment & CDN |
| Images | Elfsight | Instagram feed |
| Database | localStorage | Cart persistence |

---

**Built with ❤️ for Faye Nicole Pottery**

Last updated: March 12, 2026
