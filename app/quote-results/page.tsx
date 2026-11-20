import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Recommended Moving Companies | Best Interstate Moving + Storage",
  "description": "Review a shortlist of moving and storage providers after submitting your quote request.",
  "keywords": "moving company results,recommended movers,moving quote matches,moving provider list,storage provider matches",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/quote-results/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("quote-results", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="quote-results" />;
}
