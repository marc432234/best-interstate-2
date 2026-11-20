import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Wisconsin Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Wisconsin and compare local, statewide, and interstate relocation support.",
  "keywords": "Wisconsin moving quotes,Wisconsin movers,Wisconsin relocation services,Wisconsin moving estimate,Wisconsin interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/wisconsin/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__wisconsin", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__wisconsin" />;
}
