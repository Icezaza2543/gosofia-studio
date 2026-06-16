// ─── Money Formatting Utility ───

export type MoneyLanguage = 'th' | 'en';

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

/**
 * Format an amount for the active display language.
 * Uses explicitly provided USD amounts for English.
 * Example: formatMoney(1200, 'th') → "฿1,200"
 * Example: formatMoney(50, 'en') → "$50"
 */
export function formatMoney(amount: number, lang: MoneyLanguage = 'th'): string {
  if (lang === 'en') {
    return englishFormatter.format(amount).replace(/\s+/g, ' ');
  }
  return thaiFormatter.format(amount);
}
