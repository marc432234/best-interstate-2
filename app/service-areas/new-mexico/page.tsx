import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "New Mexico Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for New Mexico and compare local, statewide, and interstate relocation support.",
  "keywords": "New Mexico moving quotes,New Mexico movers,New Mexico relocation services,New Mexico moving estimate,New Mexico interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/new-mexico/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__new-mexico", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__new-mexico" />;
}
