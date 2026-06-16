// ─── Commission Brief Builder ───
// Generates a copyable text summary for clients to send to the artist.

import { formatMoney } from './formatMoney';
import type { PriceResult } from './calculatePrice';

export interface BriefInput {
  projectTitle: string;
  clientName: string;
  notes: string;
  isAdult: boolean;
  adultConfirmed: boolean;
}

/**
 * Build a copyable commission brief text.
 * Returns null if adult option is selected but not confirmed.
 */
export function buildBrief(input: BriefInput, result: PriceResult): string | null {
  // Block brief generation if adult option is on but not confirmed
  if (input.isAdult && !input.adultConfirmed) {
    return null;
  }

  const lines: string[] = [
    `━━━ สรุปบรีฟ Commission ━━━`,
    ``,
    `ชื่องาน: ${input.projectTitle || 'Commission artwork'}`,
    `ลูกค้า: ${input.clientName || '-'}`,
    ``,
    `ประเภทงาน: ${result.labels.workType}`,
    `สี: ${result.labels.colorMode}`,
    `จำนวนตัวละคร: ${result.workType ? Math.max(1, result.characterFee / result.base + 1) : 1}`,
    `ดีเทล: ${result.labels.complexity}`,
    `ฉาก: ${result.labels.background}`,
    `กำหนดส่ง: ${result.labels.rush}`,
  ];

  if (input.isAdult) {
    lines.push(`หมายเหตุ: เนื้อหาสำหรับผู้ใหญ่ — ยืนยันว่าตัวละครทุกตัวเป็น 18+ เท่านั้น`);
  }

  lines.push(``);
  lines.push(`รายละเอียดบรีฟ: ${input.notes || '-'}`);
  lines.push(``);

  // Price breakdown
  lines.push(`━━━ ราคาแยก ━━━`);
  for (const item of result.breakdown) {
    lines.push(`• ${item.label}: ${formatMoney(item.amount)}`);
  }

  lines.push(``);
  lines.push(`━━━ สรุปราคา ━━━`);
  lines.push(`รวมทั้งหมด: ${formatMoney(result.total)}`);
  lines.push(`ช่วงประเมินหลังดูบรีฟจริง: ${formatMoney(result.low)} – ${formatMoney(result.high)}`);
  lines.push(``);
  lines.push(`━━━ การชำระเงิน ━━━`);
  lines.push(`มัดจำ: ${formatMoney(result.deposit)}`);
  lines.push(`ส่วนที่เหลือ: ${formatMoney(result.balance)}`);
  lines.push(`รับชำระผ่าน: Stripe (PromptPay / ตัดบัตร), Wise, Ko-fi`);
  lines.push(``);
  lines.push(`ราคานี้เป็นราคาประเมินเบื้องต้น อาจปรับได้หลังดูบรีฟจริง`);

  return lines.join('\n');
}
