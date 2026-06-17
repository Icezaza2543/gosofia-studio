// ─── Pricing Currency Helpers ───

export type Currency = 'THB' | 'USD';
export type PricingLanguage = 'th' | 'en';

export function currencyForLanguage(language: PricingLanguage): Currency {
  return language === 'en' ? 'USD' : 'THB';
}

export function getCurrencyAmount(
  thb: number | null,
  usd: number | null,
  currency: Currency,
): number | null {
  return currency === 'USD' ? usd : thb;
}
