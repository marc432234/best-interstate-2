import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Services | Best Interstate Moving + Storage",
  "description": "Compare household, commercial, corporate, and vehicle transport options through one streamlined quote request.",
  "keywords": "Services,Moving Services,Services quotes,Services providers,moving and storage services,moving quote comparison,interstate moving quotes,Residential Moves,Business Relocation,Corporate Support",
  "alternates": {
    "canonical": "https://www.bestinterstatemovingandstorage.com/services/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("services", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="services" />;
}
