import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Wyoming Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Wyoming and compare local, statewide, and interstate relocation support.",
  "keywords": "Wyoming moving quotes,Wyoming movers,Wyoming relocation services,Wyoming moving estimate,Wyoming interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/wyoming/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__wyoming", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__wyoming" />;
}
