// ─── Commission Brief Builder ───
// Generates a copyable text summary for clients to send to the artist.

import { formatMoney } from './formatMoney';
import type { PriceLanguage, PriceResult } from './calculatePrice';

export interface BriefInput {
  projectTitle: string;
  clientName: string;
  notes: string;
  isAdult: boolean;
  adultConfirmed: boolean;
}

const briefText = {
  th: {
    title: 'สรุปบรีฟ Commission',
    project: 'ชื่องาน',
    client: 'ลูกค้า',
    workType: 'ประเภทงาน',
    color: 'สี',
    characters: 'จำนวนตัวละคร',
    detail: 'ดีเทล',
    background: 'ฉาก',
    rush: 'กำหนดส่ง',
    adultNote: 'หมายเหตุ: เนื้อหาสำหรับผู้ใหญ่ — ยืนยันว่าตัวละครทุกตัวเป็น 18+ เท่านั้น',
    notes: 'รายละเอียดบรีฟ',
    breakdown: 'ราคาแยก',
    summary: 'สรุปราคา',
    total: 'รวมทั้งหมด',
    range: 'ช่วงประเมินหลังดูบรีฟจริง',
    payment: 'การชำระเงิน',
    deposit: 'มัดจำ',
    balance: 'ส่วนที่เหลือ',
    methods: 'รับชำระผ่าน',
    finalNote: 'ราคานี้เป็นราคาประเมินเบื้องต้น อาจปรับได้หลังดูบรีฟจริง',
  },
  en: {
    title: 'Commission Brief Summary',
    project: 'Project',
    client: 'Client',
    workType: 'Work type',
    color: 'Color',
    characters: 'Number of characters',
    detail: 'Character detail',
    background: 'Background',
    rush: 'Deadline',
    adultNote: 'Note: Adult content (18+) — all characters are confirmed to be 18+ only.',
    notes: 'Brief details',
    breakdown: 'Price Breakdown',
    summary: 'Price Summary',
    total: 'Total',
    range: 'Estimated range after brief review',
    payment: 'Payment',
    deposit: 'Deposit',
    balance: 'Remaining balance',
    methods: 'Payment methods',
    finalNote: 'This is a preliminary estimate. The final price may change after reviewing the full brief.',
  },
} as const;

/**
 * Build a copyable commission brief text.
 * Returns null if adult option is selected but not confirmed.
 */
export function buildBrief(input: BriefInput, result: PriceResult, lang: PriceLanguage = 'th'): string | null {
  // Block brief generation if adult option is on but not confirmed
  if (input.isAdult && !input.adultConfirmed) {
    return null;
  }

  const text = briefText[lang];

  const lines: string[] = [
    `━━━ ${text.title} ━━━`,
    ``,
    `${text.project}: ${input.projectTitle || 'Commission artwork'}`,
    `${text.client}: ${input.clientName || '-'}`,
    ``,
    `${text.workType}: ${result.labels.workType}`,
    `${text.color}: ${result.labels.colorMode}`,
    `${text.characters}: ${result.workType ? Math.max(1, result.characterFee / result.base + 1) : 1}`,
    `${text.detail}: ${result.labels.complexity}`,
    `${text.background}: ${result.labels.background}`,
    `${text.rush}: ${result.labels.rush}`,
  ];

  if (input.isAdult) {
    lines.push(text.adultNote);
  }

  lines.push(``);
  lines.push(`${text.notes}: ${input.notes || '-'}`);
  lines.push(``);

  // Price breakdown
  lines.push(`━━━ ${text.breakdown} ━━━`);
  for (const item of result.breakdown) {
    lines.push(`• ${item.label}: ${formatMoney(item.amount, lang)}`);
  }

  lines.push(``);
  lines.push(`━━━ ${text.summary} ━━━`);
  lines.push(`${text.total}: ${formatMoney(result.total, lang)}`);
  lines.push(`${text.range}: ${formatMoney(result.low, lang)} – ${formatMoney(result.high, lang)}`);
  lines.push(``);
  lines.push(`━━━ ${text.payment} ━━━`);
  lines.push(`${text.deposit}: ${formatMoney(result.deposit, lang)}`);
  lines.push(`${text.balance}: ${formatMoney(result.balance, lang)}`);
  lines.push(`${text.methods}: Stripe (PromptPay / card), Wise, Ko-fi`);
  lines.push(``);
  lines.push(text.finalNote);

  return lines.join('\n');
}
