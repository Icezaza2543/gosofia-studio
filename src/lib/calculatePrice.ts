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
  DOUJIN_PAGE_PRICE_THB,
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
  // Doujin-specific
  doujinPages: number;
  wantCover: boolean;
  coverScaleId: string;
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

export type PriceLanguage = 'th' | 'en';

function labelFor(
  item: { label: string; labelTh: string },
  lang: PriceLanguage,
): string {
  return lang === 'en' ? item.label : item.labelTh;
}

export function calculatePrice(input: CalculatorInput, lang: PriceLanguage = 'th'): PriceResult {
  if (input.workTypeId === 'doujin') {
    return calculateDoujinPrice(input, lang);
  }
  return calculateIllustrationPrice(input, lang, { includeGlobalModifiers: true });
}

export function calculateIllustrationPrice(
  input: CalculatorInput, 
  lang: PriceLanguage, 
  options: { includeGlobalModifiers: boolean }
): PriceResult {
  // ─── Step 0: Resolve configs ───
  const workType = workTypes.find((w) => w.id === input.workTypeId) ?? workTypes[0];
  const complexity = complexityOptions.find((c) => c.id === input.complexityId) ?? complexityOptions[1];
  const background = backgroundOptions.find((b) => b.id === input.backgroundId) ?? backgroundOptions[0];
  const rush = rushOptions.find((r) => r.id === input.rushId) ?? rushOptions[0];

  // ─── Step 1: Art subtotal ───
  const base = lang === 'en'
    ? (input.colorMode === 'bw' && workType.bwUsd !== null ? workType.bwUsd : workType.colorUsd)
    : (input.colorMode === 'bw' && workType.bw !== null ? workType.bw : workType.color);

  const characterCount = Math.max(1, Math.min(6, input.characterCount));
  const characterFee = (characterCount - 1) * base;
  const complexityFee = lang === 'en' ? complexity.surchargeUsd : complexity.surcharge;
  const backgroundFee = lang === 'en' ? (background.surchargeUsd ?? 0) : (background.surcharge ?? 0);
  const artSubtotal = base + characterFee + complexityFee + backgroundFee;

  let adultFee = 0;
  let live2dFee = 0;
  let commercialFee = 0;
  let rushFee = 0;
  let sourceFileFee = 0;
  let riggingFee = 0;
  let extraPartsFee = 0;

  if (options.includeGlobalModifiers) {
    adultFee = (input.isAdult && workType.adultAvailable) ? Math.round(artSubtotal * ADULT_RATE) : 0;
    live2dFee = (input.isLive2D && workType.id !== 'vtuber') ? Math.round(artSubtotal * LIVE2D_RATE) : 0;
    const adjustedArt = artSubtotal + adultFee + live2dFee;
    commercialFee = input.isCommercial ? Math.round(adjustedArt * (COMMERCIAL_MULTIPLIER - 1)) : 0;
    
    rushFee = lang === 'en' ? (rush.surchargeUsd ?? 0) : (rush.surcharge ?? 0);
    sourceFileFee = (input.wantSourceFile && workType.id === 'vtuber') ? (lang === 'en' ? SOURCE_FILE_PRICE_USD : SOURCE_FILE_PRICE) : 0;
    riggingFee = input.wantRigging ? (lang === 'en' ? RIGGING_BASE_PRICE_USD : RIGGING_BASE_PRICE) : 0;
    extraPartsFee = Math.max(0, input.extraPartsCount) * (lang === 'en' ? EXTRA_PARTS_PRICE_USD : EXTRA_PARTS_PRICE);
  }

  const adjustedArt = artSubtotal + adultFee + live2dFee;
  const flatFees = rushFee + sourceFileFee + riggingFee + extraPartsFee;
  const total = adjustedArt + commercialFee + flatFees;

  const low = Math.max(0, Math.round((total * (1 - RANGE_LOW_FACTOR))));
  const high = Math.round((total * (1 + RANGE_HIGH_FACTOR)));
  const minDeposit = lang === 'en' ? MINIMUM_DEPOSIT_USD : MINIMUM_DEPOSIT;
  const deposit = Math.min(total, Math.max(minDeposit, input.depositAmount));
  const balance = Math.max(0, total - deposit);

  const breakdown: BreakdownItem[] = [];
  const colorLabel = (input.colorMode === 'bw' && workType.hasColorChoice) ? 'B/W' : 'Full Color';

  breakdown.push({ label: `${workType.label} / ${colorLabel}`, amount: base });
  if (characterFee > 0) {
    breakdown.push({
      label: lang === 'en' ? `Additional character x${characterCount - 1}` : `ตัวละครเพิ่ม ×${characterCount - 1}`,
      amount: characterFee,
    });
  }
  if (complexityFee > 0) {
    breakdown.push({
      label: lang === 'en' ? `Character detail: ${complexity.label}` : `ดีเทล ${complexity.labelTh}`,
      amount: complexityFee,
    });
  }
  if (backgroundFee > 0) breakdown.push({ label: labelFor(background, lang), amount: backgroundFee });
  
  if (options.includeGlobalModifiers) {
    if (adultFee > 0) breakdown.push({ label: lang === 'en' ? 'Adult content (18+) (+20%)' : 'เนื้อหาสำหรับผู้ใหญ่ (+20%)', amount: adultFee });
    if (live2dFee > 0) breakdown.push({ label: lang === 'en' ? 'Live2D part separation (+50%)' : 'แยกพาร์ต Live2D (+50%)', amount: live2dFee });
    if (commercialFee > 0) breakdown.push({ label: lang === 'en' ? 'Commercial use (x2)' : 'สิทธิ์เชิงพาณิชย์ (×2)', amount: commercialFee });
    if (rushFee > 0) breakdown.push({ label: labelFor(rush, lang), amount: rushFee });
    if (sourceFileFee > 0) breakdown.push({ label: lang === 'en' ? 'PSD source file' : 'ไฟล์ PSD / Source File', amount: sourceFileFee });
    if (riggingFee > 0) breakdown.push({ label: 'Rigging', amount: riggingFee });
    if (extraPartsFee > 0) breakdown.push({ label: lang === 'en' ? `Extra parts x${input.extraPartsCount}` : `ชิ้นส่วนเพิ่ม ×${input.extraPartsCount}`, amount: extraPartsFee });
  }

  return {
    workType, base, characterFee, complexityFee, backgroundFee, artSubtotal, adultFee, live2dFee, adjustedArt,
    commercialFee, rushFee, sourceFileFee, riggingFee, extraPartsFee, flatFees, total, low, high, deposit, balance, breakdown,
    labels: {
      workType: workType.label,
      colorMode: colorLabel,
      complexity: labelFor(complexity, lang),
      background: labelFor(background, lang),
      rush: labelFor(rush, lang),
    },
  };
}

