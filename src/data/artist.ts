// ─── Artist Profile Data ───
// Source: docs/gosofia-requirements.md section 1

export interface ArtistProfile {
  name: string;
  nameEn: string;
  nameTh: string;
  bio: string;
  bioShort: string;
  specialties: string[];
  targetAudience: string;
  yearsExperience: string;
  commissionCount: string;
  commissionStatus: 'open' | 'closed' | 'waitlist';
  email: string;
}

export const artist: ArtistProfile = {
  name: 'Gosofia',
  nameEn: 'Gosofia',
  nameTh: 'โกโซเฟีย',
  bio: 'สวัสดีเหล่าลูกค้าที่น่ารัก! เราชื่อ Gosofia นะ เป็นนักวาดอิสระวาด OC, FA ทั้งเกมและวีทูเบอร์ ถนัดวาดสาว ๆ สวย ๆ และงาน Merch อีกด้วย จินตนาการของคุณจะเป็นรูปเป็นร่างขึ้นมา!',
  bioShort: 'นักวาดอิสระ ถนัดงาน Character Art, Vtuber Model และ Merch Illustration',
  specialties: ['Character Art', 'Vtuber Model', 'OC / FA', 'Merch Illustration', 'Doujin Cover'],
  targetAudience: 'ลูกค้าไทย ลูกค้าต่างชาติ Vtuber คนสั่ง OC คนทำ Merch',
  yearsExperience: '7+',
  commissionCount: '100+',
  commissionStatus: 'open',
  email: 'gosofiade@gmail.com',
};
