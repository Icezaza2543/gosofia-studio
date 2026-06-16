# Gosofia Studio

<p align="center">
  <img src="./public/images/og/og-image.png" alt="Gosofia Studio preview" width="860" />
</p>

<p align="center">
  <strong>Artist portfolio, commission pricing, and client brief experience for Gosofia / โกโซเฟีย.</strong>
</p>

<p align="center">
  A soft, polished, bilingual website made for an illustrator who turns characters, fan art, Vtuber ideas, merch concepts, and commission dreams into finished artwork.
</p>

<p align="center">
  <a href="https://astro.build/"><img src="https://img.shields.io/badge/Astro-0C151C?style=for-the-badge&logo=astro&logoColor=white" alt="Astro" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <a href="https://vercel.com/icezaza2543s-projects/gosofia-artwork/deployments"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
</p>

---

## Overview

Gosofia Studio is a public-facing portfolio and commission website for the artist Gosofia. It is designed to feel welcoming to clients while still giving them the practical tools they need before reaching out: portfolio browsing, pricing guidance, Terms of Service, FAQ, and an interactive commission calculator that turns selections into a copyable brief.

The site balances two needs:

- **For visitors and clients**: browse artwork, understand commission options, estimate budget, and prepare a clear brief.
- **For the artist and maintainer**: keep content static, easy to update, production-safe, and protected from unauthorized reuse.

## Experience

- **Portfolio gallery**  
  Showcases selected works with local production-safe image paths.

- **Adult-content handling**  
  Adult-category artwork remains blurred by default and requires an age gate before preview.

- **Featured works**  
  Homepage highlights SFW works only, using a responsive featured grid.

- **Commission calculator**  
  Calculates estimated pricing from work type, color mode, character count, complexity, background, add-ons, rush options, commercial usage, Live2D separation, adult-content policy, and deposit.

- **Copyable client brief**  
  Generates a structured brief clients can paste into Discord, X/Twitter, email, or another contact channel.

- **Bilingual interface**  
  Thai and English language toggle, including calculator text, generated brief text, price labels, and currency display.

- **Dual-Currency pricing**  
  Thai mode uses THB. English mode displays explicit, non-converted USD prices configured directly in `src/data/pricing.ts`.

- **Terms and FAQ**  
  Clear support pages for commission process, payment, revisions, usage rights, artist rights, adult-content policy, and common client questions.

## Visual Assets

Production image assets live under `public/images` and are referenced with lowercase English filenames.

```txt
public/images/
  brand/
    logo-gosofia.png
    watermark-gosofia.png
  hero/
    hero.png
  og/
    og-image.png
  portfolio/
    01-lucene.png
    02-leah-cover.png
    03-marine-chariot.png
    04-adult-preview-01.png
    05-gosofia.png
    06-doujin-cover.png
    07-adult-preview-02.png
    08-adult-preview-03.png
  status/
    commission-open.png
```

Important notes:

- Do not hotlink Google Drive, Wix, or other external image hosts in production code.
- Do not use Thai filenames, spaces, or special characters for production image paths.
- Do not use adult-category artwork for homepage featured works or Open Graph metadata.
- Keep artwork display respectful: portfolio images use no-crop presentation by default.

## Tech Stack

| Layer | Tooling |
| --- | --- |
| Framework | Astro |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Build output | Static site |
| Deployment target | Vercel or any static host |

## Project Structure

```txt
src/
  components/       UI components and interactive sections
  data/             Static artist, pricing, portfolio, i18n, FAQ, and terms data
  layouts/          Shared document layout and metadata
  lib/              Calculator, brief builder, currency formatting helpers
  pages/            Astro routes
  styles/           Global theme and utility styles

public/
  images/           Local production image assets
  favicon.svg
  robots.txt
```

Key files:

- `src/data/artist.ts` — artist profile and commission status
- `src/data/portfolio.ts` — portfolio entries and adult-content flags
- `src/data/pricing.ts` — commission pricing configuration
- `src/data/i18n.ts` — Thai and English UI copy
- `src/lib/calculatePrice.ts` — pricing calculation logic
- `src/lib/buildBrief.ts` — copyable commission brief generation
- `src/lib/formatMoney.ts` — THB and USD display formatting

## Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Content Updates

Most site content is intentionally static and stored in TypeScript files:

- Update artist profile in `src/data/artist.ts`.
- Update pricing rules in `src/data/pricing.ts`.
- Update portfolio entries in `src/data/portfolio.ts`.
- Update Thai/English copy in `src/data/i18n.ts`.
- Update Terms of Service in `src/data/terms.ts`.
- Update FAQ content in `src/data/faq.ts`.

For portfolio assets, add optimized local files to `public/images/portfolio/` and reference them as `/images/portfolio/file-name.png`.

## Adult Content Policy

This project includes adult-category portfolio previews. To keep the site safe and intentional:

- Adult items are flagged with `isAdult: true`.
- Adult images are blurred by default.
- Adult previews require age confirmation.
- Adult items are excluded from homepage featured works.
- Adult images are not used for Open Graph metadata.

## Build Checklist

Before publishing meaningful changes:

```bash
npm run build
```

Recommended checks:

- Homepage loads and featured works remain SFW.
- Portfolio grid keeps adult images blurred by default.
- Age gate opens before adult previews.
- TH/EN language toggle updates calculator text and generated brief text.
- TH mode displays THB; EN mode displays USD.
- No external hotlinked artwork is introduced.

## Credits

- **Artist / brand / artwork**: Gosofia / โกโซเฟีย
- **Website source code and implementation**: Icezaza Ch
- **Framework and tooling**: Astro, Tailwind CSS, TypeScript, and the open-source ecosystem

## License & Copyright

This repository is public for transparency and deployment only. It is not open source.

All rights are reserved. No permission is granted to copy, modify, redistribute, reuse, sublicense, sell, host, deploy, scrape, train on, or create derivative works from this repository, its source code, its design, its content, its images, or any other project asset unless separate written permission is granted by the relevant rights holder.

- Website source code and implementation: Copyright © Icezaza Ch. All rights reserved.
- Artwork, portfolio images, artist branding, commission samples, and Gosofia-related content: Copyright © Gosofia / โกโซเฟีย and/or respective rights holders. All rights reserved.
- Third-party dependencies remain under their own licenses.

See [`LICENSE`](./LICENSE) for the full proprietary license and copyright notice.
