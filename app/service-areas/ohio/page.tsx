import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Ohio Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Ohio and compare local, statewide, and interstate relocation support.",
  "keywords": "Ohio moving quotes,Ohio movers,Ohio relocation services,Ohio moving estimate,Ohio interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/ohio/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__ohio", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__ohio" />;
}
