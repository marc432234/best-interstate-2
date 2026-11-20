import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { getBlogCategories, getPublishedPosts } from "@/lib/blog-data";
import "./blog.css";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Moving Tips & Guides | Best Interstate Moving + Storage",
  description:
    "Read moving tips, packing guides, storage advice, and relocation resources from Best Interstate Moving + Storage.",
  alternates: {
    canonical: "https://bestinterstatemovingandstorage.com/blog/",
  },
};

function pageHref(page: number, categorySlug?: string) {
  const params = new URLSearchParams();
  if (categorySlug) {
    params.set("category", categorySlug);
  }
  if (page > 1) {
    params.set("page", String(page));
  }
  const query = params.toString();
  return `/blog/${query ? `?${query}` : ""}`;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const query = await searchParams;
  const categorySlug = query.category || "";
  const requestedPage = Number.parseInt(query.page || "1", 10);
  const [categories, result] = await Promise.all([
    getBlogCategories(),
    getPublishedPosts({
      categorySlug: categorySlug || undefined,
      page: Number.isFinite(requestedPage) ? requestedPage : 1,
    }),
  ]);

  return (
    <div className="blog-list-page">
      <div className="blog-container">
        <div className="blog-hero">
          <h1>Moving tips, guides, and updates</h1>
          <p>
            Practical advice for packing, storage, interstate moves, and choosing the right
            moving support for your next relocation.
          </p>
        </div>

        <div className="blog-filter-bar">
          <a href="/blog/" className={`blog-filter ${!categorySlug ? "blog-filter-active" : ""}`}>
            All posts
          </a>
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/blog/?category=${encodeURIComponent(category.slug)}`}
              className={`blog-filter ${categorySlug === category.slug ? "blog-filter-active" : ""}`}
            >
              {category.name}
            </a>
          ))}
        </div>

        {result.posts.length === 0 ? (
          <div className="blog-empty">No published posts yet.</div>
        ) : (
          <div className="blog-grid">
            {result.posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {result.pages > 1 ? (
          <nav className="blog-pagination" aria-label="Blog pagination">
            {result.page > 1 ? (
              <a href={pageHref(result.page - 1, categorySlug)} className="blog-page-link">
                Previous
              </a>
            ) : null}
            {Array.from({ length: result.pages }, (_, index) => index + 1).map((page) => (
              <a
                key={page}
                href={pageHref(page, categorySlug)}
                className={`blog-page-link ${page === result.page ? "blog-page-link-active" : ""}`}
              >
                {page}
              </a>
            ))}
            {result.page < result.pages ? (
              <a href={pageHref(result.page + 1, categorySlug)} className="blog-page-link">
                Next
              </a>
            ) : null}
          </nav>
        ) : null}
      </div>
    </div>
  );
}
