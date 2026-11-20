import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Service Areas | Best Interstate Moving + Storage",
  "description": "Browse an interactive United States service area map and open dedicated state pages with moving quote forms.",
  "keywords": "service areas,moving quotes by state,united states moving map,state moving quote pages,moving estimate by state",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas" />;
}
