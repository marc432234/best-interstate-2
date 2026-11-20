import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Utah Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Utah and compare local, statewide, and interstate relocation support.",
  "keywords": "Utah moving quotes,Utah movers,Utah relocation services,Utah moving estimate,Utah interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/utah/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__utah", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__utah" />;
}
