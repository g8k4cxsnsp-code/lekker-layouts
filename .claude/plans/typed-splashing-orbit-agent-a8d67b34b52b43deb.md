# Implementation Plan: Switch from PDF Downloads to Canva Template Links

## Overview
Replace the PDF download delivery mechanism with Canva template link delivery across the entire site. This involves changing the data model, updating the checkout success page, updating product detail pages, cleaning up copy across multiple pages, and removing the old PDF files.

## Files to Change (8 files) + Files to Delete (4 PDFs)

---

### 1. `/src/data/products.ts` — Data Model + Product Data

**Changes to the `Product` interface:**
- Remove `downloadUrl: string`
- Add `canvaLinks: { name: string; url: string }[]`

**Changes to each product entry:**

Replace `downloadUrl` with `canvaLinks` arrays using placeholder URLs. Example structure:

```ts
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  canvaLinks: { name: string; url: string }[];
  isActive: boolean;
}
```

Canva links per product:
- **Social Media Template Pack**: ~3 links (Instagram Posts, Instagram Stories, Facebook Covers)
- **Brand Identity Starter Kit**: ~4 links (Logo Brief, Color Palette Guide, Font Pairing Guide, Brand Board)
- **Website Content Planner**: ~3 links (Page Content Planner, SEO Keyword Template, Content Calendar)
- **Complete Business Launch Bundle**: all links from the above three products combined, plus bonus links (Business Launch Checklist, 30-Day Marketing Plan, Email Templates)

All URLs use placeholder format: `"https://www.canva.com/design/YOUR-TEMPLATE-ID/view"`

**Update descriptions** to be explicit about Canva links:
- p1: "30 professionally designed Canva templates for Instagram and Facebook posts. Get instant access to editable Canva links you can customize for your brand."
- p2: "Logo brief template, color palette guide, font pairing guide, and brand board — all as editable Canva templates you can make your own."
- p3: "A complete set of Canva templates for planning your website content, pages, and copy."
- p4: "Everything you need to launch your business online — brand kit, social templates, content planner, and more. All delivered as Canva template links."

---

### 2. `/src/app/checkout/success/page.tsx` — Post-Purchase Delivery

**Replace the download button block (lines 116-134) with a Canva links list.**

Current code renders a single `<a href={product.downloadUrl} download>` button.

New code should:
- Import `ExternalLink` from lucide-react instead of `Download`
- Replace the download `<a>` with a container showing a heading like "Your Canva Templates" followed by a list
- Each `canvaLink` renders as a clearly labeled link that opens in a new tab (`target="_blank" rel="noopener noreferrer"`)
- Style each link as a card/row with the link name, a Canva icon or ExternalLink icon, and the URL
- Update the helper text from "A download link has also been sent to {email}" to "These links have also been sent to {email}. Click each link to open the template in Canva."

Suggested JSX structure:
```tsx
{!isTemplate && product && (
  <motion.div variants={fadeInUp} className="mt-8 space-y-4">
    <h2 className="font-heading text-lg font-semibold text-foreground">
      Your Canva Templates
    </h2>
    <div className="space-y-3">
      {product.canvaLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
          )}
        >
          <span className="font-medium text-foreground">{link.name}</span>
          <ExternalLink size={18} className="text-primary" />
        </a>
      ))}
    </div>
    <p className="text-center text-sm text-muted-foreground">
      These links have also been sent to {email}. Click each link to open the template in Canva.
    </p>
  </motion.div>
)}
```

---

### 3. `/src/app/products/[slug]/product-detail-content.tsx` — Product Detail Page

**A. Update `howItWorks` array (lines 94-113):**

Change step 2:
- Title: "Download" → "Get Your Links"
- Description: "Receive instant access to your templates via email after payment." → "Receive your Canva template links instantly after payment."
- Icon: `Download` → `ExternalLink` (import from lucide-react)

Change step 3:
- Title: "Customize" (keep)
- Description: "Open in Canva, customize to match your brand, and start using right away." → "Click any link to open it in Canva, customize colors, fonts, and images to match your brand, and start using right away."

