// ─── Money Formatting Utility ───

import type { Currency } from './currency';

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
 * Format an already-correct currency-local amount.
 * This function never converts values or chooses pricing fields.
 * Example: formatMoney(1200, 'THB') → "฿1,200"
 * Example: formatMoney(50, 'USD') → "$50"
 */
export function formatMoney(amount: number, currency: Currency = 'THB'): string {
  if (currency === 'USD') {
    return englishFormatter.format(amount).replace(/\s+/g, ' ');
  }
  return thaiFormatter.format(amount);
}
