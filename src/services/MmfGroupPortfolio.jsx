"use client";

import React from "react";
import ProductionGalleryTemplate from "../app/components/ui/ProductionGalleryTemplate";
import { productionPortfoliosData } from "../data/productionPortfolios";

export default function MmfGroupPortfolio() {
  const data = productionPortfoliosData["mmfgroup-corporate-warehouse-videoshoot"];

  return (
    <ProductionGalleryTemplate
      client={data.client}
      bannerTitle={data.bannerTitle}
      projectSummary={data.projectSummary}
      subheadQuote={data.subheadQuote}
      items={data.items}
      prevPortfolio={data.prevPortfolio}
      nextPortfolio={data.nextPortfolio}
      showTabs={data.showTabs}
    />
  );
}
