import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "North Dakota Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for North Dakota and compare local, statewide, and interstate relocation support.",
  "keywords": "North Dakota moving quotes,North Dakota movers,North Dakota relocation services,North Dakota moving estimate,North Dakota interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/north-dakota/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__north-dakota", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__north-dakota" />;
}
