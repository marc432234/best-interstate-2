import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Alaska Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Alaska and compare local, statewide, and interstate relocation support.",
  "keywords": "Alaska moving quotes,Alaska movers,Alaska relocation services,Alaska moving estimate,Alaska interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/alaska/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__alaska", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__alaska" />;
}
