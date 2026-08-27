const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const sectors = [
  { id: "all", name: "All Sectors" },
  { id: "fmcg", name: "FMCG / F&B" },
  { id: "retail", name: "Retail & E-commerce" },
  { id: "hospitality", name: "Hospitality & Leisure" },
  { id: "corporate", name: "Corporate & Services" }
];

export const clients = [
  { name: "Hell Energy Drinks", logo: `${basePath}/img/clientele/top_brands/hell-energy-logo.webp`, sector: "fmcg" },
  { name: "Murugappa Group", logo: `${basePath}/img/clientele/top_brands/murugappa-logo.webp`, sector: "corporate" },
  { name: "Tim Hortons", logo: `${basePath}/img/clientele/top_brands/tim_hortons.webp`, sector: "fmcg" },
  { name: "Epl Global", logo: `${basePath}/img/clientele/top_brands/essel.webp`, sector: "corporate" },
  { name: "Goldiee Group", logo: `${basePath}/img/clientele/top_brands/goldiee_logo.webp`, sector: "fmcg" },
  { name: "Puneri Paltan", logo: `${basePath}/img/clientele/top_brands/puneripaltan_logo.webp`, sector: "hospitality" },
  { name: "Hockey India", logo: `${basePath}/img/clientele/top_brands/hockey-india.webp`, sector: "hospitality" },
  { name: "Times Fashion Week", logo: `${basePath}/img/clientele/top_brands/times-fashion-week-logo.webp`, sector: "corporate" },
  { name: "Haldiram", logo: `${basePath}/img/clientele/top_brands/haldiram-logo.webp`, sector: "fmcg" },
  { name: "Airtel Business", logo: `${basePath}/img/clientele/top_brands/airtel_business.webp`, sector: "corporate" },
  { name: "Cadini", logo: `${basePath}/img/clientele/top_brands/cadini-logo.webp`, sector: "retail" },
  { name: "DCB Bank", logo: `${basePath}/img/clientele/top_brands/dcb_logo.webp`, sector: "corporate" }
];

export const recentWork = [
  { id: 1, title: "Tim Hortons Launch", img: `${basePath}/img/home/who-we-are-1.webp`, category: "Social Media" },
  { id: 2, title: "Kumar Resorts Promotion", img: `${basePath}/img/home/who-we-are-2.webp`, category: "Design" },
  { id: 3, title: "Bata Festive Campaign", img: `${basePath}/img/home/who-we-are-1.webp`, category: "Digital Strategy" },
  { id: 4, title: "JioNews App Launch", img: `${basePath}/img/home/who-we-are-2.webp`, category: "Development" }
];

export const carouselImages = [
  { src: `${basePath}/img/digital/social-meida-creatives/square-size/3-small.webp`, title: "Social Media Creative 3" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/4-big.webp`, title: "Social Media Creative 4" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/5-big.webp`, title: "Social Media Creative 5" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/6-big.webp`, title: "Social Media Creative 6" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/7-big.webp`, title: "Social Media Creative 7" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/8-big.webp`, title: "Social Media Creative 8" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/9-big.webp`, title: "Social Media Creative 9" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/10-big.webp`, title: "Social Media Creative 10" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/12-big.webp`, title: "Social Media Creative 12" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/13-big.webp`, title: "Social Media Creative 13" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/11-big.webp`, title: "Social Media Creative 11" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/14-big.webp`, title: "Social Media Creative 14" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/15-big.webp`, title: "Social Media Creative 15" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/1-big.webp`, title: "Social Media Creative 1" },
  { src: `${basePath}/img/digital/social-meida-creatives/full-size/2-big.webp`, title: "Social Media Creative 2" }
];

