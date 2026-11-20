import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Oklahoma Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Oklahoma and compare local, statewide, and interstate relocation support.",
  "keywords": "Oklahoma moving quotes,Oklahoma movers,Oklahoma relocation services,Oklahoma moving estimate,Oklahoma interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/oklahoma/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__oklahoma", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__oklahoma" />;
}
