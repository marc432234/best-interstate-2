import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Montana Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Montana and compare local, statewide, and interstate relocation support.",
  "keywords": "Montana moving quotes,Montana movers,Montana relocation services,Montana moving estimate,Montana interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/montana/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__montana", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__montana" />;
}
