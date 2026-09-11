import { connectToDatabase } from "./mongodb";
import { ClienteleCategory, ClienteleItem } from "../models/Clientele";
import clienteleLogos from "../data/clienteleLogos.json";
import { clients as staticClients, sectors as staticSectors } from "../data/clientele";

const defaultCategories = [
  { id: "top-brands", name: "Top Brands", order: 1 },
  { id: "beauty", name: "Beauty", order: 2 },
  { id: "bfsi", name: "BFSI", order: 3 },
  { id: "fashion-retail", name: "Fashion & Retail", order: 4 },
  { id: "materials-manufacturing", name: "Materials Manufacturing", order: 5 },
  { id: "education", name: "Education", order: 6 },
  { id: "fmcg", name: "FMCG", order: 7 },
  { id: "health", name: "Health & Pharma", order: 8 },
  { id: "restaurants", name: "Restaurants", order: 9 },
  { id: "real-estate", name: "Real Estate", order: 10 },
  { id: "sports", name: "Sports", order: 11 },
  { id: "sporting-equipments", name: "Sporting Equipments", order: 12 },
  { id: "B2B", name: "B2B", order: 13 },
  { id: "travel-hospitality", name: "Travel-Hospitality", order: 14 },
  { id: "web-mobile-IT", name: "Web-App-IT", order: 15 },
  { id: "events", name: "Events & Entertainment", order: 16 },
  { id: "non-profit-organization", name: "Non Profit Organization", order: 17 },
  { id: "others", name: "Others", order: 18 },
];

function formatBrandName(logoPath) {
  if (!logoPath) return "Client";
  const filename = logoPath.split("/").pop() || "";
  let raw = filename
    .replace("-logo", "")
    .replace("_logo", "")
    .replace("-big", "")
    .replace("_new", "")
    .replace("_new1", "")
    .replace(/\.webp|\.png|\.jpg|\.svg/i, "");

  // Custom human readable map
  const nameMap = {
    "hell-energy": "Hell Energy Drinks",
    "murugappa": "Murugappa Group",
    "tim_hortons": "Tim Hortons",
    "essel": "EPL Global",
    "goldiee": "Goldiee Group",
    "goldee-masale": "Goldiee Masale",
    "puneripaltan": "Puneri Paltan",
    "hockey-india": "Hockey India",
    "times-fashion-week": "Times Fashion Week",
    "haldiram": "Haldiram",
    "airtel_business": "Airtel Business",
    "cadini": "Cadini",
    "dcb": "DCB Bank",
    "revae": "Revae",
    "ku": "Kaziranga University",
    "cravana": "Cravana",
    "parrys": "Parrys",
    "paawak": "Paawak",
    "sambhv": "Sambhv Steel",
    "fibreel": "Fibreel",
    "tuffex": "Tuffex",
    "iims": "IIMS",
    "blue-dart": "Blue Dart",
    "chambal-grariyals": "Chambal Gariyals",
    "bundelkhand-bulls": "Bundelkhand Bulls",
    "CarerForCancer": "Carer For Cancer",
  };

  if (nameMap[raw]) return nameMap[raw];

  return raw
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Generate initial client list from JSON and Top Brands
function buildInitialClients() {
  const list = [];
  let currentOrder = 1;
  const topBrandLogos = new Set(clienteleLogos["top-brands"] || []);

  // First process top-brands
  for (const catId of Object.keys(clienteleLogos)) {
    const logos = clienteleLogos[catId] || [];
    logos.forEach((logoPath, idx) => {
      const isTopBrand = catId === "top-brands" || topBrandLogos.has(logoPath);
      const name = formatBrandName(logoPath);
      const id = `${catId}-${idx}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`;

      list.push({
        id,
        _id: id,
        name,
        logo: logoPath,
        category: catId,
        showOnHome: isTopBrand,
        order: currentOrder++,
      });
    });
  }

  return list;
}

// Initialize in-memory fallback stores
if (!global._fallbackClientCategories) {
  global._fallbackClientCategories = [...defaultCategories];
}

if (!global._fallbackClients) {
  global._fallbackClients = buildInitialClients();
}

export function getFallbackClientCategories() {
  return global._fallbackClientCategories;
}

export function getFallbackClients() {
  return global._fallbackClients;
}

let isSeeding = false;
export async function ensureClienteleSeeded() {
  if (isSeeding) return;
  try {
    await connectToDatabase();
    const catCount = await ClienteleCategory.countDocuments();
    if (catCount === 0 && global._fallbackClientCategories?.length > 0) {
      isSeeding = true;
      await ClienteleCategory.insertMany(global._fallbackClientCategories, { ordered: false });
    }

    const clientCount = await ClienteleItem.countDocuments();
    if (clientCount === 0 && global._fallbackClients?.length > 0) {
      isSeeding = true;
      const formatted = global._fallbackClients.map((c) => ({
        name: c.name,
        logo: c.logo,
        category: c.category,
        showOnHome: Boolean(c.showOnHome),
        order: c.order || 0,
      }));
      await ClienteleItem.insertMany(formatted, { ordered: false });
    }
  } catch (err) {
    console.warn("[ensureClienteleSeeded] Seeding note:", err.message);
  } finally {
    isSeeding = false;
  }
}

export async function getAllCategories() {
  try {
    await connectToDatabase();
    const categories = await ClienteleCategory.find({}).sort({ order: 1 }).lean();
    if (categories && categories.length > 0) {
      return categories.map((c) => ({
        id: c.id,
        name: c.name,
        order: c.order || 0,
        description: c.description || "",
      }));
    }
  } catch (err) {
    console.warn("[getAllCategories] Using fallback store:", err.message);
  }
  return [...global._fallbackClientCategories].sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getAllClients(filter = {}) {
  try {
    await connectToDatabase();
    let query = {};
    if (filter.category && filter.category !== "all") {
      query.category = filter.category;
    }
    if (filter.showOnHome !== undefined) {
      query.showOnHome = filter.showOnHome;
    }

    const docs = await ClienteleItem.find(query).sort({ order: 1, createdAt: 1 }).lean();
    if (docs && docs.length > 0) {
      return docs.map((doc) => ({
        id: doc._id.toString(),
        _id: doc._id.toString(),
        name: doc.name,
        logo: doc.logo,
        category: doc.category,
        showOnHome: Boolean(doc.showOnHome),
        order: doc.order || 0,
      }));
    }
  } catch (err) {
    console.warn("[getAllClients] Using fallback store:", err.message);
  }

  let result = [...global._fallbackClients];
  if (filter.category && filter.category !== "all") {
    result = result.filter((c) => c.category === filter.category);
  }
  if (filter.showOnHome !== undefined) {
    result = result.filter((c) => Boolean(c.showOnHome) === Boolean(filter.showOnHome));
  }
  return result.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getClienteleStats() {
  const categories = await getAllCategories();
  const clients = await getAllClients();
  const homeCount = clients.filter((c) => c.showOnHome).length;

  return {
    totalClients: clients.length,
    totalCategories: categories.length,
    homepageClientsCount: homeCount,
  };
}
