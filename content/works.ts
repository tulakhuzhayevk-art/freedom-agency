type L = { ru: string; en: string; uz: string };

export type Work = {
  slug: string;
  title: string;
  tag: L;
  desc: L;
  url: string;
  year: string;
  featured: boolean;
  img: string;
  imgHover?: string;
  imgPos?: string;
  video?: string;
  metric?: string;
  metricLabel?: L;
};

export const works: Work[] = [
  {
    slug: "nomad-cargo",
    metric: "100+",
    metricLabel: { ru: "заявок в месяц через сайт", en: "enquiries per month", uz: "oyiga arizalar" },
    video: "/works/nomad-scroll.mp4",
    img: "/works/nomad-cargo.png",
    imgPos: "left center",
    title: "Nomad Cargo",
    tag: { ru: "Лидогенерация", en: "Lead Generation", uz: "Lidogeneratsiya" },
    desc: {
      ru: "Логистика из Китая в 97 стран. Калькулятор, заявки в Битрикс и Telegram-бот.",
      en: "Logistics from China to 97 countries. Calculator, Bitrix CRM, Telegram bot.",
      uz: "Xitoydan 97 mamlakatga logistika. Kalkulyator, Bitrix CRM, Telegram-bot.",
    },
    url: "https://www.nomadcargo.net",
    year: "2026",
    featured: true,
  },
  {
    slug: "mountain-system",
    metric: "798",
    metricLabel: { ru: "платящих пользователей", en: "paying users", uz: "pullik foydalanuvchilar" },
    video: "/works/mountain-scroll.mp4",
    img: "/works/mountain-system.png",
    imgHover: "/works/mountain-system-2.png",
    title: "Mountain System",
    tag: { ru: "Web-experience", en: "Web experience", uz: "Web-tajriba" },
    desc: {
      ru: "Иммерсивный продуктовый лендинг.",
      en: "Immersive product landing.",
      uz: "Immersiv mahsulot landingi.",
    },
    url: "https://www.mountainsystem.app/landing",
    year: "2026",
    featured: true,
  },
  {
    slug: "aimiko",
    metric: "1000+",
    metricLabel: { ru: "заявок через каталог", en: "catalog enquiries", uz: "katalog orqali arizalar" },
    video: "/works/aimiko-scroll.mp4",
    img: "/works/aimiko.png",
    imgHover: "/works/aimiko-2.png",
    title: "Aimiko",
    tag: { ru: "E-commerce", en: "E-commerce", uz: "E-commerce" },
    desc: {
      ru: "Электротранспорт: каталог 200+ позиций, админ-панель, опт и розница.",
      en: "E-mobility: 200+ SKU catalog, admin panel, wholesale and retail.",
      uz: "Elektrotransport: 200+ mahsulot katalogi, admin-panel, ulgurji va chakana.",
    },
    url: "https://aimiko.ru",
    year: "2026",
    featured: true,
  },
  {
    slug: "vanil-a-bean",
    metric: "$10 000+",
    metricLabel: { ru: "сделка, закрытая с этим hero", en: "deal closed with this hero", uz: "shu hero bilan yopilgan bitim" },
    video: "/works/vanil-scroll.mp4",
    img: "/works/vanil-a-bean.png",
    imgHover: "/works/vanil-a-bean-2.jpg",
    title: "Vanil A Bean",
    tag: { ru: "Hero experience", en: "Hero experience", uz: "Hero experience" },
    desc: {
      ru: "Премиальная ваниль с Бали. Заказ креатив-агентства Serotonin.",
      en: "Premium vanilla from Bali. Commissioned by Serotonin agency.",
      uz: "Balidan premium vanil. Serotonin agentligi buyurtmasi.",
    },
    url: "https://vanil-a-bean.vercel.app",
    year: "2026",
    featured: true,
  },
  {
    slug: "nova-travel",
    metric: "48 часов",
    metricLabel: { ru: "от брифа до сдачи", en: "brief to delivery", uz: "brifdan topshirishgacha" },
    img: "",
    title: "Nova Travel",
    tag: { ru: "48 часов", en: "48 hours", uz: "48 soat" },
    desc: {
      ru: "DMC-партнёр в Китае. От брифа до сдачи — двое суток.",
      en: "DMC partner in China. Brief to delivery in two days.",
      uz: "Xitoyda DMC-hamkor. Brifdan topshirishgacha — ikki kun.",
    },
    url: "https://www.novatravelchina.com",
    year: "2026",
    featured: false,
  },
];
