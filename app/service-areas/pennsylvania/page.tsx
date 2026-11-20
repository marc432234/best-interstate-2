import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Pennsylvania Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Pennsylvania and compare local, statewide, and interstate relocation support.",
  "keywords": "Pennsylvania moving quotes,Pennsylvania movers,Pennsylvania relocation services,Pennsylvania moving estimate,Pennsylvania interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/pennsylvania/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__pennsylvania", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__pennsylvania" />;
}
