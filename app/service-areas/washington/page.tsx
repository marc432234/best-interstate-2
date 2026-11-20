import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Washington Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Washington and compare local, statewide, and interstate relocation support.",
  "keywords": "Washington moving quotes,Washington movers,Washington relocation services,Washington moving estimate,Washington interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/washington/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__washington", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__washington" />;
}
