import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Massachusetts Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Massachusetts and compare local, statewide, and interstate relocation support.",
  "keywords": "Massachusetts moving quotes,Massachusetts movers,Massachusetts relocation services,Massachusetts moving estimate,Massachusetts interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/massachusetts/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__massachusetts", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__massachusetts" />;
}
