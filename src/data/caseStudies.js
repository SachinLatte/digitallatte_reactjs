const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const caseStudies = [
  {
    slug: "tim-hortons",
    title: "Tim Hortons Launch",
    description: "Brewing excitement for the iconic Canadian coffee brand's entry into the Indian market with high-impact social media & influencer campaigns.",
    image: `${basePath}/img/home/who-we-are-1.webp`,
    category: "Social Media & Launch",
    stats: [
      { label: "Reach", value: "5M+" },
      { label: "Engagement Rate", value: "8.2%" },
      { label: "Footfall Increase", value: "35%" }
    ]
  },
  {
    slug: "kumar-resorts",
    title: "Kumar Resorts Rebranding",
    description: "Reimagining the luxury resort's digital identity to drive direct weekend bookings through targeted visual storytelling and performance ads.",
    image: `${basePath}/img/home/who-we-are-2.webp`,
    category: "Design & Performance",
    stats: [
      { label: "ROAS", value: "4.8x" },
      { label: "Direct Bookings", value: "+120%" },
      { label: "Cost Per Lead", value: "-28%" }
    ]
  },
  {
    slug: "jionews-ipl-campaign",
    title: "JioNews IPL Campaign",
    description: "Capturing the cricket fever with real-time dynamic creatives and interactive prediction contests that boosted daily active app users.",
    image: `${basePath}/img/home/who-we-are-1.webp`,
    category: "Digital Strategy & Contesting",
    stats: [
      { label: "Impressions", value: "25M+" },
      { label: "Contest Entries", value: "150K+" },
      { label: "App Installs", value: "+45K" }
    ]
  },
  {
    slug: "bata-festive-walk",
    title: "Bata Festive Walk",
    description: "Driving footfalls to physical retail outlets during the festive season with localized hyper-local social ads and store-locator custom features.",
    image: `${basePath}/img/home/who-we-are-2.webp`,
    category: "Retail Marketing",
    stats: [
      { label: "Store Visits", value: "12K+" },
      { label: "Coupon Redemptions", value: "8.5%" },
      { label: "LFL Sales Growth", value: "+14%" }
    ]
  }
];

export const leftColumnProjects = [
  {
    slug: "digital-marketing-case-study-tim-hortons-branding",
    image: "/img/case-studies/tim-hortons/tim-hortons-case-study-thumb.webp",
    title: "Tim Hortons",
    description: "Tim Hortons®, a global iconic coffee",
  },
  {
    slug: "digital-marketing-case-study-kaziranga-university-branding",
    image: "/img/case-studies/kaziranga-university/kaziranga-case-study-thumb.webp",
    title: "It all starts at Kaziranga University",
    description: "Kaziranga University, a prestigious educational",
  },
  {
    slug: "digital-marketing-ugc-case-study-thanks-to-suhana",
    image: "/img/thanx__to__suhana.webp",
    title: "#ThanksToSuhana",
    description: "To leverage User Generated Content...",
  },
  {
    slug: "digital-marketing-case-study-paltan-sobat-aarti",
    image: "/img/Case_Studies_paltan.webp",
    title: "#PaltanSobatAarti",
    description: "Engage with the fans during...",
  },
  {
    slug: "digital-marketing-case-study-puneri-paltan",
    image: "/img/pune-study.webp",
    title: "ABC OF KABADDI",
    description: "Increase fan loyalty and engagement",
  },
  {
    slug: "digital-marketing-case-study-bengal-warriors",
    image: "/img/bengal-warriors-study.webp",
    title: "workout with the warriors",
    description: "Sustaining off-season buzz and fan loyalty.",
  },
  {
    slug: "digital-marketing-case-study-readify",
    image: "/img/case_study2.webp",
    title: "Connecting Through Design",
    description: "To create a visual identity for Readify to evoke...",
  }
];

export const rightColumnProjects = [
  {
    slug: "digital-marketing-case-study-kumar-resorts",
    image: "/img/case-studies/kumar-resorts/kumar-resorts-thumb-img.webp",
    title: "From Nostalgia to New Beginnings",
    description: "For every Millennial in Mumbai and Pune...",
  },
  {
    slug: "digital-marketing-case-study-patna-pirates",
    image: "/img/case-studies/patna-pirates/patna-pirates-case-study-thumb.webp",
    title: "Redefining Sports Marketing",
    description: "Patna Pirates is one of the most successful...",
  },
  {
    slug: "digital-marketing-case-study-puneri-paltan-branding",
    image: "/img/case-studies/puneri-paltan-branding/puneri-paltan-case-study-thumb.webp",
    title: "Spirit of Pune Pride of Maharashtra",
    description: "Carrying forward Maharashtra's Kabaddi legacy has been Puneri Paltan's...",
  },
  {
    slug: "digital-marketing-instagram-ar-filter-case-study",
    image: "/img/pp__contest__case__study.webp",
    title: "Instagram AR Filter",
    description: "How a sports brand leveraged AR filter",
  },
  {
    slug: "social-media-case-study-ipl-indian-food-league-campaign",
    image: "/img/case_study_goldee.webp",
    title: "Increase engagement around IPL 2020",
    description: "Increase engagement around IPL 2020",
  },
  {
    slug: "digital-marketing-case-study-reevive",
    image: "/img/revive_case_study.webp",
    title: "#ReeviveALife",
    description: "To build an unique Crowd-Funding Platform...",
  },
  {
    slug: "digital-marketing-case-study-colors-of-freedom",
    image: "/img/indigo-case-study.webp",
    title: "Colours Of Freedom",
    description: "Promote Muktrang (Colours of Freedom) an initiative by Indigo Paints...",
  },
  {
    slug: "digital-marketing-case-study-shades-of-summer",
    image: "/img/case-study-shades.webp",
    title: "#Shadesofsummer",
    description: "Generate excitement & sales...",
  }
];
