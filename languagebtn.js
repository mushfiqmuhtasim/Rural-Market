const translations = {
  en: {
    signIn: "Sign In",
    getStarted: "Get Started →",
    empoweringBadge: "Empowering Rural Women Entrepreneurs",
    heroTitle: "Empowering Rural Women Through Digital Commerce",
    heroDescription: "Discover authentic handmade products directly from rural women entrepreneurs.",
    startShopping: "Start Shopping →",
    becomeSeller: "Become a Seller",

    activeSellers: "Active Sellers",
    happyCustomers: "Happy Customers",
    productsListed: "Products Listed",
    averageRating: "Average Rating",
    ordersToday: "Orders Today",

    whyChoose: "Why Choose Us",
    whyChooseDesc: "A trusted marketplace connecting rural women with global buyers.",

    feature1Title: "Easy Shopping",
    feature1Desc: "Simple, fast and secure purchases.",
    feature2Title: "Community Driven",
    feature2Desc: "Supporting rural women entrepreneurs.",
    feature3Title: "Business Growth",
    feature3Desc: "Helping sellers grow sustainably.",
    feature4Title: "Secure Payments",
    feature4Desc: "100% safe and reliable transactions.",

    exploreCategories: "Explore Categories",
    exploreCategoriesDesc: "Browse our most popular categories",
    handicrafts: "Handicrafts",
    textiles: "Textiles",
    jewelry: "Jewelry",
    homeDecor: "Home Decor",
    foodProducts: "Food Products",
    beautyProducts: "Beauty Products",

    testimonials: "Testimonials",
    testimonialsDesc: "What our users say",
    testimonial1: "This platform changed my life.",
    testimonial1Name: "Ayesha",
    testimonial1Role: "Seller",
    testimonial2: "Amazing quality and fast delivery.",
    testimonial2Name: "Rahim",
    testimonial2Role: "Buyer",
    testimonial3: "Highly recommended for rural entrepreneurs.",
    testimonial3Name: "Nusrat",
    testimonial3Role: "Entrepreneur",

    ctaTitle: "Join the Movement",
    ctaDesc: "Empower rural women and support local businesses.",
    joinAsSeller: "Join as Seller",
    startShopping2: "Start Shopping →",

    footerCopyright: "© 2025 Rural Market"
  },

  bn: {
    signIn: "সাইন ইন",
    getStarted: "শুরু করুন →",
    empoweringBadge: "গ্রামীণ নারী উদ্যোক্তাদের ক্ষমতায়ন",
    heroTitle: "ডিজিটাল বাণিজ্যের মাধ্যমে গ্রামীণ নারীদের ক্ষমতায়ন",
    heroDescription: "গ্রামীণ নারী উদ্যোক্তাদের তৈরি আসল পণ্য সরাসরি আবিষ্কার করুন।",
    startShopping: "কেনাকাটা শুরু করুন →",
    becomeSeller: "বিক্রেতা হন",

    activeSellers: "সক্রিয় বিক্রেতা",
    happyCustomers: "সন্তুষ্ট গ্রাহক",
    productsListed: "তালিকাভুক্ত পণ্য",
    averageRating: "গড় রেটিং",
    ordersToday: "আজকের অর্ডার",

    whyChoose: "কেন আমাদের বেছে নেবেন",
    whyChooseDesc: "গ্রামীণ নারীদের সাথে ক্রেতাদের সংযুক্ত করার একটি বিশ্বস্ত প্ল্যাটফর্ম।",

    feature1Title: "সহজ কেনাকাটা",
    feature1Desc: "সহজ, দ্রুত এবং নিরাপদ কেনাকাটা।",
    feature2Title: "কমিউনিটি ভিত্তিক",
    feature2Desc: "গ্রামীণ নারী উদ্যোক্তাদের সহায়তা।",
    feature3Title: "ব্যবসা বৃদ্ধি",
    feature3Desc: "বিক্রেতাদের টেকসই উন্নয়নে সহায়তা।",
    feature4Title: "নিরাপদ পেমেন্ট",
    feature4Desc: "১০০% নিরাপদ লেনদেন।",

    exploreCategories: "ক্যাটাগরি সমূহ",
    exploreCategoriesDesc: "জনপ্রিয় ক্যাটাগরি দেখুন",
    handicrafts: "হস্তশিল্প",
    textiles: "বস্ত্র",
    jewelry: "গহনা",
    homeDecor: "ঘর সাজানো",
    foodProducts: "খাদ্যপণ্য",
    beautyProducts: "সৌন্দর্য পণ্য",

    testimonials: "গ্রাহকদের মতামত",
    testimonialsDesc: "আমাদের ব্যবহারকারীরা কী বলেন",
    testimonial1: "এই প্ল্যাটফর্মটি আমার জীবন বদলে দিয়েছে।",
    testimonial1Name: "আয়েশা",
    testimonial1Role: "বিক্রেতা",
    testimonial2: "পণ্যের মান অসাধারণ এবং ডেলিভারি দ্রুত।",
    testimonial2Name: "রহিম",
    testimonial2Role: "ক্রেতা",
    testimonial3: "গ্রামীণ উদ্যোক্তাদের জন্য অত্যন্ত উপযোগী।",
    testimonial3Name: "নুসরাত",
    testimonial3Role: "উদ্যোক্তা",

    ctaTitle: "এই উদ্যোগে যোগ দিন",
    ctaDesc: "গ্রামীণ নারীদের ক্ষমতায়ন করুন।",
    joinAsSeller: "বিক্রেতা হিসেবে যোগ দিন",
    startShopping2: "কেনাকাটা শুরু করুন →",

    footerCopyright: "© ২০২৫ রুরাল মার্কেট"
  }
};

function setLanguage(lang) {
  const t = translations[lang];

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  document.querySelector(`.lang-btn[onclick*="${lang}"]`).classList.add("active");

  Object.keys(t).forEach(key => {
    const el = document.getElementById(key);
    if (el) el.innerText = t[key];
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setLanguage("en");
  
  // Set happy customers percentage
  document.getElementById("happyCustomers2").textContent = "95";
});
const heroImage = document.querySelector('.hero-image');

document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;
  heroImage.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.05)`;
});
const reveals = document.querySelectorAll('.section, .hero-content, .hero-image-container');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


