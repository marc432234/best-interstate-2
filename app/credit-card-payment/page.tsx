import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Pay Here | Best Interstate Moving + Storage",
  "description": "To get your instant Free Quote Now, fill out our contact form.",
  "keywords": "Pay Here,Billing,Pay Here quotes,Pay Here providers,moving and storage services,moving quote comparison,interstate moving quotes,Billing Questions,Provider Coordination,Move Support",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/credit-card-payment/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("credit-card-payment", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="credit-card-payment" />;
}
