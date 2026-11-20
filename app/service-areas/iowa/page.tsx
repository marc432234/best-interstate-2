import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Iowa Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Iowa and compare local, statewide, and interstate relocation support.",
  "keywords": "Iowa moving quotes,Iowa movers,Iowa relocation services,Iowa moving estimate,Iowa interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/iowa/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__iowa", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__iowa" />;
}
