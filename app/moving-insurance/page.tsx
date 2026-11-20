import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Moving Insurance | Best Interstate Moving + Storage",
  "description": "Review moving protection questions and coverage considerations before choosing a provider.",
  "keywords": "Moving Insurance,Moving Insurance quotes,Moving Insurance providers,moving and storage services,moving quote comparison,interstate moving quotes,Coverage Review,Inventory Awareness,Decision Support",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/moving-insurance/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("moving-insurance", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="moving-insurance" />;
}
