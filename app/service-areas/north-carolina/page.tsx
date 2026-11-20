import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "North Carolina Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for North Carolina and compare local, statewide, and interstate relocation support.",
  "keywords": "North Carolina moving quotes,North Carolina movers,North Carolina relocation services,North Carolina moving estimate,North Carolina interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/north-carolina/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__north-carolina", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__north-carolina" />;
}
