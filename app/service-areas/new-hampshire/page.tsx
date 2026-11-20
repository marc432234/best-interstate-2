import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "New Hampshire Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for New Hampshire and compare local, statewide, and interstate relocation support.",
  "keywords": "New Hampshire moving quotes,New Hampshire movers,New Hampshire relocation services,New Hampshire moving estimate,New Hampshire interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/new-hampshire/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__new-hampshire", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__new-hampshire" />;
}
