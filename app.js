(function () {
  "use strict";

  var I18N = {
    tr: {
      title: "Kulüpler Birliği | Altınbaş Üniversitesi",
      university: "Altınbaş Üniversitesi",
      brandTitle: "Kulüpler Birliği",
      navClubs: "Tüm Kulüpler ve Evraklar",
      navPress: "Basın Kiti",
      igDesc: "Etkinlikler ve duyurular için bizi takip edin.",
      waDesc: "2026 Girişliler Whatsapp Grubumuz",
      pressEyebrow: "Kurumsal",
      pressTitle: "Basın Kiti",
      pressDesc: "Kulüpler Birliği logosunu ve marka dosyalarını buradan indirebilirsiniz.",
      download: "İndir",
      p1Title: "Yatay logo",
      p1Desc: "Renkli · açık zeminler için",
      p2Title: "Dikey logo",
      p2Desc: "Renkli · açık zeminler için",
      p3Title: "Dikey logo (beyaz)",
      p3Desc: "Beyaz · koyu zeminler için",
      p4Title: "Amblem",
      p4Desc: "Sadece amblem · açık zeminler için"
    },
    en: {
      title: "Clubs Union | Altınbaş University",
      university: "Altınbaş University",
      brandTitle: "Clubs Union",
      navClubs: "All Clubs and Documents",
      navPress: "Press Kit",
      igDesc: "Follow us for events and announcements.",
      waDesc: "WhatsApp Group for the Class of 2026",
      pressEyebrow: "Corporate",
      pressTitle: "Press Kit",
      pressDesc: "Download the Clubs Union logo and brand files here.",
      download: "Download",
      p1Title: "Horizontal logo",
      p1Desc: "Color · for light backgrounds",
      p2Title: "Vertical logo",
      p2Desc: "Color · for light backgrounds",
      p3Title: "Vertical logo (white)",
      p3Desc: "White · for dark backgrounds",
      p4Title: "Mark",
      p4Desc: "Mark only · for light backgrounds"
    }
  };

  var saved = null;
  try { saved = localStorage.getItem("kb-lang"); } catch (e) {}
  var lang = saved === "en" ? "en" : "tr";

  function applyLang() {
    document.documentElement.lang = lang;
    var dict = I18N[lang];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    var toggle = document.getElementById("lang-toggle");
    if (toggle) toggle.textContent = lang === "tr" ? "EN" : "TR";
  }

  var toggle = document.getElementById("lang-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      lang = lang === "tr" ? "en" : "tr";
      try { localStorage.setItem("kb-lang", lang); } catch (e) {}
      applyLang();
    });
  }

  var menuToggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("main-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  applyLang();
})();
