const fs = require('fs');

const termsTh = `
    // Terms Content
    'terms.workflow.title': '📋 ขั้นตอนการทำงาน',
    'terms.workflow.c0': '1. ลูกค้าส่งบรีฟ (ใช้เครื่องคำนวณราคาเพื่อสร้างบรีฟอัตโนมัติได้)',
    'terms.workflow.c1': '2. ศิลปินประเมินราคาและยืนยัน scope งาน',
    'terms.workflow.c2': '3. ลูกค้าชำระมัดจำขั้นต่ำ 300 บาท',
    'terms.workflow.c3': '4. เริ่มร่าง Sketch',
    'terms.workflow.c4': '5. ส่ง Sketch ให้ลูกค้าตรวจ — แก้ไขได้ในขั้นตอนนี้',
    'terms.workflow.c5': '6. ลูกค้าชำระส่วนที่เหลือเมื่อ Sketch ผ่าน',
    'terms.workflow.c6': '7. ลงสี เก็บรายละเอียด',
    'terms.workflow.c7': '8. ส่ง Final Preview ให้ดู',
    'terms.workflow.c8': '9. ส่งไฟล์งานจริงให้ลูกค้า',

    'terms.payment.title': '💰 การชำระเงิน',
    'terms.payment.c0': 'มัดจำขั้นต่ำ 300 บาท ก่อนเริ่มงาน',
    'terms.payment.c1': 'สามารถชำระเต็มจำนวนได้ตั้งแต่ต้นหากสะดวก',
    'terms.payment.c2': 'รับชำระผ่าน Stripe (PromptPay / ตัดบัตร), Wise และ Ko-fi',
    'terms.payment.c3': 'ผ่อนได้สูงสุด 3 งวด ชำระรายเดือน โดยจะส่งอัปเดตงานให้ทุกงวด',
    'terms.payment.c4': 'งวดสุดท้ายชำระเมื่อไร ถึงจะได้รับงานที่เสร็จแล้ว',
    'terms.payment.c5': 'หากลูกค้ามัดจำแล้วหายไป เงินมัดจำจะคงไว้ให้ กลับมาบรีฟเมื่อไรก็เริ่มงานต่อได้เลย',

    'terms.refund.title': '🚫 การคืนเงิน / ยกเลิกงาน',
    'terms.refund.c0': 'ไม่คืนเงินทุกกรณี',
    'terms.refund.c1': 'หากลูกค้าต้องการยกเลิก จะไม่สามารถขอคืนเงินที่ชำระไปแล้วได้',

    'terms.revision.title': '✏️ การแก้ไข',
    'terms.revision.c0': 'แก้ไขในขั้นตอน Sketch: ได้ไม่จำกัดรอบ',
    'terms.revision.c1': 'แก้เฉดสีหลังลงสี: ไม่คิดเงินเพิ่ม',
    'terms.revision.c2': 'ไม่รับแก้ไขใหญ่หลังจากลงสี แสง เงา เรียบร้อยแล้ว',
    'terms.revision.c3': 'ตัวอย่างที่ถือว่าเป็นการแก้ไขใหญ่: เปลี่ยนท่าโพส เปลี่ยนใบหน้าซ้ำหลายครั้ง หรือเปลี่ยนองค์ประกอบหลักของภาพ',
    'terms.revision.c4': 'หาก Sketch ผ่าน → ตัดเส้นผ่าน → ลงสีเบสผ่าน แล้วขอเปลี่ยนใหม่ จะถือว่าเป็นการจ้างภาพใหม่',

    'terms.usage.title': '📄 สิทธิ์การใช้งาน',
    'terms.usage.c0': 'ใช้ส่วนตัว: ใช้เป็นโปรไฟล์ แบนเนอร์ สตรีม ได้ฟรี',
    'terms.usage.c1': 'ใช้เชิงพาณิชย์: ทำ Merch ขาย โปรโมตสินค้า คิดราคา x2',
    'terms.usage.c2': 'แจกให้คนอื่นได้ แต่ห้ามแก้ไขดัดแปลงภาพ',
    'terms.usage.c3': 'ห้ามนำไปใช้กับ AI Training, Dataset หรือ NFT โดยเด็ดขาด',
    'terms.usage.c4': 'หากให้เครดิตศิลปินด้วยจะดีมากและขอบคุณมาก ๆ นะ',

    'terms.artist-rights.title': '🎨 สิทธิ์ของศิลปิน',
    'terms.artist-rights.c0': 'ศิลปินสามารถนำผลงานลง Portfolio ได้',
    'terms.artist-rights.c1': 'ศิลปินสามารถโพสต์ Process / Speedpaint ได้',
    'terms.artist-rights.c2': 'หากลูกค้าไม่สะดวกให้นำลง Portfolio กรุณาแจ้งก่อน — ไม่มีค่าเก็บความลับ',
    'terms.artist-rights.c3': 'ทุกผลงานจะถูกนำลง Portfolio เว้นแต่ลูกค้าแจ้งไว้',

    'terms.commercial.title': '🏢 การใช้เชิงพาณิชย์',
    'terms.commercial.c0': 'ถือว่าใช้เชิงพาณิชย์: การขาย การประมูล การเก็งกำไร หรือใช้เป็นแหล่งสร้างรายได้ทุกรูปแบบ',
    'terms.commercial.c1': 'ไม่ถือว่าใช้เชิงพาณิชย์: แจก ของขวัญ เก็บไว้ดูส่วนตัว ใช้เป็นโปรไฟล์ / สตรีม',
    'terms.commercial.c2': 'ราคาเชิงพาณิชย์: x2 ของราคาประเมิน',

    'terms.adult-policy.title': '🔞 นโยบายเนื้อหาสำหรับผู้ใหญ่',
    'terms.adult-policy.c0': 'รับงานสำหรับผู้ใหญ่ (18+) เฉพาะตัวละครที่เป็นผู้ใหญ่เท่านั้น',
    'terms.adult-policy.c1': 'ไม่รับตัวละครที่ออกแบบให้ดูเป็นเด็กหรือมีลักษณะคลุมเครือ',
    'terms.adult-policy.c2': 'หากบรีฟไม่ชัดเจน ศิลปินสามารถขอแก้ Scope หรือปฏิเสธงานได้',
    'terms.adult-policy.c3': 'หากรับงานไปแล้วและต้องแก้ไขทีหลัง จะคิดค่าแก้ไขตามสมควร',
    'terms.adult-policy.c4': 'ค่าเพิ่ม: +20% ของราคาประเมิน',

    'terms.not-accepted.title': '❌ งานที่ไม่รับ',
    'terms.not-accepted.c0': 'หุ่นยนต์อัตโนมัส / Mecha ขนาดใหญ่',
    'terms.not-accepted.c1': 'ฉากละเอียดมาก (Background High Detail)',
    'terms.not-accepted.c2': 'เนื้อหาที่เกี่ยวข้องกับเด็ก (Loli/Shota) ในบริบทผู้ใหญ่',
    'terms.not-accepted.c3': 'เนื้อหาที่ละเมิดสิทธิ์ผู้อื่น',

    // FAQ Content
    'faq.q0': 'กรอกผ่านเว็บแล้วงง อยากคุยโดยตรงกับนักวาดได้มั้ย?',
    'faq.a0': 'ทำได้งับ! ทักมาคุยได้เลยทาง X/Twitter ได้ตลอดเลยนะ',
    'faq.q1': 'สามารถผ่อนได้มั้ย? แล้วการส่งงานจะเป็นแบบไหน?',
    'faq.a1': 'ผ่อนได้สูงสุด 3 งวดงับ ชำระรายเดือนก็จะส่งอัปเดตให้รายเดือน งวดสุดท้ายชำระเมื่อไรถึงจะได้งานเต็มที่เสร็จแล้วไป',
    'faq.q2': 'ลดราคาได้มั้ย?',
    'faq.a2': 'ไม่ได้งับ เพราะเราไม่ได้วาดแป๊บเดียวเสร็จ และเราสะสมประสบการณ์มามากกว่า 7 ปี ถ้าหากราคาสูงไป ให้ลดสเกลภาพลงงับ',
    'faq.q3': 'ทำไมต้องจ่ายเงินเต็มหลังภาพร่างผ่าน? จ่ายตอนรับงานได้มั้ย? กลัวนักวาดดองงาน',
    'faq.a3': 'ได้งับ! หลังมัดจำแล้ว 300 สามารถชำระครึ่งนึงของราคาหลังภาพร่างผ่าน แล้วชำระครึ่งที่เหลือเพื่อรับภาพที่เสร็จแล้วได้ หรือจะชำระทั้งหมดเลยตั้งแต่ต้นก็ได้ แล้วเราไม่เคยดองงานงับ จะส่งงานให้ไวที่สุด ถ้าหากมีเหตุให้ล่าช้าจะแจ้งไว้ก่อนว่าจะได้ช่วงวันไหน',
    'faq.q4': 'นักวาดวาดมาแล้วกี่ปี?',
    'faq.a4': '7 ปีงับ รับคอมมิชชันมามากกว่า 100+ ครั้ง',
    'faq.q5': 'ขึ้นราคาครั้งล่าสุดเมื่อไร?',
    'faq.a5': 'ปี 2020 งับ',
    'faq.q6': 'แนวที่ชอบวาดเป็นพิเศษ?',
    'faq.a6': 'ชอบวาดสาว ๆ งับ~',
    'faq.q7': 'รับ Omakase (ให้ศิลปินวาดตามอิสระ) มั้ย?',
    'faq.a7': 'รับงับ! สิ่งที่จะได้ขึ้นกับราคาที่เสนอมา',
`;

