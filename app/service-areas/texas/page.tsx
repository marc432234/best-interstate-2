import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Texas Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Texas and compare local, statewide, and interstate relocation support.",
  "keywords": "Texas moving quotes,Texas movers,Texas relocation services,Texas moving estimate,Texas interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/texas/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__texas", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__texas" />;
}
