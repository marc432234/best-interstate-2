import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Michigan Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Michigan and compare local, statewide, and interstate relocation support.",
  "keywords": "Michigan moving quotes,Michigan movers,Michigan relocation services,Michigan moving estimate,Michigan interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/michigan/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__michigan", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__michigan" />;
}
