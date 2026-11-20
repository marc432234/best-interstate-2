import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Corporate Relocation Services | Best Interstate Moving + Storage",
  "description": "To get your instant Free Quote Now, fill out our contact form.",
  "keywords": "Corporate Relocation Services,Employee Mobility,Corporate Relocation Services quotes,Corporate Relocation Services providers,moving and storage services,moving quote comparison,interstate moving quotes,Safe+Timely Delivery",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/corporate-relocation/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("corporate-relocation", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="corporate-relocation" />;
}
