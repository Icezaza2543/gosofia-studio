# Gosofia Studio

Official artist portfolio and commission website for **Gosofia Studio**.

This repository is for building a clean, responsive portfolio website for an independent artist. The site will showcase artwork, explain commission details, provide a commission price calculator, and guide clients toward sending a clear inquiry brief.

## Project Goals

* Build a professional artist portfolio website.
* Display artwork in organized categories.
* Provide a commission pricing calculator for initial estimates.
* Explain commission terms, workflow, payment rules, and usage rights.
* Create a clear contact / inquiry flow for potential clients.
* Handle adult-category artwork safely with preview protection and clear policy boundaries.

## Main Website Sections

### 1. Home

The landing page should introduce Gosofia Studio, communicate the artist's style, and guide visitors toward the main actions.

Primary actions:

* View portfolio
* Calculate commission price
* Read commission terms
* Contact the artist

### 2. Portfolio

The portfolio should display artwork in a clean gallery layout with filters.

Suggested categories:

* Character Art
* Head Shot
* Half Body
* Full Body
* Vtuber Model
* Live2D Parts
* Merch Artwork
* Style Sheet
* Adult-category preview

Portfolio requirements:

* Responsive gallery layout
* Category filters
* Lightbox or preview modal
* Optional watermark support
* Adult-category artwork should be blurred by default
* Adult-category artwork should not appear directly on the homepage
* Visitors should confirm eligibility before opening adult-category previews

### 3. Commission Calculator

The calculator should help clients estimate commission pricing before contacting the artist.

Pricing factors may include:

* Work type
* Color mode
* Number of characters
* Character detail / complexity
* Background type
* Usage rights
* Commercial use
* Rush deadline
* Revision count
* Source file / PSD option
* Live2D part separation
* Adult-category surcharge or policy guard, if applicable

The calculator result should include:

* Estimated total price
* Price range after final brief review
* Price breakdown
* Timeline fields
* Payment summary
* Copyable inquiry brief

### 4. Terms & Commission Flow

This section should explain how commission work is handled.

Suggested topics:

* Commission process
* Payment and deposit rules
* Revision policy
* Cancellation / refund policy
* Personal use vs commercial use
* Source file rules
* Portfolio posting rights
* Private commission rules
* Content policy
* Work types not accepted

### 5. Contact / Inquiry Flow

Recommended MVP flow:

1. Client uses the commission calculator.
2. Client copies the generated brief.
3. Client sends the brief through the artist's preferred contact channel.

Possible contact channels:

* X / Twitter
* Facebook
* Discord
* Email
* Google Form
* VGen / Ko-fi / other commission platform

A backend form is not required for the first version unless requested later.

## Adult-Category Safety Rules

This project may include adult-category commission information or artwork previews. The website should handle this carefully and professionally.

Rules for the public site:

* Do not show adult-category artwork directly on the homepage.
* Use safe preview images or blurred previews by default.
* Require confirmation before opening adult-category portfolio previews.
* Keep policy wording clear and non-graphic.
* State that adult-category commissions are limited to clearly adult characters only.
* The artist may reject unclear or risky briefs.

## Suggested Tech Stack

Recommended stack for the MVP:

* Astro
* TypeScript
* Static data files for portfolio and pricing
* CSS or Tailwind CSS
* Vercel / Netlify / Cloudflare Pages for deployment

Why Astro:

* Good for portfolio websites
* Fast static output
* SEO friendly
* Easy to deploy
* Works well with mostly static content and a small interactive calculator

## Suggested Project Structure

```txt
gosofia-studio/
├─ public/
│  ├─ images/
│  │  ├─ portfolio/
│  │  └─ og-image.jpg
├─ src/
│  ├─ components/
│  │  ├─ Header.astro
│  │  ├─ Footer.astro
│  │  ├─ PortfolioGrid.astro
│  │  ├─ AgeGateModal.tsx
│  │  ├─ CommissionCalculator.tsx
│  │  └─ PriceBreakdown.tsx
│  ├─ data/
│  │  ├─ portfolio.ts
│  │  ├─ pricing.ts
│  │  ├─ terms.ts
│  │  └─ artist.ts
│  ├─ layouts/
│  │  └─ BaseLayout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ portfolio.astro
│  │  ├─ calculator.astro
│  │  ├─ terms.astro
│  │  └─ contact.astro
│  └─ styles/
│     └─ global.css
├─ package.json
└─ README.md
```

## Data Files

The website should keep editable content separate from UI code.

Recommended data files:

* `src/data/artist.ts` for artist profile, social links, and bio
* `src/data/portfolio.ts` for artwork items and categories
* `src/data/pricing.ts` for commission calculator rules
* `src/data/terms.ts` for commission terms and policy text

This makes future updates easier without rewriting components.

## MVP Scope

The first version should focus on these features:

* Responsive homepage
* Portfolio gallery with categories
* Commission calculator
* Terms page
* Contact section
* Adult-category preview handling
* Basic SEO metadata
* Deployment-ready build

Out of scope for the first version:

* User accounts
* Payment system
* Full backend dashboard
* Image upload CMS
* Order tracking system
* Real-time queue management

These can be added later after the core website is working.

## Codex Starting Prompt

Use this prompt when asking Codex to start the implementation:

```txt
This repository is for Gosofia Studio, an artist portfolio and commission website.

Please create an MVP website based on this README.

Tech preference:
Use Astro + TypeScript. Keep the website mostly static and easy to deploy.

Required pages:
- Home
- Portfolio
- Commission Calculator
- Terms
- Contact

Main requirements:
- Build a clean, responsive artist portfolio website.
- Use static data files for artist profile, portfolio items, pricing rules, and terms.
- Portfolio items should support categories and filtering.
- Adult-category portfolio items must be blurred by default and require confirmation before preview.
- Do not show adult-category artwork directly on the homepage.
- Build a commission pricing calculator with price breakdown and copyable inquiry brief.
- Keep policy wording clear, professional, and non-graphic.
- Make the site mobile friendly.
- Add SEO metadata and an Open Graph image placeholder.

After implementation:
- Add useful npm scripts.
- Make sure the project builds successfully.
- Update this README with setup, development, build, and deployment instructions.
```

## Development Notes

Recommended order:

1. Set up Astro project.
2. Create layout, header, footer, and global styles.
3. Create static data files.
4. Build homepage.
5. Build portfolio gallery.
6. Build commission calculator.
7. Build terms and contact pages.
8. Add adult-category preview handling.
9. Test mobile layout.
10. Deploy MVP.

## Repository Status

Initial planning stage.

Current priority:

* Prepare requirements
* Add reference mockup files
* Generate the first Astro MVP with Codex
