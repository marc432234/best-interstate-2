import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Custom Crating | Best Interstate Moving + Storage",
  "description": "Plan custom crating for fragile, oversized, or high-value items that need extra protection.",
  "keywords": "Custom Crating,Custom Crating quotes,Custom Crating providers,moving and storage services,moving quote comparison,interstate moving quotes",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/custom-crating/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("custom-crating", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="custom-crating" />;
}
