import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Minnesota Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Minnesota and compare local, statewide, and interstate relocation support.",
  "keywords": "Minnesota moving quotes,Minnesota movers,Minnesota relocation services,Minnesota moving estimate,Minnesota interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/minnesota/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__minnesota", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__minnesota" />;
}