const termsEn = `
    // Terms Content
    'terms.workflow.title': '📋 Workflow',
    'terms.workflow.c0': '1. Client sends brief (Use the calculator to generate one automatically)',
    'terms.workflow.c1': '2. Artist estimates price and confirms scope',
    'terms.workflow.c2': '3. Client pays minimum 300 THB deposit',
    'terms.workflow.c3': '4. Begin sketching',
    'terms.workflow.c4': '5. Send sketch for review — Revisions allowed at this stage',
    'terms.workflow.c5': '6. Client pays the rest once sketch is approved',
    'terms.workflow.c6': '7. Coloring and detailing',
    'terms.workflow.c7': '8. Send Final Preview',
    'terms.workflow.c8': '9. Deliver final files to client',

    'terms.payment.title': '💰 Payment',
    'terms.payment.c0': 'Minimum deposit of 300 THB before starting',
    'terms.payment.c1': 'Full payment upfront is also accepted if preferred',
    'terms.payment.c2': 'Accepted methods: Stripe (PromptPay / Credit Card), Wise, and Ko-fi',
    'terms.payment.c3': 'Installments allowed up to 3 months, with monthly updates sent',
    'terms.payment.c4': 'Final artwork is delivered once the final installment is paid',
    'terms.payment.c5': 'If client disappears after deposit, the deposit is kept. Work can resume anytime when returning.',

    'terms.refund.title': '🚫 Refunds / Cancellations',
    'terms.refund.c0': 'No refunds under any circumstances',
    'terms.refund.c1': 'If the client wishes to cancel, paid amounts will not be refunded',

    'terms.revision.title': '✏️ Revisions',
    'terms.revision.c0': 'Revisions during sketch phase: Unlimited',
    'terms.revision.c1': 'Color tweaks after coloring: Free of charge',
    'terms.revision.c2': 'No major revisions accepted after coloring, lighting, and shading are done',
    'terms.revision.c3': 'Examples of major revisions: Changing pose, repeatedly changing facial features, or changing main composition',
    'terms.revision.c4': 'If requesting a redo after sketch -> lineart -> base color is approved, it will be treated as a new commission',

    'terms.usage.title': '📄 Usage Rights',
    'terms.usage.c0': 'Personal Use: Allowed for profiles, banners, streams for free',
    'terms.usage.c1': 'Commercial Use: Selling merch, promoting products costs x2',
    'terms.usage.c2': 'Can be gifted to others, but editing/altering the artwork is prohibited',
    'terms.usage.c3': 'Strictly prohibited from using in AI Training, Datasets, or NFTs',
    'terms.usage.c4': 'Giving credit to the artist is highly appreciated!',

    'terms.artist-rights.title': '🎨 Artist Rights',
    'terms.artist-rights.c0': 'Artist can use the artwork in their Portfolio',
    'terms.artist-rights.c1': 'Artist can post Process / Speedpaint videos',
    'terms.artist-rights.c2': 'If client does not want the artwork in the portfolio, please inform beforehand — No NDA fee required',
    'terms.artist-rights.c3': 'All works will be posted in the portfolio unless requested otherwise',

    'terms.commercial.title': '🏢 Commercial Use',
    'terms.commercial.c0': 'Considered commercial: Selling, auctioning, speculating, or any revenue-generating usage',
    'terms.commercial.c1': 'Not considered commercial: Giveaways, personal gifts, personal profiles / streams',
    'terms.commercial.c2': 'Commercial price: x2 of the total estimate',

    'terms.adult-policy.title': '🔞 Adult Content Policy',
    'terms.adult-policy.c0': 'Accepting adult works (18+) for adult characters only',
    'terms.adult-policy.c1': 'Will not accept characters designed to look like minors or with ambiguous traits',
    'terms.adult-policy.c2': 'If the brief is unclear, artist may request to change the scope or decline the work',
    'terms.adult-policy.c3': 'If accepted and later required revisions, fees will be charged accordingly',
    'terms.adult-policy.c4': 'Surcharge: +20% of the estimated price',

    'terms.not-accepted.title': '❌ Will Not Draw',
    'terms.not-accepted.c0': 'Large autonomous robots / Mecha',
    'terms.not-accepted.c1': 'Highly detailed backgrounds',
    'terms.not-accepted.c2': 'Content involving minors (Loli/Shota) in adult contexts',
    'terms.not-accepted.c3': 'Content violating others rights',

    // FAQ Content
    'faq.q0': 'Confused by the form? Can I talk to the artist directly?',
    'faq.a0': 'Of course! Feel free to DM me on X/Twitter anytime~',
    'faq.q1': 'Do you accept installments? How does delivery work?',
    'faq.a1': 'Installments up to 3 months are accepted. Monthly payments mean monthly updates. The final artwork is delivered when the final installment is paid.',
    'faq.q2': 'Can I get a discount?',
    'faq.a2': 'No, sorry! Artwork takes time and I have over 7 years of experience. If the price is too high, please lower the drawing scale (e.g. bust-up instead of full body).',
    'faq.q3': 'Why pay in full after sketch? Can I pay after completion? Scared of artists ghosting.',
    'faq.a3': 'You can! After the 300 THB deposit, you can pay 50% after sketch approval, and the remaining 50% before receiving the final. Or you can pay upfront. I never ghost! I deliver as fast as possible, and will inform you beforehand if any delays occur.',
    'faq.q4': 'How many years have you been drawing?',
    'faq.a4': '7 years! With over 100+ commissions done.',
    'faq.q5': 'When was your last price increase?',
    'faq.a5': 'In 2020.',
    'faq.q6': 'What do you like to draw the most?',
    'faq.a6': 'I love drawing girls~',
    'faq.q7': 'Do you accept Omakase (Artist freedom)?',
    'faq.a7': 'Yes! The outcome will depend on your offered budget.',
`;