export function calculateDoujinPrice(input: CalculatorInput, lang: PriceLanguage): PriceResult {
  const doujinPages = Math.max(1, input.doujinPages);
  const pagePrice = lang === 'en' ? DOUJIN_PAGE_PRICE_USD : DOUJIN_PAGE_PRICE_THB;
  const innerSubtotal = doujinPages * pagePrice;
  
  const doujinWorkType = workTypes.find(w => w.id === 'doujin')!;
  
  const breakdown: BreakdownItem[] = [];
  breakdown.push({
    label: lang === 'en' ? `Doujin inner pages (x${doujinPages})` : `หน้าเนื้อหาโดจิน (×${doujinPages})`,
    amount: innerSubtotal
  });

  let coverResult: PriceResult | null = null;
  let coverArtSubtotal = 0;

  if (input.wantCover) {
    const coverInput = { ...input, workTypeId: input.coverScaleId };
    coverResult = calculateIllustrationPrice(coverInput, lang, { includeGlobalModifiers: false });
    coverArtSubtotal = coverResult.artSubtotal;
    
    // Prefix cover items
    const prefix = lang === 'en' ? '[Cover] ' : '[ปก] ';
    for (const item of coverResult.breakdown) {
      breakdown.push({
        label: `${prefix}${item.label}`,
        amount: item.amount
      });
    }
  }

  // Combined art subtotal before global modifiers
  const combinedArtSubtotal = innerSubtotal + coverArtSubtotal;
  
  // Global Modifiers applied to combined art subtotal
  const adultFee = input.isAdult ? Math.round(combinedArtSubtotal * ADULT_RATE) : 0;
  const adjustedArt = combinedArtSubtotal + adultFee;
  const commercialFee = input.isCommercial ? Math.round(adjustedArt * (COMMERCIAL_MULTIPLIER - 1)) : 0;
  
  const rush = rushOptions.find((r) => r.id === input.rushId) ?? rushOptions[0];
  const rushFee = lang === 'en' ? (rush.surchargeUsd ?? 0) : (rush.surcharge ?? 0);
  const flatFees = rushFee;
  
  const total = adjustedArt + commercialFee + flatFees;

  // Append global modifiers to breakdown
  if (adultFee > 0) breakdown.push({ label: lang === 'en' ? 'Adult content (18+) (+20%)' : 'เนื้อหาสำหรับผู้ใหญ่ (+20%)', amount: adultFee });
  if (commercialFee > 0) breakdown.push({ label: lang === 'en' ? 'Commercial use (x2)' : 'สิทธิ์เชิงพาณิชย์ (×2)', amount: commercialFee });
  if (rushFee > 0) breakdown.push({ label: labelFor(rush, lang), amount: rushFee });

  const low = Math.max(0, Math.round((total * (1 - RANGE_LOW_FACTOR))));
  const high = Math.round((total * (1 + RANGE_HIGH_FACTOR)));
  const minDeposit = lang === 'en' ? MINIMUM_DEPOSIT_USD : MINIMUM_DEPOSIT;
  const deposit = Math.min(total, Math.max(minDeposit, input.depositAmount));
  const balance = Math.max(0, total - deposit);

  return {
    workType: doujinWorkType,
    base: innerSubtotal,
    characterFee: 0, complexityFee: 0, backgroundFee: 0, artSubtotal: combinedArtSubtotal,
    adultFee, live2dFee: 0, adjustedArt, commercialFee, rushFee,
    sourceFileFee: 0, riggingFee: 0, extraPartsFee: 0, flatFees,
    total, low, high, deposit, balance, breakdown,
    labels: {
      workType: doujinWorkType.label,
      colorMode: 'B/W', // Cover color mode is included in the brief separately
      complexity: coverResult ? coverResult.labels.complexity : '-',
      background: coverResult ? coverResult.labels.background : '-',
      rush: labelFor(rush, lang),
    }
  };
}
