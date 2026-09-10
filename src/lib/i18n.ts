export type Lang = "tr" | "en";

const tr = {
  nav: {
    home: "Bağlantılar",
    clubsDocs: "Tüm Kulüpler ve Evraklar",
    faq: "Sık Sorulan Sorular",
    contact: "Bize Ulaşın",
    redirectWarning:
      "Öğrenci Dekanlığı'nın websitesine yönlendiriliyorsunuz.",
    redirectContinue: "Devam Et",
    redirectCancel: "Vazgeç",
  },
  common: {
    openMenu: "Menü",
    toggleLanguage: "Dili değiştir",
    visit: "Ziyaret et",
    backHome: "Bağlantılara dön",
    university: "Altınbaş Üniversitesi",
  },
  home: {
    contactCta: "Bize Ulaşın",
  },
  guide: {
    eyebrow: "Kulüp Rehberi",
    title: "Kulüp Rehberi",
    description:
      "Etkinliklere katılmak, yeni bir kulüp kurmak ve merak ettiklerin için bilmen gereken her şey.",
    events: {
      title: "Etkinlikler",
      intro:
        "Kulüplerimizin kapısı tüm Altınbaş Üniversitesi öğrencilerine sonuna kadar açık!",
      subheading: "Ekibin bir parçası olmak çok kolay:",
      items: [
        {
          title: "Maillerini Kontrol Et",
          text: "En güncel etkinlik duyuruları ve kayıt linkleri için öğrenci e-posta kutunu düzenli olarak takip etmeyi unutma.",
        },
        {
          title: "Sosyal Medyada Bizi Bul",
          text: "Kulüplerin sosyal medya hesaplarını takip ederek anlık duyurulardan haberdar ol.",
        },
        {
          title: "Kampüsü Gözlemle",
          text: "Panolardaki afişlerimizde mutlaka ilgini çekecek bir etkinlik vardır.",
        },
      ],
    },
    founding: {
      title: "Hayalimdeki Kulübü Kurmak",
      intro:
        "Kendi ekibini kurup vizyonunu kampüse taşımak istiyorsan harika bir haberimiz var!",
      items: [
        "Yeni kulüp başvurularını her yıl Ekim ve Şubat aylarında alıyoruz.",
        "Kuruluş Talep Formu, Kulüp Tüzüğü, Faaliyet Planı ve Danışman Kabul Formu'nu eksiksiz hazırlamalısın.",
        "Hazırladığın bu belgeleri Öğrenci Dekanlığı'na (AUDOST) mail yoluyla ileterek başvurunu kolayca tamamlayabilirsin.",
        "Kulübüne yol gösterecek ve destek olacak bir Akademik Danışman hocamızla anlaşman gerekiyor.",
        "Kuracağın kulübün amacı ve ismi, okulumuzdaki mevcut kulüplerden farklı olmalıdır.",
        "Nereden başlayacağını bilmiyorsan tüm bu süreçte bize her zaman danışabilirsin.",
      ],
    },
    questions: {
      title: "Aklına Takılanlar",
      intro:
        "Kulüp süreçleri, yaklaşan etkinlikler veya aklındaki yeni kulüp fikri hakkında danışmak istediğin her şey için buradayız!",
      items: [
        "Hangi adımı atacağını bilemiyorsan bize doğrudan mesaj at, mail üzerinden ulaş veya kampüste yanımıza gel.",
        "Sorularını cevaplamak ve üniversite hayatını renklendirmek için sabırsızlanıyoruz!",
      ],
      cta: "Bize Ulaşın",
    },
  },
  resources: {
    eyebrow: "Kulüpler İçin",
    title: "Kulüp Kaynakları",
    description:
      "Öğrenci kulüplerinin ihtiyaç duyabileceği formlar, rehberler ve bağlantılar.",
    empty: "Henüz kaynak eklenmemiş.",
  },
  faq: {
    eyebrow: "Sık Sorulan Sorular",
    title: "Sık Sorulan Sorular",
    description: "Öğrenciler ve kulüpler için en çok merak edilenler.",
    studentsTitle: "Öğrenciler İçin",
    clubsTitle: "Kulüpler İçin",
    studentsEmpty: "Henüz soru eklenmemiş.",
    clubsEmpty: "Henüz soru eklenmemiş.",
    docsTitle: "Yönerge ve Formlar",
    ctaTitle: "Aklına takılan başka bir şey mi var?",
    ctaText:
      "Kulüp süreçleri, yaklaşan etkinlikler veya aklındaki yeni kulüp fikri hakkında danışmak istediğin her şey için buradayız.",
    cta: "Bize Ulaşın",
  },
  contact: {
    eyebrow: "İletişim",
    title: "Bize Ulaşın",
    description:
      "Soru, öneri ve başvurularınız için aşağıdaki kanalları kullanabilirsiniz.",
    formTitle: "Mesaj Gönderin",
    formDescription: "Formu doldurun, en kısa sürede size dönüş yapalım.",
    name: "Ad Soyad",
    namePlaceholder: "Adınız",
    email: "E-posta",
    emailPlaceholder: "ornek@universite.edu.tr",
    subject: "Konu",
    subjectPlaceholder: "Kulüp kuruluşu, etkinlik başvurusu vb.",
    message: "Mesajınız",
    messagePlaceholder: "Bize iletmek istedikleriniz...",
    emailLabel: "E-posta",
    phoneLabel: "Telefon",
    addressLabel: "Adres",
    socialLabel: "Sosyal Medya",
    send: "Gönder",
    sending: "Gönderiliyor...",
    required: "Lütfen ad, e-posta ve mesaj alanlarını doldurun.",
    invalidEmail: "Geçerli bir e-posta adresi girin.",
    notConfigured:
      "İletişim formu şu anda kullanılamıyor. Lütfen e-posta ile ulaşın.",
    error: "Mesajınız gönderilemedi. Lütfen tekrar deneyin.",
    unexpected: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
    success: "Mesajınız alındı! En kısa sürede size dönüş yapacağız.",
  },
  footer: {
    pressKit: "Basın Kiti",
    documents: "Yönerge ve Formlar",
    rights: "Tüm hakları saklıdır.",
  },
  pressKit: {
    eyebrow: "Kurumsal",
    title: "Basın Kiti",
    description:
      "Kulüpler Birliği logosunu ve marka dosyalarını buradan indirebilirsiniz.",
    download: "İndir",
  },
  documents: {
    eyebrow: "Belgeler",
    title: "Yönerge ve Formlar",
    description:
      "Öğrenci kulüpleriyle ilgili yönerge ve güncel başvuru formları.",
  },
};

