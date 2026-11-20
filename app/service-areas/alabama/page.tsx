import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Alabama Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Alabama and compare local, statewide, and interstate relocation support.",
  "keywords": "Alabama moving quotes,Alabama movers,Alabama relocation services,Alabama moving estimate,Alabama interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/alabama/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__alabama", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__alabama" />;
}
