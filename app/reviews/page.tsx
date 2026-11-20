import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Reviews | Best Interstate Moving + Storage",
  "description": "To get your instant Free Quote Now, fill out our contact form.",
  "keywords": "Reviews,What Customers Say,Reviews quotes,Reviews providers,moving and storage services,moving quote comparison,interstate moving quotes,Quote Comparison,Clear Communication,Time Savings",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/reviews/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("reviews", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="reviews" />;
}
