import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "West Virginia Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for West Virginia and compare local, statewide, and interstate relocation support.",
  "keywords": "West Virginia moving quotes,West Virginia movers,West Virginia relocation services,West Virginia moving estimate,West Virginia interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/west-virginia/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__west-virginia", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__west-virginia" />;
}
