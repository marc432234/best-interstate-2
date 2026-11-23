export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at?: string;
  updated_at?: string;
};

export type BlogPostStatus = "draft" | "published" | "archived";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content_markdown: string;
  content_html: string;
  category_id: string | null;
  status: BlogPostStatus;
  published_at: string | null;
  featured_image: string | null;
  meta_image: string | null;
  no_index: boolean;
  created_at?: string;
  updated_at?: string;
  categories: Pick<BlogCategory, "id" | "name" | "slug"> | null;
};

export const POSTS_PER_PAGE = 9;

const postSelect = "*, categories:blog_categories (id, name, slug)";

export function isPublished(post: BlogPost) {
  if (post.status !== "published" || !post.published_at) {
    return false;
  }
  return new Date(post.published_at).getTime() <= Date.now();
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPostDate(value: string | null | undefined) {
  if (!value) {
    return "Not published";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function markdownToExcerpt(value: string, maxLength = 180) {
  const plain = value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > maxLength ? `${plain.slice(0, maxLength).trimEnd()}…` : plain;
}
