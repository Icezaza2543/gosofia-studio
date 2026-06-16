// ─── Money Formatting Utility ───

const formatter = new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
  maximumFractionDigits: 0,
});

/**
 * Format a number as Thai Baht currency string.
 * Example: formatMoney(1200) → "฿1,200"
 */
export function formatMoney(amount: number): string {
  return formatter.format(amount);
}
