import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Kentucky Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Kentucky and compare local, statewide, and interstate relocation support.",
  "keywords": "Kentucky moving quotes,Kentucky movers,Kentucky relocation services,Kentucky moving estimate,Kentucky interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/kentucky/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__kentucky", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__kentucky" />;
}
