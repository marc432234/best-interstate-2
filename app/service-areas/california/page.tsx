import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "California Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for California and compare local, statewide, and interstate relocation support.",
  "keywords": "California moving quotes,California movers,California relocation services,California moving estimate,California interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/california/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__california", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__california" />;
}
