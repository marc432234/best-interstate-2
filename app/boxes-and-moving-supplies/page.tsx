import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Boxes + moving supplies | Best Interstate Moving + Storage",
  "description": "Request piano transportation support for specialty items that need more planning and careful handling.",
  "keywords": "Boxes + moving supplies,Boxes + moving supplies quotes,Boxes + moving supplies providers,moving and storage services,moving quote comparison,interstate moving quotes",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/boxes-and-moving-supplies/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("boxes-and-moving-supplies", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="boxes-and-moving-supplies" />;
}
