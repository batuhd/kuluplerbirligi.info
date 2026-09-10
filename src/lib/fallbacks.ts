import type { FaqItem, LinkItem } from "@/lib/types";

const now = new Date(0).toISOString();

export const FALLBACK_LINKS: LinkItem[] = [
  {
    id: "l1",
    title_tr: "Instagram",
    title_en: "Instagram",
    description_tr: "Etkinlikler ve duyurular için bizi takip edin.",
    description_en: "Follow us for events and announcements.",
    url: "#",
    icon: "instagram",
    category_tr: "Sosyal Medya",
    category_en: "Social Media",
    section: "links",
    is_featured: true,
    is_active: true,
    sort_order: 1,
    created_at: now,
  },
  {
    id: "l2",
    title_tr: "WhatsApp",
    title_en: "WhatsApp",
    description_tr: "Sorularınız için bize yazın.",
    description_en: "Message us with your questions.",
    url: "#",
    icon: "phone",
    category_tr: "İletişim",
    category_en: "Contact",
    section: "links",
    is_featured: true,
    is_active: true,
    sort_order: 2,
    created_at: now,
  },
  {
    id: "l3",
    title_tr: "YouTube",
    title_en: "YouTube",
    description_tr: "Etkinlik kayıtları ve videolar.",
    description_en: "Event recordings and videos.",
    url: "#",
    icon: "globe",
    category_tr: "Sosyal Medya",
    category_en: "Social Media",
    section: "links",
    is_featured: false,
    is_active: true,
    sort_order: 3,
    created_at: now,
  },
  {
    id: "l4",
    title_tr: "E-posta",
    title_en: "Email",
    description_tr: "Bize e-posta ile ulaşın.",
    description_en: "Reach us by email.",
    url: "/iletisim",
    icon: "mail",
    category_tr: "İletişim",
    category_en: "Contact",
    section: "links",
    is_featured: false,
    is_active: true,
    sort_order: 4,
    created_at: now,
  },
];

