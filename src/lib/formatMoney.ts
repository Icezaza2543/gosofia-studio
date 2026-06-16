// ─── Money Formatting Utility ───

export type MoneyLanguage = 'th' | 'en';

export const THB_PER_USD = 32.5;
export const USD_DISPLAY_MARKUP = 20;

const thaiFormatter = new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
  maximumFractionDigits: 0,
});

const englishFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function thbToUsd(amount: number): number {
  return amount / THB_PER_USD;
}

export function usdToThb(amount: number): number {
  return amount * THB_PER_USD;
}

/**
 * Format a THB-denominated amount for the active display language.
 * Example: formatMoney(1200) → "฿1,200"
 */
export function formatMoney(amount: number, lang: MoneyLanguage = 'th', options?: { applyUsdMarkup?: boolean }): string {
  if (lang === 'en') {
    const baseUsd = thbToUsd(amount);
    const finalUsd = (options?.applyUsdMarkup && baseUsd > 0) ? baseUsd + USD_DISPLAY_MARKUP : baseUsd;
    return englishFormatter.format(finalUsd).replace(/\s+/g, ' ');
  }
  return thaiFormatter.format(amount);
}
