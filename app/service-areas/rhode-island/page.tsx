import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Rhode Island Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Rhode Island and compare local, statewide, and interstate relocation support.",
  "keywords": "Rhode Island moving quotes,Rhode Island movers,Rhode Island relocation services,Rhode Island moving estimate,Rhode Island interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/rhode-island/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__rhode-island", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__rhode-island" />;
}
