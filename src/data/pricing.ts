// ─── Pricing Configuration ───
// Source: docs/gosofia-requirements.md sections 6 and 7
//
// NOTE: All prices are explicitly configured in both Thai Baht (THB) and USD.
// These pricing rules can be adjusted after artist review.

export interface WorkTypeConfig {
  id: string;
  label: string;
  labelTh: string;
  /** Base price for B/W, null if not available */
  bw: number | null;
  bwUsd: number | null;
  /** Base price for Full Color */
  color: number;
  colorUsd: number;
  /** Whether color mode is selectable (false = full color only) */
  hasColorChoice: boolean;
  /** Whether adult-category option is available for this type */
  adultAvailable: boolean;
  /** Estimated working days [min, max] */
  estimatedDays: [number, number];
}

export const workTypes: WorkTypeConfig[] = [
  {
    id: 'headshot',
    label: 'Head Shot / Bust Up',
    labelTh: 'เฮดช็อต / ครึ่งตัวบน',
    bw: 400,
    bwUsd: 20,
    color: 450,
    colorUsd: 25,
    hasColorChoice: true,
    adultAvailable: true,
    estimatedDays: [5, 7],
  },
  {
    id: 'halfbody',
    label: 'Half Body / Thigh Up',
    labelTh: 'ครึ่งตัว / เหนือเข่า',
    bw: 700,
    bwUsd: 40,
    color: 900,
    colorUsd: 50,
    hasColorChoice: true,
    adultAvailable: true,
    estimatedDays: [10, 15],
  },
  {
    id: 'fullbody',
    label: 'Full Body',
    labelTh: 'เต็มตัว',
    bw: 1000,
    bwUsd: 50,
    color: 1200,
    colorUsd: 80,
    hasColorChoice: true,
    adultAvailable: true,
    estimatedDays: [15, 20],
  },
  {
    id: 'chibi',
    label: 'Chibi',
    labelTh: 'ชิบิ',
    bw: null,
    bwUsd: null,
    color: 800,
    colorUsd: 45,
    hasColorChoice: false,
    adultAvailable: true,
    estimatedDays: [5, 10],
  },
  {
    id: 'vtuber',
    label: 'Vtuber Model',
    labelTh: 'โมเดลวีทูเบอร์',
    bw: null,
    bwUsd: null,
    color: 4000,
    colorUsd: 150,
    hasColorChoice: false,
    adultAvailable: true,
    estimatedDays: [30, 60],
  },
  {
    id: 'merch',
    label: 'Merch / Pillowcase / Dakimakura',
    labelTh: 'สินค้า / ปลอกหมอน / ดากิมากุระ',
    bw: null,
    bwUsd: null,
    color: 2000,
    colorUsd: 90,
    hasColorChoice: false,
    adultAvailable: true,
    estimatedDays: [15, 20],
  },
  {
    id: 'doujin',
    label: 'Doujin Commission',
    labelTh: 'รับวาดโดจิน',
    bw: null,
    bwUsd: null,
    color: null as any,
    colorUsd: null as any,
    hasColorChoice: false,
    adultAvailable: true,
    estimatedDays: [15, 45],
  },
];

export interface ComplexityOption {
  id: string;
  label: string;
  labelTh: string;
  /** Flat surcharge amount in THB */
  surcharge: number;
  surchargeUsd: number;
}

export const complexityOptions: ComplexityOption[] = [
  { id: 'simple', label: 'Simple', labelTh: 'เรียบง่าย', surcharge: 0, surchargeUsd: 0 },
  { id: 'normal', label: 'Normal', labelTh: 'ปกติ', surcharge: 0, surchargeUsd: 0 },
  { id: 'detailed', label: 'Detailed', labelTh: 'ละเอียด', surcharge: 200, surchargeUsd: 7 },
  { id: 'extra', label: 'Extra Detailed', labelTh: 'ละเอียดมาก', surcharge: 500, surchargeUsd: 15 },
];

export interface BackgroundOption {
  id: string;
  label: string;
  labelTh: string;
  /** Flat surcharge amount in THB, null if unavailable */
  surcharge: number | null;
  surchargeUsd: number | null;
}

export const backgroundOptions: BackgroundOption[] = [
  { id: 'none', label: 'None / Flat Color', labelTh: 'ไม่มี / สีพื้น', surcharge: 0, surchargeUsd: 0 },
  { id: 'simple', label: 'Simple', labelTh: 'ฉากง่าย', surcharge: 500, surchargeUsd: 15 },
  { id: 'medium', label: 'Medium', labelTh: 'ฉากปานกลาง', surcharge: 1000, surchargeUsd: 30 },
  { id: 'detailed', label: 'Detailed', labelTh: 'ฉากละเอียด (ไม่รับ)', surcharge: null, surchargeUsd: null },
];

export interface RushOption {
  id: string;
  label: string;
  labelTh: string;
  /** Flat surcharge in THB, null if unavailable */
  surcharge: number | null;
  surchargeUsd: number | null;
}

export const rushOptions: RushOption[] = [
  { id: 'normal', label: 'Normal Queue', labelTh: 'คิวปกติ', surcharge: 0, surchargeUsd: 0 },
  { id: 'rush7', label: '7 Days Rush', labelTh: 'เร่ง 7 วัน', surcharge: 500, surchargeUsd: 15 },
  { id: 'rush3', label: '3 Days Rush', labelTh: 'เร่ง 3 วัน', surcharge: 1000, surchargeUsd: 30 },
  { id: 'rush24', label: '24-48 Hours', labelTh: '24-48 ชม. (ไม่รับ)', surcharge: null, surchargeUsd: null },
];

// ─── Multiplier rates ───
// These can be adjusted after artist review.

/** NSFW/Adult surcharge: +20% of art subtotal */
export const ADULT_RATE = 0.2;

/** Live2D part separation: +50% of art subtotal */
export const LIVE2D_RATE = 0.5;

/** Commercial use multiplier: x2 of artwork subtotal */
export const COMMERCIAL_MULTIPLIER = 2;

// ─── Flat add-on prices ───

/** Doujin page price */
export const DOUJIN_PAGE_PRICE_THB = 450;
export const DOUJIN_PAGE_PRICE_USD = 15;

/** Source file / PSD — only available for Vtuber model */
export const SOURCE_FILE_PRICE = 4000;
export const SOURCE_FILE_PRICE_USD = 125;

/** Rigging add-on base price */
export const RIGGING_BASE_PRICE = 3000;
export const RIGGING_BASE_PRICE_USD = 93;

/** Extra model parts / hair / outfit starting price */
export const EXTRA_PARTS_PRICE = 300;
export const EXTRA_PARTS_PRICE_USD = 10;

/** Minimum deposit */
export const MINIMUM_DEPOSIT = 300;
export const MINIMUM_DEPOSIT_USD = 10;

// ─── Payment methods ───
export const paymentMethods = [
  { id: 'stripe', label: 'Stripe (PromptPay / บัตรเครดิต)', labelTh: 'Stripe (PromptPay / ตัดบัตร)' },
  { id: 'wise', label: 'Wise', labelTh: 'Wise' },
  { id: 'kofi', label: 'Ko-fi', labelTh: 'Ko-fi' },
];

// ─── Price range estimation ───
/** Range factor: total × (1 - RANGE_LOW) to total × (1 + RANGE_HIGH) */
export const RANGE_LOW_FACTOR = 0.1; // -10%
export const RANGE_HIGH_FACTOR = 0.15; // +15%
