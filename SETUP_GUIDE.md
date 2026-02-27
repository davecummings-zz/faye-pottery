# Quick Setup Guide for Faye's Pottery Website

## What's Been Built

✅ **Complete Next.js site** with:
- Home page with hero section
- About page (Faye's story)
- Shop with product filtering
- Individual product pages
- Contact form
- Newsletter signup
- Beautiful pottery-themed colors
- Fully responsive (mobile + desktop)
- Placeholder images ready to replace

## Before You Launch

### 1. **Get Real Images from Faye**
- Product photos (8+ pieces minimum)
- About photo (of Faye or her studio)
- Keep them high-quality (2000x2000px minimum)

### 2. **Update Product Data**
Edit `lib/products.ts`:
- Replace placeholder product names/descriptions
- Update prices (in cents: $45 = 4500)
- Add real image URLs (upload to cloud storage like Cloudinary or AWS S3)
- Update dimensions and materials

### 3. **Customize Content**
- `app/about/page.tsx` - Update Faye's bio, location, story
- `app/contact/page.tsx` - Update email and Instagram handle
- `components/Footer.tsx` - Update links
- `components/Navigation.tsx` - Edit brand name if needed

### 4. **Set Up Stripe** (Payment Processing)

**Get API Keys:**
1. Go to [stripe.com](https://stripe.com) → Create account
2. Dashboard → Developers → API Keys
3. Copy "Publishable key" and "Secret key"

**Add to `.env.local`:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
```

**The checkout button is ready** - just needs keys added. When you're ready to go live, switch to live keys.

### 5. **Set Up Hosting (Vercel)**

**Recommended because:**
- Built by creators of Next.js
- Free tier is generous
- Deploy with one click from GitHub
- Automatic HTTPS, CDN, fast worldwide

**Steps:**
1. Push code to GitHub: `git push`
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repo
5. Add environment variables (Stripe keys)
6. Click "Deploy"

**Custom domain:**
- In Vercel dashboard, add your domain
- Follow their DNS setup instructions
- Should go live in 24-48 hours

## File Structure to Know

```
app/
├── page.tsx           ← HOME PAGE
├── about/             ← ABOUT PAGE
├── shop/              ← SHOP LISTING
├── product/[id]/      ← INDIVIDUAL PRODUCT
└── contact/           ← CONTACT FORM

lib/
└── products.ts        ← EDIT THIS: Add your products

components/
└── ProductCard.tsx    ← How products look in the shop
```

## Running Locally

```bash
npm install              # Install dependencies
npm run dev             # Start dev server
# Visit http://localhost:3000
```

## Making Updates Later

**Add new product:**
- Add entry to `lib/products.ts`

**Update prices:**
- Edit `lib/products.ts`

**Change colors:**
- Edit `tailwind.config.ts`

**Update text:**
- Edit the relevant `.tsx` file

**Deploy changes:**
- Commit to GitHub → Vercel auto-deploys

## Next Steps

1. **Gather Faye's images** (products + about photo)
2. **Create `.env.local`** with Stripe keys
3. **Update `lib/products.ts`** with real products
4. **Run locally** (`npm run dev`) and test
5. **Push to GitHub**
6. **Deploy to Vercel**

## Questions?

- **Next.js docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Stripe docs:** [stripe.com/docs](https://stripe.com/docs)
- **Tailwind docs:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

**The hard part is done. The site is ready. Just add real images, products, and deploy!** 🎉
