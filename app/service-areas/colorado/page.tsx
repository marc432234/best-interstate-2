import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Colorado Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Colorado and compare local, statewide, and interstate relocation support.",
  "keywords": "Colorado moving quotes,Colorado movers,Colorado relocation services,Colorado moving estimate,Colorado interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/colorado/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__colorado", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__colorado" />;
}
