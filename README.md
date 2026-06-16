# Gosofia Studio MVP

Interactive commission calculator, pricing, and portfolio website for Gosofia.

## Tech Stack
- Framework: [Astro](https://astro.build/)
- UI/Styling: [Tailwind CSS v4](https://tailwindcss.com/)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Deployment: [Vercel](https://vercel.com/) (Static)

## Features
- **Portfolio**: SFW items shown publicly. Adult content requires an age-gate confirmation modal and is blurred by default.
- **Calculator**: Interactive commission calculator with logic defined per requirements (base + character + complexity + background + adult/live2d + flat rates + commercial). Generates copyable briefs.
- **Pricing**: Clear table structure with base prices and estimated turnaround times.
- **TOS & FAQ**: Clean layouts for terms of service and frequent questions.

## Setup & Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

## Content Management

Since there is no database in the MVP, all data is stored statically in TypeScript files:

- `src/data/artist.ts`: Bio, name, email.
- `src/data/pricing.ts`: Pricing structure, base prices, flat rate add-ons, and multipliers.
- `src/data/portfolio.ts`: Portfolio items (both SFW and 18+). Add local images to `public/images/portfolio/`.
- `src/data/terms.ts`: Terms of service content.
- `src/data/faq.ts`: FAQ content.

**Important regarding 18+ content**: Do not put explicit Google Drive links or original URLs inside `src/data/portfolio.ts`. It will be publicly visible in source code. Download the images, downsize them, and put them inside `public/images/portfolio/`.

## Author
Gosofia (โกโซเฟีย)

## License & Copyright

This repository is public for transparency and deployment only. It is not open source.

All rights are reserved. No permission is granted to copy, modify, redistribute, reuse, sublicense, sell, host, deploy, scrape, train on, or create derivative works from this repository, its source code, its design, its content, its images, or any other project asset unless separate written permission is granted by the relevant rights holder.

- Website source code and implementation: Copyright © Icezaza Ch. All rights reserved.
- Artwork, portfolio images, artist branding, commission samples, and Gosofia-related content: Copyright © Gosofia / โกโซเฟีย and/or respective rights holders. All rights reserved.
- Third-party dependencies remain under their own licenses.

See [`LICENSE`](./LICENSE) for the full proprietary license and copyright notice.
