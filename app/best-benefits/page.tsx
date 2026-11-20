import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Best Benefits | Best Interstate Moving + Storage",
  "description": "To get your instant Free Quote Now, fill out our contact form.",
  "keywords": "Best Benefits,Why Use The Platform,Best Benefits quotes,Best Benefits providers,moving and storage services,moving quote comparison,interstate moving quotes,Centralized Request,Faster Comparison,Broader Support",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/best-benefits/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("best-benefits", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="best-benefits" />;
}
