import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Mississippi Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Mississippi and compare local, statewide, and interstate relocation support.",
  "keywords": "Mississippi moving quotes,Mississippi movers,Mississippi relocation services,Mississippi moving estimate,Mississippi interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/mississippi/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__mississippi", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__mississippi" />;
}
