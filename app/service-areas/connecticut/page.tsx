import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Connecticut Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Connecticut and compare local, statewide, and interstate relocation support.",
  "keywords": "Connecticut moving quotes,Connecticut movers,Connecticut relocation services,Connecticut moving estimate,Connecticut interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/connecticut/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__connecticut", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__connecticut" />;
}
