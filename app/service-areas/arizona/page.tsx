import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Arizona Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Arizona and compare local, statewide, and interstate relocation support.",
  "keywords": "Arizona moving quotes,Arizona movers,Arizona relocation services,Arizona moving estimate,Arizona interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/arizona/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__arizona", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__arizona" />;
}
