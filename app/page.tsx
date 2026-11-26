import type { Metadata } from "next";
import { preload } from "react-dom";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Best Interstate Moving + Storage",
  "description": "Easily connect with reliable moving and storage providers near you. Complete one contact form to receive personalized matches and quotes.",
  "keywords": "compare moving companies,compare storage services,moving quote request,moving company matches,moving and storage quotes,relocation providers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home", fallbackMetadata);
}

export default function Page() {
  preload("/assets/images/banner_bg.webp", {
    as: "image",
    fetchPriority: "high",
  });
  return <PageContent slug="home" />;
}
