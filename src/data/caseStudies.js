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
    image: `${basePath}/img/home/who-we-are-2.png`,
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
    image: `${basePath}/img/home/who-we-are-2.png`,
    category: "Retail Marketing",
    stats: [
      { label: "Store Visits", value: "12K+" },
      { label: "Coupon Redemptions", value: "8.5%" },
      { label: "LFL Sales Growth", value: "+14%" }
    ]
  }
];
