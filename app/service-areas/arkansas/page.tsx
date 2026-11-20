import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Arkansas Moving Quotes | Best Interstate Moving + Storage",
  "description": "Start a moving quote request for Arkansas and compare local, statewide, and interstate relocation support.",
  "keywords": "Arkansas moving quotes,Arkansas movers,Arkansas relocation services,Arkansas moving estimate,Arkansas interstate movers",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/service-areas/arkansas/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-areas__arkansas", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="service-areas__arkansas" />;
}
