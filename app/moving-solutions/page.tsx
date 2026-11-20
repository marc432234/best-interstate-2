import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Moving Solutions | Best Interstate Moving + Storage",
  "description": "To get your instant Free Quote Now, fill out our contact form.",
  "keywords": "Moving Solutions,Add-On Support,Moving Solutions quotes,Moving Solutions providers,moving and storage services,moving quote comparison,interstate moving quotes,Packing + Supplies,Storage + Protection,Specialty Requests",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/moving-solutions/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("moving-solutions", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="moving-solutions" />;
}
