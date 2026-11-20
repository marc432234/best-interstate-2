import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Hawaii Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Hawaii and compare local, statewide, and interstate relocation support.",
  "keywords": "Hawaii moving quotes,Hawaii movers,Hawaii relocation services,Hawaii moving estimate,Hawaii interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/hawaii/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__hawaii", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__hawaii" />;
}
