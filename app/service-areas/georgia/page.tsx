import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Georgia Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Georgia and compare local, statewide, and interstate relocation support.",
  "keywords": "Georgia moving quotes,Georgia movers,Georgia relocation services,Georgia moving estimate,Georgia interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/georgia/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__georgia", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__georgia" />;
}
