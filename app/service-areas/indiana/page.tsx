import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Indiana Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Indiana and compare local, statewide, and interstate relocation support.",
  "keywords": "Indiana moving quotes,Indiana movers,Indiana relocation services,Indiana moving estimate,Indiana interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/indiana/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__indiana", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__indiana" />;
}
