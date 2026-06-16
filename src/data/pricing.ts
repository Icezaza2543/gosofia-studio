// ─── Pricing Configuration ───
// Source: docs/gosofia-requirements.md sections 6 and 7
//
// NOTE: All prices in Thai Baht (THB).
// These pricing rules can be adjusted after artist review.

export interface WorkTypeConfig {
  id: string;
  label: string;
  labelTh: string;
  /** Base price for B/W, null if not available */
  bw: number | null;
  /** Base price for Full Color */
  color: number;
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
    color: 450,
    hasColorChoice: true,
    adultAvailable: true,
    estimatedDays: [5, 7],
  },
  {
    id: 'halfbody',
    label: 'Half Body / Thigh Up',
    labelTh: 'ครึ่งตัว / เหนือเข่า',
    bw: 700,
    color: 900,
    hasColorChoice: true,
    adultAvailable: true,
    estimatedDays: [10, 15],
  },
  {
    id: 'fullbody',
    label: 'Full Body',
    labelTh: 'เต็มตัว',
    bw: 1000,
    color: 1200,
    hasColorChoice: true,
    adultAvailable: true,
    estimatedDays: [15, 20],
  },
  {
    id: 'chibi',
    label: 'Chibi',
    labelTh: 'ชิบิ',
    bw: null,
    color: 800,
    hasColorChoice: false,
    // Configurable: set to false to disable adult option for Chibi
    adultAvailable: true,
    estimatedDays: [5, 10],
  },
  {
    id: 'vtuber',
    label: 'Vtuber Model',
    labelTh: 'โมเดลวีทูเบอร์',
    bw: null,
    color: 4000,
    hasColorChoice: false,
    adultAvailable: true,
    estimatedDays: [30, 60],
  },
  {
    id: 'merch',
    label: 'Merch / Pillowcase / Dakimakura',
    labelTh: 'สินค้า / ปลอกหมอน / ดากิมากุระ',
    bw: null,
    color: 2000,
    hasColorChoice: false,
    adultAvailable: true,
    estimatedDays: [15, 20],
  },
];

export interface ComplexityOption {
  id: string;
  label: string;
  labelTh: string;
  /** Flat surcharge amount in THB */
  surcharge: number;
}

export const complexityOptions: ComplexityOption[] = [
  { id: 'simple', label: 'Simple', labelTh: 'เรียบง่าย', surcharge: 0 },
  { id: 'normal', label: 'Normal', labelTh: 'ปกติ', surcharge: 0 },
  { id: 'detailed', label: 'Detailed', labelTh: 'ละเอียด', surcharge: 200 },
  { id: 'extra', label: 'Extra Detailed', labelTh: 'ละเอียดมาก', surcharge: 500 },
];

export interface BackgroundOption {
  id: string;
  label: string;
  labelTh: string;
  /** Flat surcharge amount in THB, null if unavailable */
  surcharge: number | null;
}

export const backgroundOptions: BackgroundOption[] = [
  { id: 'none', label: 'None / Flat Color', labelTh: 'ไม่มี / สีพื้น', surcharge: 0 },
  { id: 'simple', label: 'Simple', labelTh: 'ฉากง่าย', surcharge: 500 },
  { id: 'medium', label: 'Medium', labelTh: 'ฉากปานกลาง', surcharge: 1000 },
  { id: 'detailed', label: 'Detailed', labelTh: 'ฉากละเอียด (ไม่รับ)', surcharge: null },
];

export interface RushOption {
  id: string;
  label: string;
  labelTh: string;
  /** Flat surcharge in THB, null if unavailable */
  surcharge: number | null;
}

export const rushOptions: RushOption[] = [
  { id: 'normal', label: 'Normal Queue', labelTh: 'คิวปกติ', surcharge: 0 },
  { id: 'rush7', label: '7 Days Rush', labelTh: 'เร่ง 7 วัน', surcharge: 500 },
  { id: 'rush3', label: '3 Days Rush', labelTh: 'เร่ง 3 วัน', surcharge: 1000 },
  { id: 'rush24', label: '24-48 Hours', labelTh: '24-48 ชม. (ไม่รับ)', surcharge: null },
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

/** Source file / PSD — only available for Vtuber model */
export const SOURCE_FILE_PRICE = 4000;

/** Rigging add-on base price */
export const RIGGING_BASE_PRICE = 3000;

/** Extra model parts / hair / outfit starting price */
export const EXTRA_PARTS_PRICE = 300;

/** Minimum deposit in THB */
export const MINIMUM_DEPOSIT = 300;

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
