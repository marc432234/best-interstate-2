import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Moving Calculator | Best Interstate Moving + Storage",
  "description": "Use our moving calculator to estimate interstate moving costs, transit time, crew size, packing needs, and add-on services.",
  "keywords": "moving calculator,moving cost estimator,interstate moving calculator,moving quote planner,moving budget estimator",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/moving-calculator/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("moving-calculator", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="moving-calculator" />;
}