**B. Update `faqs` array (lines 71-92):**

FAQ 1 — "What format are the files in?":
- Change question to: "How do I access my templates?"
- Change answer to: "After purchase, you'll receive a set of Canva template links. Simply click any link and a copy of the template will be added to your Canva account, ready to edit."

FAQ 4 — "Is there a refund policy?":
- Change "once the templates have been accessed" to "once the template links have been delivered" (minor wording fix)

**C. Remove the `Download` import from lucide-react (line 10), add `ExternalLink`.**

---

### 4. `/src/app/checkout/page.tsx` — Checkout Page Copy

**Line 258:** Change:
```
"You'll receive an instant download link after payment."
```
to:
```
"You'll receive your Canva template links instantly after payment."
```

---

### 5. `/src/app/products/page.tsx` — Products Listing Page

**Line 49:** Change:
```
"Instant download after purchase."
```
to:
```
"Instant access after purchase."
```

---

### 6. `/src/app/services/page.tsx` — Services Page

**Line 69:** Change:
```
"Instant digital download"
```
to:
```
"Instant Canva template access"
```

---

### 7. `/src/components/sections/services-overview.tsx` — Homepage Services Section

**Line 36:** Change:
```
"Brand kits, social media templates, content planners, and more. Download instantly and start building your brand today."
```
to:
```
"Brand kits, social media templates, content planners, and more. Get instant Canva template access and start building your brand today."
```

---

### 8. `/src/app/faq/page.tsx` — Site-Wide FAQ

**Line 53-54:** Change the answer for "What happens after I buy a template?" from:
```
"After purchase, you'll receive the template files via email or a secure download link..."
```
to:
```
"After purchase, you'll receive Canva template links via email. Click any link to add a copy of the template to your Canva account. We also provide a setup guide and are available to answer any questions you have during implementation. If you need help getting set up, our team is just a WhatsApp message away."
```

---

### 9. `/src/app/terms/page.tsx` — Terms & Conditions

**Lines 60-61:** Change:
```
"Website templates are delivered digitally via email or a download link once payment has been confirmed."
```
to:
```
"Digital products are delivered via Canva template links sent to your email once payment has been confirmed."
```

---

### 10. Delete PDF Files

Remove the following 4 files from `/public/downloads/`:
- `social-media-template-pack.pdf`
- `brand-identity-starter-kit.pdf`
- `website-content-planner.pdf`
- `complete-business-launch-bundle.pdf`

The `/public/downloads/` directory can be removed entirely.

---

## Implementation Order

1. **`/src/data/products.ts`** — Change the data model first since other files import `Product`
2. **`/src/app/checkout/success/page.tsx`** — Core delivery change (biggest functional impact)
3. **`/src/app/products/[slug]/product-detail-content.tsx`** — How It Works + FAQ updates
4. **`/src/app/checkout/page.tsx`** — One-line copy fix
5. **`/src/app/products/page.tsx`** — One-line copy fix
6. **`/src/app/services/page.tsx`** — One-line copy fix
7. **`/src/components/sections/services-overview.tsx`** — One-line copy fix
8. **`/src/app/faq/page.tsx`** — One-line copy fix
9. **`/src/app/terms/page.tsx`** — One-line copy fix
10. **Delete PDFs** from `/public/downloads/`

## Potential Issues

- **TypeScript compilation**: After changing the `Product` interface, any file that references `downloadUrl` will produce a compile error. The grep search shows only `success/page.tsx` accesses `product.downloadUrl` directly, so fixing that file resolves it.
- **Bundle product**: The bundle's `canvaLinks` array should aggregate all links from the three individual products plus its bonus items. This makes it the longest array (~12-13 links). Consider grouping them visually on the success page with subheadings, or just listing them flat since clear names will suffice.
- **Placeholder URLs**: All Canva URLs will use `"https://www.canva.com/design/YOUR-TEMPLATE-ID/view"` as a placeholder. The site owner replaces these with real share links later. Each link should have a descriptive `name` so the owner knows which template goes where.
