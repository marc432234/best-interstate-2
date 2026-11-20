import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Vermont Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Vermont and compare local, statewide, and interstate relocation support.",
  "keywords": "Vermont moving quotes,Vermont movers,Vermont relocation services,Vermont moving estimate,Vermont interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/vermont/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__vermont", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__vermont" />;
}
