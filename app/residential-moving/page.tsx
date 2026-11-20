import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Residential Moving Services | Best Interstate Moving + Storage",
  "description": "To get your instant Free Quote Now. fill out our contact form.",
  "keywords": "Residential Moving Services,Home Moves,Residential Moving Services quotes,Residential Moving Services providers,moving and storage services,moving quote comparison,interstate moving quotes,Safe+Timely Delivery",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/residential-moving/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("residential-moving", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="residential-moving" />;
}
