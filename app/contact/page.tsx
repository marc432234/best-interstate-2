import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Contact Us | Best Interstate Moving + Storage",
  "description": "To get your instant Free Quote Now, fill out our contact form.",
  "keywords": "Contact Us,Start Your Request,Contact Us quotes,Contact Us providers,moving and storage services,moving quote comparison,interstate moving quotes,Call Us,Submit Details,Review Options",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/contact/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("contact", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="contact" />;
}
