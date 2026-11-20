import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Delaware Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Delaware and compare local, statewide, and interstate relocation support.",
  "keywords": "Delaware moving quotes,Delaware movers,Delaware relocation services,Delaware moving estimate,Delaware interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/delaware/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__delaware", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__delaware" />;
}
