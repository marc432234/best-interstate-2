import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "New York Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for New York and compare local, statewide, and interstate relocation support.",
  "keywords": "New York moving quotes,New York movers,New York relocation services,New York moving estimate,New York interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/new-york/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__new-york", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__new-york" />;
}
