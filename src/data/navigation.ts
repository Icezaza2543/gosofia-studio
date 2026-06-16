// ─── Navigation Data ───

export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: 'หน้าแรก', href: '/' },
  { label: 'ผลงาน', href: '/portfolio/' },
  { label: 'คำนวณราคา', href: '/calculator/' },
  { label: 'เรตราคา', href: '/pricing/' },
  { label: 'เงื่อนไข', href: '/terms/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'ติดต่อ', href: '/contact/' },
];
