import type { Metadata } from "next";
import { getSupabaseClient } from "./supabase";

export type PageMetaRow = {
  slug: string;
  title: string | null;
  description: string | null;
  keywords: string | null;
  canonical: string | null;
  featured_img: string | null;
  no_index: boolean | null;
};

const PAGE_META_COLUMNS =
  "slug,title,description,keywords,canonical,featured_img,no_index";

function toObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function getFallbackImage(fallback: Metadata): string | undefined {
  const openGraph = fallback.openGraph;
  if (!openGraph || typeof openGraph !== "object" || !("images" in openGraph)) {
    return undefined;
  }
  const images = openGraph.images;
  if (!images) {
    return undefined;
  }
  const first = Array.isArray(images) ? images[0] : images;
  if (!first) {
    return undefined;
  }
  if (typeof first === "string") {
    return first;
  }
  if (first instanceof URL) {
    return first.toString();
  }
  return first.url ? String(first.url) : undefined;
}

export async function getPageMetadata(
  slug: string,
  fallback: Metadata,
): Promise<Metadata> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return fallback;
  }

  const { data, error } = await supabase
    .from("page_meta")
    .select(PAGE_META_COLUMNS)
    .eq("slug", slug)
    .maybeSingle<PageMetaRow>();

  if (error || !data) {
    if (error) {
      console.warn(`[page-meta] ${slug}: ${error.message}`);
    }
    return fallback;
  }

  const fallbackTitle =
    typeof fallback.title === "string" ? fallback.title : undefined;
  const title = data.title || fallbackTitle;
  const description = data.description || fallback.description || undefined;
  const keywords = data.keywords || (fallback.keywords as string | undefined);
  const canonical =
    data.canonical ||
    (typeof fallback.alternates?.canonical === "string"
      ? fallback.alternates.canonical
      : undefined);
  const image = data.featured_img || getFallbackImage(fallback);

  const merged: Metadata = {
    ...fallback,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(keywords ? { keywords } : {}),
    alternates: {
      ...fallback.alternates,
      ...(canonical ? { canonical } : {}),
    },
    openGraph: {
      ...toObject(fallback.openGraph),
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      ...toObject(fallback.twitter),
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  };

  if (data.no_index) {
    merged.robots = { index: false, follow: false };
  }

  return merged;
}

export async function getPageMetaRows(): Promise<PageMetaRow[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("page_meta")
    .select(PAGE_META_COLUMNS)
    .order("slug", { ascending: true })
    .returns<PageMetaRow[]>();

  if (error) {
    console.error(`[page-meta] ${error.message}`);
    return [];
  }

  return data || [];
}

export async function getPageMetaBySlug(slug: string): Promise<PageMetaRow | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("page_meta")
    .select(PAGE_META_COLUMNS)
    .eq("slug", slug)
    .maybeSingle<PageMetaRow>();

  if (error) {
    console.error(`[page-meta] ${error.message}`);
    return null;
  }

  return data || null;
}
