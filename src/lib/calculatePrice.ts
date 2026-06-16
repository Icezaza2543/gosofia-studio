// ─── Commission Price Calculator ───
// Source: docs/gosofia-requirements.md sections 6 and 7
//
// PRICING ORDER (as approved):
//   1. artSubtotal = base + additionalCharacters + complexity + background
//   2. adultFee = artSubtotal * 0.2 (if adult option selected)
//   3. live2dFee = artSubtotal * 0.5 (if live2D selected, not for Vtuber type)
//   4. adjustedArt = artSubtotal + adultFee + live2dFee
//   5. commercialFee applies to adjustedArt: adjustedArt * (COMMERCIAL_MULTIPLIER - 1)
//   6. flatFees = rush + sourceFile + rigging + extraParts
//   7. total = (adjustedArt + commercialFee) + flatFees
//
// NOTE: These pricing rules can be adjusted after artist review.

import {
  workTypes,
  complexityOptions,
  backgroundOptions,
  rushOptions,
  ADULT_RATE,
  LIVE2D_RATE,
  COMMERCIAL_MULTIPLIER,
  SOURCE_FILE_PRICE,
  RIGGING_BASE_PRICE,
  EXTRA_PARTS_PRICE,
  MINIMUM_DEPOSIT,
  RANGE_LOW_FACTOR,
  RANGE_HIGH_FACTOR,
  type WorkTypeConfig,
} from '../data/pricing';

export interface CalculatorInput {
  workTypeId: string;
  colorMode: 'bw' | 'color';
  characterCount: number;
  complexityId: string;
  backgroundId: string;
  isCommercial: boolean;
  isAdult: boolean;
  adultConfirmed: boolean;
  isLive2D: boolean;
  rushId: string;
  wantSourceFile: boolean;
  wantRigging: boolean;
  extraPartsCount: number;
  depositAmount: number;
}

export interface BreakdownItem {
  label: string;
  amount: number;
}

export interface PriceResult {
  workType: WorkTypeConfig;
  base: number;
  characterFee: number;
  complexityFee: number;
  backgroundFee: number;
  artSubtotal: number;
  adultFee: number;
  live2dFee: number;
  adjustedArt: number;
  commercialFee: number;
  rushFee: number;
  sourceFileFee: number;
  riggingFee: number;
  extraPartsFee: number;
  flatFees: number;
  total: number;
  low: number;
  high: number;
  deposit: number;
  balance: number;
  breakdown: BreakdownItem[];
  /** Labels for the brief */
  labels: {
    workType: string;
    colorMode: string;
    complexity: string;
    background: string;
    rush: string;
  };
}

