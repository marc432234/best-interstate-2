import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Piano Transportation | Best Interstate Moving + Storage",
  "description": "Request piano transportation support for specialty items that need more planning and careful handling.",
  "keywords": "Piano Transportation,Piano Transportation quotes,Piano Transportation providers,moving and storage services,moving quote comparison,interstate moving quotes",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/piano-transportation/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("piano-transportation", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="piano-transportation" />;
}
