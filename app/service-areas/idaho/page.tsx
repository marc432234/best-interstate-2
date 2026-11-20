import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Idaho Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Idaho and compare local, statewide, and interstate relocation support.",
  "keywords": "Idaho moving quotes,Idaho movers,Idaho relocation services,Idaho moving estimate,Idaho interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/idaho/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__idaho", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__idaho" />;
}
