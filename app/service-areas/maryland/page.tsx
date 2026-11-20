import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Maryland Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Maryland and compare local, statewide, and interstate relocation support.",
  "keywords": "Maryland moving quotes,Maryland movers,Maryland relocation services,Maryland moving estimate,Maryland interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/maryland/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__maryland", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__maryland" />;
}
