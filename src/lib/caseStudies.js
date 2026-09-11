import { connectToDatabase } from "./mongodb";
import CaseStudy from "../models/CaseStudy";
import { caseStudiesBrandingData } from "../data/caseStudiesBrandingData";

let isSeeding = false;

// Initialize in-memory fallback case study store
if (!global._fallbackCaseStudies) {
  global._fallbackCaseStudies = Object.entries(caseStudiesBrandingData).map(
    ([slugKey, cs]) => ({
      _id: slugKey,
      slug: cs.slug || slugKey,
      client: cs.client || cs.title || "Client Brand",
      title: cs.title || cs.client || "Case Study",
      breadcrumbText: cs.breadcrumbText || cs.title || "",
      services: cs.services || "Branding, Graphic Design, Print, Digital",
      heroType: cs.heroType || "banner",
      heroTitle: cs.heroTitle || "",
      heroBg: cs.heroBg || "",
      topBannerImg: cs.topBannerImg || "",
      brandInfoImg: cs.brandInfoImg || "",
      storyVideoUrl: cs.storyVideoUrl || "",
      description: Array.isArray(cs.description) ? cs.description : [cs.description || ""].filter(Boolean),
      quote: cs.quote || "",
      stats: Array.isArray(cs.stats) ? cs.stats : [],
      creativeGrid: Array.isArray(cs.creativeGrid) ? cs.creativeGrid : [],
      status: "published",
      metaTitle: cs.metaTitle || cs.title || "",
      metaDescription: cs.metaDescription || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  );
}

export function getFallbackCaseStudies() {
  return global._fallbackCaseStudies;
}

export async function ensureCaseStudiesSeeded() {
  if (isSeeding) return;
  try {
    await connectToDatabase();
    const count = await CaseStudy.countDocuments();
    if (
      count === 0 &&
      Array.isArray(global._fallbackCaseStudies) &&
      global._fallbackCaseStudies.length > 0
    ) {
      isSeeding = true;
      const formattedStatic = global._fallbackCaseStudies.map((cs) => ({
        slug: cs.slug,
        client: cs.client,
        title: cs.title,
        breadcrumbText: cs.breadcrumbText || "",
        services: cs.services || "",
        heroType: cs.heroType || "banner",
        heroTitle: cs.heroTitle || "",
        heroBg: cs.heroBg || "",
        topBannerImg: cs.topBannerImg || "",
        brandInfoImg: cs.brandInfoImg || "",
        storyVideoUrl: cs.storyVideoUrl || "",
        description: cs.description || [],
        quote: cs.quote || "",
        stats: cs.stats || [],
        creativeGrid: cs.creativeGrid || [],
        status: cs.status || "published",
        metaTitle: cs.metaTitle || "",
        metaDescription: cs.metaDescription || "",
      }));
      await CaseStudy.insertMany(formattedStatic, { ordered: false });
    }
  } catch (err) {
    console.warn("[ensureCaseStudiesSeeded] Error seeding case studies:", err.message);
  } finally {
    isSeeding = false;
  }
}

export async function getCaseStudies({
  status = "all",
  search = "",
  limit = 0,
  page = 1,
} = {}) {
  try {
    await connectToDatabase();
    await ensureCaseStudiesSeeded();

    const query = {};
    if (status && status !== "all" && status !== "All") {
      query.status = status.toLowerCase();
    }

    if (search && search.trim()) {
      const q = search.trim();
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { client: { $regex: q, $options: "i" } },
        { services: { $regex: q, $options: "i" } },
        { slug: { $regex: q, $options: "i" } },
      ];
    }

    const total = await CaseStudy.countDocuments(query);

    let dbQuery = CaseStudy.find(query).sort({ createdAt: -1 });
    if (limit > 0) {
      const skip = (page - 1) * limit;
      dbQuery = dbQuery.skip(skip).limit(limit);
    }

    const studies = await dbQuery.lean();

    return {
      success: true,
      data: studies.map((cs) => ({
        ...cs,
        _id: cs._id.toString(),
      })),
      pagination: {
        total,
        page,
        limit: limit || total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      },
    };
  } catch (err) {
    console.warn("[getCaseStudies] MongoDB fallback to in-memory store:", err.message);

    let list = [...global._fallbackCaseStudies];

    if (status && status !== "all" && status !== "All") {
      list = list.filter((cs) => cs.status === status.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (cs) =>
          cs.title?.toLowerCase().includes(q) ||
          cs.client?.toLowerCase().includes(q) ||
          cs.services?.toLowerCase().includes(q) ||
          cs.slug?.toLowerCase().includes(q)
      );
    }

    const total = list.length;
    let paginatedList = list;
    if (limit > 0) {
      const skip = (page - 1) * limit;
      paginatedList = list.slice(skip, skip + limit);
    }

    return {
      success: true,
      data: paginatedList,
      pagination: {
        total,
        page,
        limit: limit || total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      },
    };
  }
}

export async function getCaseStudyBySlug(slug) {
  if (!slug) return null;
  try {
    await connectToDatabase();
    await ensureCaseStudiesSeeded();

    const study = await CaseStudy.findOne({
      $or: [{ slug }, { _id: slug.length === 24 ? slug : null }],
    }).lean();

    if (study) {
      return {
        ...study,
        _id: study._id.toString(),
      };
    }
  } catch (err) {
    console.warn("[getCaseStudyBySlug] MongoDB fallback:", err.message);
  }

  // Fallback
  return (
    global._fallbackCaseStudies.find(
      (cs) => cs.slug === slug || cs._id === slug
    ) || null
  );
}

export async function createCaseStudy(data) {
  try {
    await connectToDatabase();
    await ensureCaseStudiesSeeded();

    const newStudy = await CaseStudy.create(data);
    const created = newStudy.toObject();

    // Update in-memory fallback too
    global._fallbackCaseStudies.unshift({
      ...created,
      _id: created._id.toString(),
    });

    return { success: true, data: { ...created, _id: created._id.toString() } };
  } catch (err) {
    console.warn("[createCaseStudy] MongoDB fallback creation:", err.message);

    const fallbackStudy = {
      _id: "mem_" + Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    global._fallbackCaseStudies.unshift(fallbackStudy);

    return { success: true, data: fallbackStudy };
  }
}

export async function updateCaseStudy(idOrSlug, data) {
  try {
    await connectToDatabase();
    await ensureCaseStudiesSeeded();

    const query =
      idOrSlug.length === 24
        ? { _id: idOrSlug }
        : { $or: [{ slug: idOrSlug }, { _id: idOrSlug }] };

    const updated = await CaseStudy.findOneAndUpdate(
      query,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();

    if (updated) {
      const idx = global._fallbackCaseStudies.findIndex(
        (cs) =>
          cs.slug === idOrSlug ||
          cs._id === idOrSlug ||
          cs._id === updated._id.toString()
      );
      if (idx !== -1) {
        global._fallbackCaseStudies[idx] = {
          ...global._fallbackCaseStudies[idx],
          ...updated,
          _id: updated._id.toString(),
        };
      }
      return { success: true, data: { ...updated, _id: updated._id.toString() } };
    }
  } catch (err) {
    console.warn("[updateCaseStudy] MongoDB fallback update:", err.message);
  }

  // Fallback
  const idx = global._fallbackCaseStudies.findIndex(
    (cs) => cs.slug === idOrSlug || cs._id === idOrSlug
  );
  if (idx !== -1) {
    global._fallbackCaseStudies[idx] = {
      ...global._fallbackCaseStudies[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return { success: true, data: global._fallbackCaseStudies[idx] };
  }

  return { success: false, message: "Case study not found" };
}

export async function deleteCaseStudy(idOrSlug) {
  try {
    await connectToDatabase();
    const query =
      idOrSlug.length === 24
        ? { _id: idOrSlug }
        : { $or: [{ slug: idOrSlug }, { _id: idOrSlug }] };

    await CaseStudy.deleteOne(query);

    global._fallbackCaseStudies = global._fallbackCaseStudies.filter(
      (cs) => cs.slug !== idOrSlug && cs._id !== idOrSlug
    );

    return { success: true, message: "Case study deleted successfully" };
  } catch (err) {
    console.warn("[deleteCaseStudy] MongoDB fallback deletion:", err.message);
    global._fallbackCaseStudies = global._fallbackCaseStudies.filter(
      (cs) => cs.slug !== idOrSlug && cs._id !== idOrSlug
    );
    return { success: true, message: "Case study deleted from memory" };
  }
}
