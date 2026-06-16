// ─── Portfolio Data ───
// Source: docs/gosofia-requirements.md section 5.4
//
// IMPORTANT: Adult-category items use local preview assets only.
// Original asset URLs are NOT included in client-facing code.

export interface PortfolioItem {
  id: string;
  title: string;
  category: string[];
  description: string;
  /** Local image path under /images/portfolio/ */
  image: string;
  /** Whether this item contains adult content */
  isAdult: boolean;
  /** Whether cropping is allowed (false = use object-fit: contain) */
  allowCrop: boolean;
  /** Whether watermark should be displayed */
  watermark: boolean;
  /** Whether the artist has rights to display this */
  canShow: boolean;
}

/** Available filter categories */
export const portfolioFilters = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'sfw', label: 'SFW' },
  { id: 'adult', label: '18+' },
  { id: 'character', label: 'Character Art' },
  { id: 'vtuber', label: 'Vtuber Model' },
  { id: 'chibi', label: 'Chibi' },
  { id: 'merch', label: 'Dakimakura / Merch' },
  { id: 'sketch', label: 'Sketch' },
] as const;

export const portfolio: PortfolioItem[] = [
  {
    id: 'item-01',
    title: 'Lucene',
    category: ['sfw', 'character'],
    description: 'แฟนอาร์ทคุณเน่ น่ารักมากเลยนะ~',
    image: '/images/portfolio/01-lucene.png',
    isAdult: false,
    allowCrop: false,
    watermark: false,
    canShow: true,
  },
  {
    id: 'item-02',
    title: 'ปกโดจิน Leah',
    category: ['sfw', 'character'],
    description: 'ปกโดจินคุณลีอาห์ หมอดูที่เซ็กซี่มาก ๆ เลยนะ~',
    image: '/images/portfolio/02-leah-cover.png',
    isAdult: false,
    allowCrop: false,
    watermark: false,
    canShow: true,
  },
  {
    id: 'item-03',
    title: 'Marine Chariot',
    category: ['sfw', 'character'],
    description: 'แฟนอาร์ทคุณหนูมารีน สุดยอดที่สุดเลยนะ!',
    image: '/images/portfolio/03-marine-chariot.png',
    isAdult: false,
    allowCrop: false,
    watermark: false,
    canShow: true,
  },
  {
    id: 'item-04',
    title: 'Halloween Commission',
    category: ['adult'],
    description: 'งาน Commission ธีมฮาโลวีน',
    image: '/images/portfolio/04-adult-preview-01.png',
    isAdult: true,
    allowCrop: false,
    watermark: false,
    canShow: true,
  },
  {
    id: 'item-05',
    title: 'Gosofia',
    category: ['sfw', 'character'],
    description: 'คุณโก นักวาดเองค่ะ~',
    image: '/images/portfolio/05-gosofia.png',
    isAdult: false,
    allowCrop: false,
    watermark: false,
    canShow: true,
  },
  {
    id: 'item-06',
    title: 'ปกโดจิน Kumazaki Mayu',
    category: ['sfw', 'character'],
    description: 'ปกโดจินของคุณ Kumazaki Mayu',
    image: '/images/portfolio/06-doujin-cover.png',
    isAdult: false,
    allowCrop: false,
    watermark: false,
    canShow: true,
  },
  {
    id: 'item-07',
    title: 'Doujin Cover Commission',
    category: ['adult'],
    description: 'งาน Commission ปกโดจิน',
    image: '/images/portfolio/07-adult-preview-02.png',
    isAdult: true,
    allowCrop: false,
    watermark: false,
    canShow: true,
  },
  {
    id: 'item-08',
    title: 'Summer Bonus Art',
    category: ['adult'],
    description: 'โบนัสอาร์ทในโดจิน',
    image: '/images/portfolio/08-adult-preview-03.png',
    isAdult: true,
    allowCrop: false,
    watermark: false,
    canShow: true,
  },
];