export const FALLBACK_FAQS: FaqItem[] = [
  // ---------------- Öğrenciler ----------------
  {
    id: "qs1",
    question_tr: "Kulüp üyeliği kimlere açık?",
    question_en: "Who can become a club member?",
    answer_tr:
      "Kulüp üyeliği yalnızca Altınbaş Üniversitesi öğrencilerine açıktır. Üye olabilmek için kulüp üyelik formunu doldurman ve kulüp üye defterine kaydolman gerekir.",
    answer_en:
      "Club membership is open only to Altınbaş University students. To become a member, you must fill in the club membership form and register in the club membership book.",
    audience: "students",
    is_active: true,
    sort_order: 1,
    created_at: now,
  },
  {
    id: "qs2",
    question_tr: "Etkinliklerden nasıl haberdar olabilirim?",
    question_en: "How can I stay informed about events?",
    answer_tr:
      "Kulüplerimizin kapısı tüm Altınbaş Üniversitesi öğrencilerine sonuna kadar açık! En güncel etkinlik duyuruları ve kayıt linkleri için öğrenci e-posta kutunu düzenli takip et, kulüplerin sosyal medya hesaplarını izle ve kampüsteki panolara göz at.",
    answer_en:
      "Our clubs' doors are wide open to all Altınbaş University students! To follow the latest event announcements and registration links, check your student inbox regularly, follow the clubs' social media accounts and watch the campus boards.",
    audience: "students",
    is_active: true,
    sort_order: 2,
    created_at: now,
  },
  {
    id: "qs3",
    question_tr: "Üye aidatı ödemem gerekiyor mu?",
    question_en: "Do I have to pay a membership fee?",
    answer_tr:
      "Hayır. Kulüpler üyelerden aidat veya başka bir ad altında para alamaz. Üyeler yalnızca kendi rızası ve kulüp danışmanının onayıyla kulübe maddi veya ayni destekte bulunabilir.",
    answer_en:
      "No. Clubs cannot collect membership fees or money under any other name. Members may only provide financial or in-kind support voluntarily with the approval of the club advisor.",
    audience: "students",
    is_active: true,
    sort_order: 3,
    created_at: now,
  },

  // ---------------- Kulüpler ----------------
  {
    id: "qc1",
    question_tr: "Yeni bir kulüp kurmak istiyorum, nereden başlamalıyım?",
    question_en: "I want to found a new club, where do I start?",
    answer_tr:
      "Kulüp kurma başvurusu her yıl Ekim ve Şubat aylarında yapılabilir. Gerekli belgeleri eksiksiz hazırlayıp Öğrenci Dekanlığı'na (AUDOST) iletmen ve bir akademik danışman ile anlaşman gerekir. Ayrıntılar için [Öğrenci Kulüpleri Yönergesi](https://audost.altinbas.edu.tr/wp-content/uploads/Ogrenci-Kulupleri-Yonergesi.docx) belgesini inceleyebilirsin. Nereden başlayacağını bilmiyorsan tüm süreçte bize danışabilirsin.",
    answer_en:
      "Club formation applications can be made every year in October and February. You must prepare the required documents completely and submit them to the Dean of Students Office (AUDOST), and agree with an academic advisor. For details, you can review the [Student Clubs Directive](https://audost.altinbas.edu.tr/wp-content/uploads/Ogrenci-Kulupleri-Yonergesi.docx). If you don't know where to start, you can consult us throughout the process.",
    audience: "clubs",
    is_active: true,
    sort_order: 1,
    created_at: now,
  },
  {
    id: "qc2",
    question_tr: "Kulüp kurma başvuruları ne zaman yapılır?",
    question_en: "When are club formation applications accepted?",
    answer_tr:
      "Kulüp kurma başvurusu her yıl Ekim ve Şubat aylarında yapılabilir.",
    answer_en:
      "Club formation applications can be made every year in October and February.",
    audience: "clubs",
    is_active: true,
    sort_order: 2,
    created_at: now,
  },
  {
    id: "qc3",
    question_tr: "Kulüp kurmak için hangi belgeler gerekiyor?",
    question_en: "Which documents are required to found a club?",
    answer_tr:
      "Kuruluş Talep ve Kurucu Üyelik Bildirim Formu ([EK-1](https://audost.altinbas.edu.tr/wp-content/uploads/KULUP-KURULMA-TALEBI.odt)), Kulüp Tüzüğü ([EK-2](https://audost.altinbas.edu.tr/wp-content/uploads/SKS-2-Kulup-Tuzugu.docx)), Faaliyet Planı Bildirim Formu ([EK-3](https://audost.altinbas.edu.tr/wp-content/uploads/FAALIYET-BILDIRIM-FORMU.odt)) ve Danışman Kabul Formu ([EK-4](https://audost.altinbas.edu.tr/wp-content/uploads/AKADEMIK-DANISMAN-FORMU.odt)) eksiksiz hazırlanıp AUDOST'a iletilmelidir. Yönergenin tamamı: [Öğrenci Kulüpleri Yönergesi](https://audost.altinbas.edu.tr/wp-content/uploads/Ogrenci-Kulupleri-Yonergesi.docx).",
    answer_en:
      "The Founding Request and Founding Membership Notification Form ([Annex-1](https://audost.altinbas.edu.tr/wp-content/uploads/KULUP-KURULMA-TALEBI.odt)), Club Bylaws ([Annex-2](https://audost.altinbas.edu.tr/wp-content/uploads/SKS-2-Kulup-Tuzugu.docx)), Activity Plan Notification Form ([Annex-3](https://audost.altinbas.edu.tr/wp-content/uploads/FAALIYET-BILDIRIM-FORMU.odt)) and Advisor Acceptance Form ([Annex-4](https://audost.altinbas.edu.tr/wp-content/uploads/AKADEMIK-DANISMAN-FORMU.odt)) must be fully prepared and submitted to AUDOST. Full directive: [Student Clubs Directive](https://audost.altinbas.edu.tr/wp-content/uploads/Ogrenci-Kulupleri-Yonergesi.docx).",
    audience: "clubs",
    is_active: true,
    sort_order: 3,
    created_at: now,
  },
  {
    id: "qc4",
    question_tr: "Aynı isim veya amaçla ikinci bir kulüp kurulabilir mi?",
    question_en:
      "Can a second club with the same name or purpose be founded?",
    answer_tr:
      "Hayır. Kulüpler kuruluş amaçlarına uygun isimler almalıdır; ismi ve/veya amacı aynı olan birden fazla kulüp kurulamaz.",
    answer_en:
      "No. Clubs must take names appropriate to their purpose; more than one club with the same name and/or purpose cannot be founded.",
    audience: "clubs",
    is_active: true,
    sort_order: 4,
    created_at: now,
  },
  {
    id: "qc5",
    question_tr: "Etkinlik düzenlemek için nasıl başvurulur?",
    question_en: "How do we apply to organize an event?",
    answer_tr:
      "Etkinlik tarihinden 15 gün önce 'Öğrenci Kulüpleri Etkinlik Başvuru Formu'nu ([EK-5](https://audost.altinbas.edu.tr/wp-content/uploads/YYB-F-03.5-Ogrenci-Kulupleri-Etkinlik-Basvuru-Formu.Ek5-Rev.0.doc)) doldurarak AUDOST'a başvurmalısın. Afiş asma talebi varsa afiş örneği, katılımcı bilgileri ve açıklamalar forma eklenir. Tüm etkinlikler Rektörlük onayı alındıktan sonra gerçekleştirilir.",
    answer_en:
      "You must apply to AUDOST by filling in the 'Student Clubs Event Application Form' ([Annex-5](https://audost.altinbas.edu.tr/wp-content/uploads/YYB-F-03.5-Ogrenci-Kulupleri-Etkinlik-Basvuru-Formu.Ek5-Rev.0.doc)) 15 days before the event date. If you request to put up posters, a poster sample, participant information and explanations are attached to the form. All events are held after obtaining Rectorate approval.",
    audience: "clubs",
    is_active: true,
    sort_order: 5,
    created_at: now,
  },
  {
    id: "qc6",
    question_tr: "Etkinlikten sonra yapmam gereken bir şey var mı?",
    question_en: "Is there anything to do after the event?",
    answer_tr:
      "Evet. 'Etkinlik Sonuç Bildirim Formu'nu (EK-6) ekleriyle birlikte etkinlik tarihini takip eden 15 işgünü içinde AUDOST'a sunmalısın. Formu zamanında teslim etmeyen kulüplerin sonraki etkinlik başvuruları işleme alınmaz.",
    answer_en:
      "Yes. You must submit the 'Event Result Notification Form' (Annex-6) with its attachments to AUDOST within 15 business days following the event date. Event applications of clubs that do not submit the form on time will not be processed.",
    audience: "clubs",
    is_active: true,
    sort_order: 6,
    created_at: now,
  },
  {
    id: "qc7",
    question_tr: "Hangi defter ve belgeleri tutmak zorundayız?",
    question_en: "Which books and documents must we keep?",
    answer_tr:
      "Üye Kayıt Defteri, Karar Defteri, Demirbaş Eşya Defteri ve gelir-gider belgeleri her kulüpte bulundurulmalı ve istendiğinde AUDOST'a ibraz edilmelidir. Akademik yıl sonunda bu defterler ve Yıllık Faaliyet Raporu AUDOST'a teslim edilir.",
    answer_en:
      "A Member Registry Book, Decision Book, Fixtures/Equipment Book and income-expense documents must be kept in every club and presented to AUDOST upon request. At the end of the academic year, these books and the Annual Activity Report are submitted to AUDOST.",
    audience: "clubs",
    is_active: true,
    sort_order: 7,
    created_at: now,
  },
];
