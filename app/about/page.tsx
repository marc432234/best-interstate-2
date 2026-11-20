import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "About Us | Best Interstate Moving + Storage",
  "description": "To get your instant Free Quote Now, fill out our contact form.",
  "keywords": "About Us,Who We Are,About Us quotes,About Us providers,moving and storage services,moving quote comparison,interstate moving quotes,Lead Generation Focus,Provider Matching,Consumer Choice",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/about/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("about", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="about" />;
}
