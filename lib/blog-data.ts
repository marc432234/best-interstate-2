import { getSupabaseClient } from "./supabase";
import { isPublished, POSTS_PER_PAGE, type BlogCategory, type BlogPost } from "./blog-utils";

const postSelect = "*, categories:blog_categories (id, name, slug)";

type SupabaseClient = NonNullable<ReturnType<typeof getSupabaseClient>>;

export async function getPublishedPosts(options?: {
  categorySlug?: string;
  page?: number;
}): Promise<{ posts: BlogPost[]; total: number; pages: number; page: number }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { posts: [], total: 0, pages: 1, page: options?.page || 1 };
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select(postSelect)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .returns<BlogPost[]>();

  if (error) {
    console.error(`[blog] ${error.message}`);
    return { posts: [], total: 0, pages: 1, page: options?.page || 1 };
  }

  const filtered = (data || []).filter(
    (post) =>
      isPublished(post) &&
      (!options?.categorySlug || post.categories?.slug === options.categorySlug),
  );
  const page = Math.max(1, options?.page || 1);
  const pages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, pages);
  const start = (safePage - 1) * POSTS_PER_PAGE;

  return {
    posts: filtered.slice(start, start + POSTS_PER_PAGE),
    total: filtered.length,
    pages,
    page: safePage,
  };
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select(postSelect)
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .limit(1)
    .maybeSingle<BlogPost>();

  if (error) {
    console.error(`[blog] ${error.message}`);
    return null;
  }

  return data || null;
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const { posts } = await getPublishedPosts({
    categorySlug: post.categories?.slug,
  });

  return posts.filter((item) => item.id !== post.id).slice(0, limit);
}

export async function getBlogCategories(
  client?: SupabaseClient | null,
): Promise<BlogCategory[]> {
  const supabase = client ?? getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("blog_categories")
    .select("id, name, slug, description")
    .order("name", { ascending: true })
    .returns<BlogCategory[]>();

  if (error) {
    console.error(`[blog] ${error.message}`);
    return [];
  }

  return data || [];
}

export async function getBlogPosts(
  client?: SupabaseClient | null,
): Promise<BlogPost[]> {
  const supabase = client ?? getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select(postSelect)
    .order("created_at", { ascending: false })
    .returns<BlogPost[]>();

  if (error) {
    console.error(`[blog] ${error.message}`);
    return [];
  }

  return data || [];
}

export async function getBlogPostById(
  id: string,
  client?: SupabaseClient | null,
): Promise<BlogPost | null> {
  const supabase = client ?? getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select(postSelect)
    .eq("id", id)
    .maybeSingle<BlogPost>();

  if (error) {
    console.error(`[blog] ${error.message}`);
    return null;
  }

  return data || null;
}

export async function getBlogCategoryById(
  id: string,
  client?: SupabaseClient | null,
): Promise<BlogCategory | null> {
  const supabase = client ?? getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("blog_categories")
    .select("id, name, slug, description")
    .eq("id", id)
    .maybeSingle<BlogCategory>();

  if (error) {
    console.error(`[blog] ${error.message}`);
    return null;
  }

  return data || null;
}
