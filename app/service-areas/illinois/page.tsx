import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Illinois Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Illinois and compare local, statewide, and interstate relocation support.",
  "keywords": "Illinois moving quotes,Illinois movers,Illinois relocation services,Illinois moving estimate,Illinois interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/illinois/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__illinois", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__illinois" />;
}
