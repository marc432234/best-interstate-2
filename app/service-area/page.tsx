import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Service Areas | Best Interstate Moving + Storage",
  "description": "Browse an interactive United States service area map and open dedicated state pages with moving company listings.",
  "keywords": "service areas,moving companies by state,united states moving map,state moving company listings",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-area", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-area" />;
}
