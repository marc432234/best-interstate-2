import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Tennessee Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Tennessee and compare local, statewide, and interstate relocation support.",
  "keywords": "Tennessee moving quotes,Tennessee movers,Tennessee relocation services,Tennessee moving estimate,Tennessee interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/tennessee/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__tennessee", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__tennessee" />;
}