export function calculatePrice(input: CalculatorInput): PriceResult {
  // ─── Step 0: Resolve configs ───
  const workType = workTypes.find((w) => w.id === input.workTypeId) ?? workTypes[0];
  const complexity = complexityOptions.find((c) => c.id === input.complexityId) ?? complexityOptions[1];
  const background = backgroundOptions.find((b) => b.id === input.backgroundId) ?? backgroundOptions[0];
  const rush = rushOptions.find((r) => r.id === input.rushId) ?? rushOptions[0];

  // ─── Step 1: Art subtotal ───
  // base = work type price for selected color mode
  const base = (input.colorMode === 'bw' && workType.bw !== null)
    ? workType.bw
    : workType.color;

  // Additional characters cost the same base price per character
  const characterCount = Math.max(1, Math.min(6, input.characterCount));
  const characterFee = (characterCount - 1) * base;

  // Complexity: flat surcharge
  const complexityFee = complexity.surcharge;

  // Background: flat surcharge (null means unavailable, treat as 0)
  const backgroundFee = background.surcharge ?? 0;

  // artSubtotal = base + additionalCharacters + complexity + background
  const artSubtotal = base + characterFee + complexityFee + backgroundFee;

  // ─── Step 2: Adult fee (+20% of artSubtotal) ───
  const adultFee = (input.isAdult && workType.adultAvailable)
    ? Math.round(artSubtotal * ADULT_RATE)
    : 0;

  // ─── Step 3: Live2D part separation (+50% of artSubtotal) ───
  // Not applicable if work type is already Vtuber (includes basic separation)
  const live2dFee = (input.isLive2D && workType.id !== 'vtuber')
    ? Math.round(artSubtotal * LIVE2D_RATE)
    : 0;

  // ─── Step 4: Adjusted artwork total ───
  const adjustedArt = artSubtotal + adultFee + live2dFee;

  // ─── Step 5: Commercial fee (x2 means we add 1x more) ───
  const commercialFee = input.isCommercial
    ? Math.round(adjustedArt * (COMMERCIAL_MULTIPLIER - 1))
    : 0;

  // ─── Step 6: Flat fees ───
  const rushFee = rush.surcharge ?? 0;
  const sourceFileFee = (input.wantSourceFile && workType.id === 'vtuber')
    ? SOURCE_FILE_PRICE
    : 0;
  const riggingFee = input.wantRigging ? RIGGING_BASE_PRICE : 0;
  const extraPartsFee = Math.max(0, input.extraPartsCount) * EXTRA_PARTS_PRICE;
  const flatFees = rushFee + sourceFileFee + riggingFee + extraPartsFee;

  // ─── Step 7: Total ───
  const total = adjustedArt + commercialFee + flatFees;

  // ─── Price range estimation ───
  const low = Math.max(0, Math.round((total * (1 - RANGE_LOW_FACTOR)) / 10) * 10);
  const high = Math.round((total * (1 + RANGE_HIGH_FACTOR)) / 10) * 10;

  // ─── Deposit calculation ───
  const deposit = Math.min(total, Math.max(MINIMUM_DEPOSIT, input.depositAmount));
  const balance = Math.max(0, total - deposit);

  // ─── Build breakdown ───
  const breakdown: BreakdownItem[] = [];
  const colorLabel = (input.colorMode === 'bw' && workType.hasColorChoice) ? 'B/W' : 'Full Color';

  breakdown.push({ label: `${workType.label} / ${colorLabel}`, amount: base });
  if (characterFee > 0) breakdown.push({ label: `ตัวละครเพิ่ม ×${characterCount - 1}`, amount: characterFee });
  if (complexityFee > 0) breakdown.push({ label: `ดีเทล ${complexity.labelTh}`, amount: complexityFee });
  if (backgroundFee > 0) breakdown.push({ label: background.labelTh, amount: backgroundFee });
  if (adultFee > 0) breakdown.push({ label: 'เนื้อหาสำหรับผู้ใหญ่ (+20%)', amount: adultFee });
  if (live2dFee > 0) breakdown.push({ label: 'แยกพาร์ต Live2D (+50%)', amount: live2dFee });
  if (commercialFee > 0) breakdown.push({ label: 'สิทธิ์เชิงพาณิชย์ (×2)', amount: commercialFee });
  if (rushFee > 0) breakdown.push({ label: rush.labelTh, amount: rushFee });
  if (sourceFileFee > 0) breakdown.push({ label: 'ไฟล์ PSD / Source File', amount: sourceFileFee });
  if (riggingFee > 0) breakdown.push({ label: 'Rigging', amount: riggingFee });
  if (extraPartsFee > 0) breakdown.push({ label: `ชิ้นส่วนเพิ่ม ×${input.extraPartsCount}`, amount: extraPartsFee });

  return {
    workType,
    base,
    characterFee,
    complexityFee,
    backgroundFee,
    artSubtotal,
    adultFee,
    live2dFee,
    adjustedArt,
    commercialFee,
    rushFee,
    sourceFileFee,
    riggingFee,
    extraPartsFee,
    flatFees,
    total,
    low,
    high,
    deposit,
    balance,
    breakdown,
    labels: {
      workType: workType.label,
      colorMode: colorLabel,
      complexity: complexity.labelTh,
      background: background.labelTh,
      rush: rush.labelTh,
    },
  };
}