type Dictionary = typeof tr;

const en: Dictionary = {
  nav: {
    home: "Links",
    clubsDocs: "All Clubs and Documents",
    faq: "FAQ",
    contact: "Contact Us",
    redirectWarning: "You are being redirected to the Dean of Students website.",
    redirectContinue: "Continue",
    redirectCancel: "Cancel",
  },
  common: {
    openMenu: "Menu",
    toggleLanguage: "Switch language",
    visit: "Visit",
    backHome: "Back to links",
    university: "Altınbaş University",
  },
  home: {
    contactCta: "Contact Us",
  },
  guide: {
    eyebrow: "Club Guide",
    title: "Club Guide",
    description:
      "Everything you need to know to join events, found a new club and get your questions answered.",
    events: {
      title: "Events",
      intro:
        "Our clubs' doors are wide open to all Altınbaş University students!",
      subheading: "Becoming part of the team is very easy:",
      items: [
        {
          title: "Check Your Emails",
          text: "Don't forget to regularly check your student inbox for the latest event announcements and registration links.",
        },
        {
          title: "Find Us on Social Media",
          text: "Follow the clubs' social media accounts to stay informed of instant announcements.",
        },
        {
          title: "Watch the Campus",
          text: "There is always an event that will catch your interest on our posters on the boards.",
        },
      ],
    },
    founding: {
      title: "Founding Your Dream Club",
      intro:
        "If you want to build your own team and bring your vision to campus, we have great news!",
      items: [
        "We accept new club applications every year in October and February.",
        "You must fully prepare the Founding Request Form, Club Bylaws, Activity Plan and Advisor Acceptance Form.",
        "You can easily complete your application by emailing these documents to the Dean of Students Office (AUDOST).",
        "You need to agree with an Academic Advisor who will guide and support your club.",
        "The purpose and name of the club you found must be different from the existing clubs at our university.",
        "If you don't know where to start, you can always consult us throughout the process.",
      ],
    },
    questions: {
      title: "Have Questions?",
      intro:
        "We are here for everything you want to ask about club processes, upcoming events or your new club idea!",
      items: [
        "If you don't know which step to take, message us directly, reach us by email, or come see us on campus.",
        "We can't wait to answer your questions and add color to your university life!",
      ],
      cta: "Contact Us",
    },
  },
  resources: {
    eyebrow: "For Clubs",
    title: "Club Resources",
    description:
      "Forms, guides and links that student clubs may need.",
    empty: "No resources added yet.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    description: "The most common questions for students and clubs.",
    studentsTitle: "For Students",
    clubsTitle: "For Clubs",
    studentsEmpty: "No questions added yet.",
    clubsEmpty: "No questions added yet.",
    docsTitle: "Directive and Forms",
    ctaTitle: "Have another question?",
    ctaText:
      "We are here for everything you want to ask about club processes, upcoming events or your new club idea.",
    cta: "Contact Us",
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact Us",
    description:
      "Use the channels below for your questions, suggestions and applications.",
    formTitle: "Send a Message",
    formDescription: "Fill in the form and we will get back to you shortly.",
    name: "Full Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "example@university.edu",
    subject: "Subject",
    subjectPlaceholder: "Club formation, event application, etc.",
    message: "Your Message",
    messagePlaceholder: "What would you like to tell us...",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    socialLabel: "Social Media",
    send: "Send",
    sending: "Sending...",
    required: "Please fill in your name, email and message.",
    invalidEmail: "Please enter a valid email address.",
    notConfigured:
      "The contact form is currently unavailable. Please reach us by email.",
    error: "Your message could not be sent. Please try again.",
    unexpected: "An unexpected error occurred. Please try again.",
    success: "Your message has been received! We will get back to you soon.",
  },
  footer: {
    pressKit: "Press Kit",
    documents: "Directive and Forms",
    rights: "All rights reserved.",
  },
  pressKit: {
    eyebrow: "Corporate",
    title: "Press Kit",
    description: "Download the Clubs Union logo and brand files here.",
    download: "Download",
  },
  documents: {
    eyebrow: "Documents",
    title: "Directive and Forms",
    description: "The directive and current application forms for student clubs.",
  },
};

export const translations: Record<Lang, Dictionary> = { tr, en };

export type { Dictionary };

export function pick(
  lang: Lang,
  trValue: string | null | undefined,
  enValue: string | null | undefined,
): string {
  if (lang === "en") return enValue || trValue || "";
  return trValue || enValue || "";
}
