import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "New Jersey Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for New Jersey and compare local, statewide, and interstate relocation support.",
  "keywords": "New Jersey moving quotes,New Jersey movers,New Jersey relocation services,New Jersey moving estimate,New Jersey interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/new-jersey/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__new-jersey", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__new-jersey" />;
}
