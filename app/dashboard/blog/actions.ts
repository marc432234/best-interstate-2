"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireDashboardClient } from "@/lib/dashboard-auth";
import { slugify } from "@/lib/blog-utils";
import {
  htmlToExcerpt,
  markdownToHtml,
  sanitizePostHtml,
} from "@/lib/post-content";

function clean(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text || null;
}

function redirectWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function savePostAction(formData: FormData) {
  const { supabase } = await requireDashboardClient();

  const id = clean(formData.get("id"));
  const title = clean(formData.get("title"));
  const rawMarkdown = String(formData.get("content_markdown") || "").trim();
  const rawHtml = String(formData.get("content_html") || "").trim();
  const contentHtml = rawHtml
    ? sanitizePostHtml(rawHtml)
    : markdownToHtml(rawMarkdown);

  if (!title) {
    redirectWithError(id ? `/dashboard/blog/${id}` : "/dashboard/blog/new", "Title is required");
  }
  if (!htmlToExcerpt(contentHtml)) {
    redirectWithError(id ? `/dashboard/blog/${id}` : "/dashboard/blog/new", "Content is required");
  }

  const slug = clean(formData.get("slug")) || slugify(title);
  if (!slug) {
    redirectWithError(id ? `/dashboard/blog/${id}` : "/dashboard/blog/new", "Slug could not be generated");
  }

  const statusRaw = String(formData.get("status") || "draft");
  const status = statusRaw === "published" || statusRaw === "archived" ? statusRaw : "draft";
  const excerpt = clean(formData.get("excerpt")) || htmlToExcerpt(contentHtml);
  const metaImage = clean(formData.get("meta_image"));
  const publishedAtInput = clean(formData.get("published_at"));
  const publishedAt =
    status === "published"
      ? publishedAtInput || new Date().toISOString()
      : publishedAtInput;

  const payload = {
    ...(id ? { id } : {}),
    title,
    slug,
    excerpt,
    content_markdown: rawMarkdown,
    content_html: contentHtml,
    category_id: clean(formData.get("category_id")),
    status,
    published_at: publishedAt,
    featured_image: metaImage,
    meta_image: metaImage,
    no_index: formData.get("no_index") === "on",
  };

  const { error } = await supabase.from("blog_posts").upsert(payload, { onConflict: "id" });
  if (error) {
    redirectWithError(
      id ? `/dashboard/blog/${id}` : "/dashboard/blog/new",
      error.message,
    );
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/dashboard/blog?saved=1");
}

export async function deletePostAction(formData: FormData) {
  const { supabase } = await requireDashboardClient();
  const id = clean(formData.get("id"));
  const slug = clean(formData.get("slug"));

  if (id) {
    await supabase.from("blog_posts").delete().eq("id", id);
  }
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
  revalidatePath("/blog");
  redirect("/dashboard/blog?deleted=1");
}

export async function saveCategoryAction(formData: FormData) {
  const { supabase } = await requireDashboardClient();

  const id = clean(formData.get("id"));
  const name = clean(formData.get("name"));

  if (!name) {
    redirectWithError(id ? `/dashboard/categories/${id}` : "/dashboard/categories", "Name is required");
  }

  const slug = clean(formData.get("slug")) || slugify(name);
  if (!slug) {
    redirectWithError(id ? `/dashboard/categories/${id}` : "/dashboard/categories", "Slug could not be generated");
  }

  const { error } = await supabase.from("blog_categories").upsert(
    {
      ...(id ? { id } : {}),
      name,
      slug,
      description: clean(formData.get("description")),
    },
    { onConflict: "id" },
  );

  if (error) {
    redirectWithError(
      id ? `/dashboard/categories/${id}` : "/dashboard/categories",
      error.message,
    );
  }

  revalidatePath("/blog");
  redirect("/dashboard/categories?saved=1");
}

export async function deleteCategoryAction(formData: FormData) {
  const { supabase } = await requireDashboardClient();
  const id = clean(formData.get("id"));

  if (id) {
    await supabase.from("blog_categories").delete().eq("id", id);
  }

  revalidatePath("/blog");
  redirect("/dashboard/categories?deleted=1");
}
