import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Kansas Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Kansas and compare local, statewide, and interstate relocation support.",
  "keywords": "Kansas moving quotes,Kansas movers,Kansas relocation services,Kansas moving estimate,Kansas interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/kansas/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__kansas", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__kansas" />;
}
