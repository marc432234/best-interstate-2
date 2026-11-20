import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Oregon Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Oregon and compare local, statewide, and interstate relocation support.",
  "keywords": "Oregon moving quotes,Oregon movers,Oregon relocation services,Oregon moving estimate,Oregon interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/oregon/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__oregon", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__oregon" />;
}
