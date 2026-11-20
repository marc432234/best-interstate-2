import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Nebraska Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Nebraska and compare local, statewide, and interstate relocation support.",
  "keywords": "Nebraska moving quotes,Nebraska movers,Nebraska relocation services,Nebraska moving estimate,Nebraska interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/nebraska/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__nebraska", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__nebraska" />;
}
