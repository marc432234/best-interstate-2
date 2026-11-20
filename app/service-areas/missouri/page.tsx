import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Missouri Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Missouri and compare local, statewide, and interstate relocation support.",
  "keywords": "Missouri moving quotes,Missouri movers,Missouri relocation services,Missouri moving estimate,Missouri interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/missouri/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__missouri", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__missouri" />;
}
