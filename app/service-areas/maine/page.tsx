import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Maine Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Maine and compare local, statewide, and interstate relocation support.",
  "keywords": "Maine moving quotes,Maine movers,Maine relocation services,Maine moving estimate,Maine interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/maine/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__maine", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__maine" />;
}
