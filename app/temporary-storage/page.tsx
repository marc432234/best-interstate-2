import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getPageMetadata } from "@/lib/page-meta";

const fallbackMetadata: Metadata = {
  "title": "Temporary Storage | Best Interstate Moving + Storage",
  "description": "Review temporary storage options when your pickup, delivery, or move-in dates do not align cleanly.",
  "keywords": "Temporary Storage,Temporary Storage quotes,Temporary Storage providers,moving and storage services,moving quote comparison,interstate moving quotes",
  "alternates": {
    "canonical": "https://bestinterstatemovingandstorage.com/temporary-storage/"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("temporary-storage", fallbackMetadata);
}

export default function Page() {
  return <PageContent slug="temporary-storage" />;
}
