import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Virginia Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Virginia and compare local, statewide, and interstate relocation support.",
  "keywords": "Virginia moving quotes,Virginia movers,Virginia relocation services,Virginia moving estimate,Virginia interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/virginia/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__virginia", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__virginia" />;
}
