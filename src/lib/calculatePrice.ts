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
  SOURCE_FILE_PRICE_USD,
  RIGGING_BASE_PRICE,
  RIGGING_BASE_PRICE_USD,
  EXTRA_PARTS_PRICE,
  EXTRA_PARTS_PRICE_USD,
  MINIMUM_DEPOSIT,
  MINIMUM_DEPOSIT_USD,
  RANGE_LOW_FACTOR,
  RANGE_HIGH_FACTOR,
  DOUJIN_PAGE_PRICE_THB,
  DOUJIN_PAGE_PRICE_USD,
  type WorkTypeConfig,
} from '../data/pricing';
import { currencyForLanguage, getCurrencyAmount, type Currency } from './currency';

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

function amountForCurrency(
  thb: number | null,
  usd: number | null,
  currency: Currency,
): number {
  return getCurrencyAmount(thb, usd, currency) ?? 0;
}

function labelFor(
  item: { label: string; labelTh: string },
  lang: PriceLanguage,
): string {
  return lang === 'en' ? item.label : item.labelTh;
}

export function calculatePrice(
  input: CalculatorInput,
  lang: PriceLanguage = 'th',
  currency: Currency = currencyForLanguage(lang),
): PriceResult {
  if (input.workTypeId === 'doujin') {
    return calculateDoujinPrice(input, lang, currency);
  }
  return calculateIllustrationPrice(input, lang, { includeGlobalModifiers: true, currency });
}

export function calculateIllustrationPrice(
  input: CalculatorInput, 
  lang: PriceLanguage, 
  options: { includeGlobalModifiers: boolean; currency?: Currency }
): PriceResult {
  const currency = options.currency ?? currencyForLanguage(lang);

  // ─── Step 0: Resolve configs ───
  const workType = workTypes.find((w) => w.id === input.workTypeId) ?? workTypes[0];
  const complexity = complexityOptions.find((c) => c.id === input.complexityId) ?? complexityOptions[1];
  const background = backgroundOptions.find((b) => b.id === input.backgroundId) ?? backgroundOptions[0];
  const rush = rushOptions.find((r) => r.id === input.rushId) ?? rushOptions[0];

  // ─── Step 1: Art subtotal ───
  const bwBase = getCurrencyAmount(workType.bw, workType.bwUsd, currency);
  const colorBase = getCurrencyAmount(workType.color, workType.colorUsd, currency);
  const base = input.colorMode === 'bw' && bwBase !== null
    ? bwBase
    : (colorBase ?? bwBase ?? 0);

  const characterCount = Math.max(1, Math.min(6, input.characterCount));
  const characterFee = (characterCount - 1) * base;
  const complexityFee = amountForCurrency(complexity.surcharge, complexity.surchargeUsd, currency);
  const backgroundFee = amountForCurrency(background.surcharge, background.surchargeUsd, currency);
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
    
    rushFee = amountForCurrency(rush.surcharge, rush.surchargeUsd, currency);
    sourceFileFee = (input.wantSourceFile && workType.id === 'vtuber')
      ? amountForCurrency(SOURCE_FILE_PRICE, SOURCE_FILE_PRICE_USD, currency)
      : 0;
    riggingFee = input.wantRigging
      ? amountForCurrency(RIGGING_BASE_PRICE, RIGGING_BASE_PRICE_USD, currency)
      : 0;
    extraPartsFee = Math.max(0, input.extraPartsCount)
      * amountForCurrency(EXTRA_PARTS_PRICE, EXTRA_PARTS_PRICE_USD, currency);
  }

  const adjustedArt = artSubtotal + adultFee + live2dFee;
  const flatFees = rushFee + sourceFileFee + riggingFee + extraPartsFee;
  const total = adjustedArt + commercialFee + flatFees;

  const low = Math.max(0, Math.round((total * (1 - RANGE_LOW_FACTOR))));
  const high = Math.round((total * (1 + RANGE_HIGH_FACTOR)));
  const minDeposit = amountForCurrency(MINIMUM_DEPOSIT, MINIMUM_DEPOSIT_USD, currency);
  const deposit = Math.min(total, Math.max(minDeposit, input.depositAmount));
  const balance = Math.max(0, total - deposit);

  const breakdown: BreakdownItem[] = [];
  const colorLabel = (input.colorMode === 'bw' && workType.hasColorChoice) ? 'B/W' : 'Full Color';

  breakdown.push({ label: `${labelFor(workType, lang)} / ${colorLabel}`, amount: base });
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
      workType: labelFor(workType, lang),
      colorMode: colorLabel,
      complexity: labelFor(complexity, lang),
      background: labelFor(background, lang),
      rush: labelFor(rush, lang),
    },
  };
}

export function calculateDoujinPrice(
  input: CalculatorInput,
  lang: PriceLanguage,
  currency: Currency = currencyForLanguage(lang),
): PriceResult {
  const doujinPages = Math.max(1, input.doujinPages);
  const pagePrice = amountForCurrency(DOUJIN_PAGE_PRICE_THB, DOUJIN_PAGE_PRICE_USD, currency);
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
    coverResult = calculateIllustrationPrice(coverInput, lang, { includeGlobalModifiers: false, currency });
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
  const rushFee = amountForCurrency(rush.surcharge, rush.surchargeUsd, currency);
  const flatFees = rushFee;
  
  const total = adjustedArt + commercialFee + flatFees;

  // Append global modifiers to breakdown
  if (adultFee > 0) breakdown.push({ label: lang === 'en' ? 'Adult content (18+) (+20%)' : 'เนื้อหาสำหรับผู้ใหญ่ (+20%)', amount: adultFee });
  if (commercialFee > 0) breakdown.push({ label: lang === 'en' ? 'Commercial use (x2)' : 'สิทธิ์เชิงพาณิชย์ (×2)', amount: commercialFee });
  if (rushFee > 0) breakdown.push({ label: labelFor(rush, lang), amount: rushFee });

  const low = Math.max(0, Math.round((total * (1 - RANGE_LOW_FACTOR))));
  const high = Math.round((total * (1 + RANGE_HIGH_FACTOR)));
  const minDeposit = amountForCurrency(MINIMUM_DEPOSIT, MINIMUM_DEPOSIT_USD, currency);
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
      workType: labelFor(doujinWorkType, lang),
      colorMode: 'B/W', // Cover color mode is included in the brief separately
      complexity: coverResult ? coverResult.labels.complexity : '-',
      background: coverResult ? coverResult.labels.background : '-',
      rush: labelFor(rush, lang),
    }
  };
}
