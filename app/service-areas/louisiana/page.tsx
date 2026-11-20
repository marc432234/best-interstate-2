import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Louisiana Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Louisiana and compare local, statewide, and interstate relocation support.",
  "keywords": "Louisiana moving quotes,Louisiana movers,Louisiana relocation services,Louisiana moving estimate,Louisiana interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/louisiana/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__louisiana", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__louisiana" />;
}
