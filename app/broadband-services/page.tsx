import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Broadband Services | Best Interstate Moving + Storage",
  "description": "Review broadband setup options so your new home or office is ready when the move is complete.",
  "keywords": "Broadband Services,Broadband Services quotes,Broadband Services providers,moving and storage services,moving quote comparison,interstate moving quotes",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/broadband-services/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("broadband-services", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="broadband-services" />;
}
