import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Auto Transport Services | Best Interstate Moving + Storage",
  "description": "To get your instant Free Quote Now, fill out our contact form.",
  "keywords": "Auto Transport Services,Vehicle Shipping,Auto Transport Services quotes,Auto Transport Services providers,moving and storage services,moving quote comparison,interstate moving quotes,SOLUTIONS FOR ALL VEHICLES",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/auto-transportation/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("auto-transportation", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="auto-transportation" />;
}
