# Faye Nicole Pottery Website

A beautiful, hand-crafted website for a pottery artist. Built with **Next.js**, **Tailwind CSS**, and **Stripe** for payments.

## Features

- 🎨 **Responsive Design** - Mobile-first, looks great on all devices
- 🛍️ **Product Shop** - Browse and filter pottery by category
- 💳 **Stripe Integration** - Secure payment processing (ready for setup)
- 📧 **Newsletter Signup** - Email capture (ready for integration)
- 📬 **Contact Form** - Get in touch with Faye
- ⚡ **Fast & SEO-Ready** - Next.js App Router with Image Optimization
- 🎯 **Tailwind CSS** - Beautiful, maintainable styling with custom pottery colors

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Stripe (get these from https://dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Optional: Newsletter/Email service
NEXT_PUBLIC_EMAIL_SERVICE=mailchimp
EMAIL_API_KEY=...
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
faye-pottery/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop pages
│   ├── product/[id]/      # Product detail pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   └── ...
├── lib/                   # Utilities & data
│   └── products.ts        # Product data (replace with real products)
├── public/                # Static assets
├── package.json
└── tailwind.config.ts     # Tailwind configuration
```

## Customization

### Adding Products

Edit `lib/products.ts` to add real pottery:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 4500, // in cents
  image: 'https://example.com/image.jpg',
  category: 'bowls',
  featured: true,
  dimensions: '6" diameter',
  materials: 'Stoneware',
  stock: 5,
}
```

### Colors & Styling

The site uses custom pottery-themed colors. Edit `tailwind.config.ts`:

```typescript
colors: {
  clay: '#8b7355',      // Main color
  glaze: '#d4a574',     // Accent
  earth: '#3d2817',      // Dark text
  sand: '#f5e6d3',      // Light background
}
```

### Images

Replace placeholder images with real pottery photos:
- Hero section background
- About page photo
- Product images
- Featured products

## Stripe Integration

### Setting Up Payments

1. **Create a Stripe Account** at [stripe.com](https://stripe.com)
2. **Get API Keys** from [Dashboard > Developers > API Keys](https://dashboard.stripe.com/apikeys)
3. **Add to `.env.local`:**
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

4. **Create Stripe Products** (optional - can use dynamic pricing)
   - Go to [Products](https://dashboard.stripe.com/products)
   - Create a product for each pottery item
   - Note the Price IDs

5. **Implement Checkout** in `app/product/[id]/page.tsx`:
   ```typescript
   import { loadStripe } from '@stripe/stripe-js'
   
   const handleCheckout = async () => {
     const stripe = await loadStripe(
       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
     )
     await stripe?.redirectToCheckout({ sessionId: /* ... */ })
   }
   ```

See [Stripe Docs](https://stripe.com/docs/payments/checkout) for full implementation.

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/faye-pottery.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repo
   - Add environment variables from `.env.local`
   - Click "Deploy"

3. **Set up Custom Domain:**
   - In Vercel Project Settings
   - Add your domain (e.g., fayepottery.com)
   - Update DNS records per Vercel instructions

### Deploy Elsewhere

You can also deploy to:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Any Node.js-compatible hosting

## Email Integration

### Newsletter & Contact Form

Currently, these are placeholders. To make them functional:

**Option 1: Mailchimp (Recommended)**
```bash
npm install @mailchimp/mailchimp_marketing
```

**Option 2: SendGrid**
```bash
npm install @sendgrid/mail
```

**Option 3: Resend** (built for Next.js)
```bash
npm install resend
```

See documentation in form components for implementation details.

## Roadmap

- [ ] Stripe payment integration
- [ ] Email service integration (Mailchimp/SendGrid)
- [ ] Product inventory management
- [ ] Order tracking
- [ ] Customer accounts & order history
- [ ] Instagram feed integration
- [ ] Blog/Content management
- [ ] Analytics (Vercel Analytics)

## Maintenance

### Updating Products
Edit `lib/products.ts` when Faye creates new pieces or updates inventory.

### Backup
- GitHub is your backup (commits save everything)
- Stripe data is safely stored on Stripe's servers

### Monitoring
Use Vercel's built-in analytics to track visitors and performance.

## Support

For questions or issues:
- Check Next.js docs: [nextjs.org](https://nextjs.org/docs)
- Check Stripe docs: [stripe.com/docs](https://stripe.com/docs)
- Check Tailwind docs: [tailwindcss.com](https://tailwindcss.com/docs)

---

**Built with ❤️ for Faye Nicole Pottery**
