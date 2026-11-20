"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireDashboardClient } from "@/lib/dashboard-auth";
import { getSitePages } from "@/lib/site-pages";

function clean(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text || null;
}

export async function savePageMetaAction(formData: FormData) {
  const { supabase } = await requireDashboardClient();

  const slug = String(formData.get("slug") || "").trim();
  if (!slug) {
    redirect("/dashboard/pages?error=Missing%20page%20slug");
  }

  const row = {
    slug,
    title: clean(formData.get("title")),
    description: clean(formData.get("description")),
    keywords: clean(formData.get("keywords")),
    canonical: clean(formData.get("canonical")),
    featured_img: clean(formData.get("featured_img")),
    no_index: formData.get("no_index") === "on",
  };

  const { error } = await supabase.from("page_meta").upsert(row, { onConflict: "slug" });
  if (error) {
    redirect(
      `/dashboard/pages/${encodeURIComponent(slug)}?error=${encodeURIComponent(error.message)}`,
    );
  }

  const page = getSitePages().find((item) => item.slug === slug);
  if (page) {
    revalidatePath(page.path);
  }

  redirect(`/dashboard/pages/${encodeURIComponent(slug)}?saved=1`);
}

export async function deletePageMetaAction(formData: FormData) {
  const { supabase } = await requireDashboardClient();
  const slug = String(formData.get("slug") || "").trim();

  if (slug) {
    await supabase.from("page_meta").delete().eq("slug", slug);
    const page = getSitePages().find((item) => item.slug === slug);
    if (page) {
      revalidatePath(page.path);
    }
  }

  redirect("/dashboard/pages?deleted=1");
}
