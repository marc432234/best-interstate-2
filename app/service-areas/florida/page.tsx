import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Florida Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Florida and compare local, statewide, and interstate relocation support.",
  "keywords": "Florida moving quotes,Florida movers,Florida relocation services,Florida moving estimate,Florida interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/florida/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__florida", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__florida" />;
}
