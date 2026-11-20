import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Commercial Moving Services | Best Interstate Moving + Storage",
  "description": "To get your instant Free Quote Now, fill out our contact form.",
  "keywords": "Commercial Moving Services,Business Relocation,Commercial Moving Services quotes,Commercial Moving Services providers,moving and storage services,moving quote comparison,interstate moving quotes,Business Movers,Office Moving Service",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/commercial-business-moving/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("commercial-business-moving", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="commercial-business-moving" />;
}
