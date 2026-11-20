import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "South Carolina Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for South Carolina and compare local, statewide, and interstate relocation support.",
  "keywords": "South Carolina moving quotes,South Carolina movers,South Carolina relocation services,South Carolina moving estimate,South Carolina interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/south-carolina/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__south-carolina", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__south-carolina" />;
}