let i18n = fs.readFileSync('src/data/i18n.ts', 'utf8');

// Insert after faq.more.cta in th
i18n = i18n.replace(/('faq\.more\.cta': 'ติดต่อนักวาด',)/, '$1\n' + termsTh);
// Insert after faq.more.cta in en
i18n = i18n.replace(/('faq\.more\.cta': 'Contact Artist',)/, '$1\n' + termsEn);

fs.writeFileSync('src/data/i18n.ts', i18n);

// Patch TermsSection.astro
let termsAstro = fs.readFileSync('src/components/TermsSection.astro', 'utf8');
termsAstro = termsAstro.replace(/<h2 class="text-xl font-bold text-ink mb-4">{section\.title}<\/h2>/g, 
  '<h2 class="text-xl font-bold text-ink mb-4" data-i18n={`terms.${section.id}.title`}>{section.title}</h2>');
termsAstro = termsAstro.replace(/<span>{line}<\/span>/g,
  '<span data-i18n={`terms.${section.id}.c${index}`}>{line}</span>');
termsAstro = termsAstro.replace(/\{section\.content\.map\(\(line\) => \(/g,
  '{section.content.map((line, index) => (');

fs.writeFileSync('src/components/TermsSection.astro', termsAstro);

// Patch FAQ.astro
let faqAstro = fs.readFileSync('src/components/FAQ.astro', 'utf8');
faqAstro = faqAstro.replace(/<span class="text-base">{item\.question}<\/span>/g,
  '<span class="text-base" data-i18n={`faq.q${index}`}>{item.question}</span>');
faqAstro = faqAstro.replace(/<p class="text-base text-muted leading-relaxed">{item\.answer}<\/p>/g,
  '<p class="text-base text-muted leading-relaxed" data-i18n={`faq.a${index}`}>{item.answer}</p>');

fs.writeFileSync('src/components/FAQ.astro', faqAstro);

// Patch pages
let termsPage = fs.readFileSync('src/pages/terms.astro', 'utf8');
termsPage = termsPage.replace(/<p class="text-muted mt-2">กรุณาอ่านเงื่อนไขก่อนส่งบรีฟ — เพื่อให้ทั้งสองฝ่ายเข้าใจตรงกัน<\/p>/g, 
  '<p class="text-muted mt-2" data-i18n="terms.page.desc">กรุณาอ่านเงื่อนไขก่อนส่งบรีฟ — เพื่อให้ทั้งสองฝ่ายเข้าใจตรงกัน</p>');
termsPage = termsPage.replace(/🧮 คำนวณราคาและส่งบรีฟ/g, 
  '<span data-i18n="terms.cta">🧮 คำนวณราคาและส่งบรีฟ</span>');
fs.writeFileSync('src/pages/terms.astro', termsPage);

let faqPage = fs.readFileSync('src/pages/faq.astro', 'utf8');
faqPage = faqPage.replace(/<p class="text-muted mt-2">คำตอบจากคุณโกเองงับ~<\/p>/g, 
  '<p class="text-muted mt-2" data-i18n="faq.page.desc">คำตอบจากคุณโกเองงับ~</p>');
faqPage = faqPage.replace(/<p class="text-base font-semibold text-ink mb-3">ยังมีคำถามอื่นอีกมั้ย\?<\/p>/g, 
  '<p class="text-base font-semibold text-ink mb-3" data-i18n="faq.more.title">ยังมีคำถามอื่นอีกมั้ย?</p>');
faqPage = faqPage.replace(/<p class="text-sm text-muted mb-4">ทักมาคุยกันได้เลย ยินดีตอบทุกคำถามงับ 💬<\/p>/g, 
  '<p class="text-sm text-muted mb-4" data-i18n="faq.more.desc">ทักมาคุยกันได้เลย ยินดีตอบทุกคำถามงับ 💬</p>');
faqPage = faqPage.replace(/ติดต่อนักวาด/g, 
  '<span data-i18n="faq.more.cta">ติดต่อนักวาด</span>');
fs.writeFileSync('src/pages/faq.astro', faqPage);
