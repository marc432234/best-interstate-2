import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Packing Services | Best Interstate Moving + Storage",
  "description": "Compare packing and unpacking support based on the scope, timing, and labor needs of your move.",
  "keywords": "Packing Services,Packing Services quotes,Packing Services providers,moving and storage services,moving quote comparison,interstate moving quotes",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/packing/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("packing", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="packing" />;
}
