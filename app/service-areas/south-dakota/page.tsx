import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "South Dakota Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for South Dakota and compare local, statewide, and interstate relocation support.",
  "keywords": "South Dakota moving quotes,South Dakota movers,South Dakota relocation services,South Dakota moving estimate,South Dakota interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/south-dakota/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__south-dakota", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__south-dakota" />;
}
