import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Nevada Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Nevada and compare local, statewide, and interstate relocation support.",
  "keywords": "Nevada moving quotes,Nevada movers,Nevada relocation services,Nevada moving estimate,Nevada interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/nevada/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__nevada", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__nevada" />;
}
