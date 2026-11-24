import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import OptimizedImage from "@/components/OptimizedImage";
import { IMAGE_SIZES } from "@/lib/image-sizes";
import { DEFAULT_OG_IMAGE } from "@/lib/page-hero";
import {
  getBlogCategories,
  getPublishedPostBySlug,
  getRelatedPosts,
} from "@/lib/blog-data";
import { formatPostDate } from "@/lib/blog-utils";
import { postContentExcerpt, postContentHtml } from "@/lib/post-content";
import "./../blog.css";

export const revalidate = 60;

const SITE_URL = "https://bestinterstatemovingandstorage.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found | Best Interstate Moving + Storage",
      robots: { index: false, follow: false },
    };
  }

  const title = post.title;
  const description = post.excerpt || postContentExcerpt(post);
  const image = post.meta_image?.trim() || post.featured_image?.trim() || DEFAULT_OG_IMAGE;
  const canonical = `${SITE_URL}/blog/${post.slug}/`;

  return {
    title,
    description,
    keywords: post.categories?.name,
    alternates: { canonical },
    robots: post.no_index
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Best Interstate Moving + Storage",
      locale: "en_US",
      type: "article",
      publishedTime: post.published_at || undefined,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [categories, relatedPosts] = await Promise.all([
    getBlogCategories(),
    getRelatedPosts(post),
  ]);

  return (
    <div className="blog-post-page">
      <div className="blog-container">
        <a href="/blog/" className="blog-back-link">
          ← Back to blog
        </a>

        <header className="blog-post-header">
          {post.categories ? (
            <span className="blog-card-category">{post.categories.name}</span>
          ) : null}
          <h1>{post.title}</h1>
          <div className="blog-post-details">
            <span className={`blog-status blog-status-${post.status}`}>{post.status}</span>
            <time dateTime={post.published_at || undefined}>
              {formatPostDate(post.published_at)}
            </time>
          </div>
        </header>

        {(post.meta_image || post.featured_image) && (
          <OptimizedImage
            className="blog-post-hero"
            src={post.meta_image || post.featured_image || ""}
            alt={post.title}
            width={1080}
            height={608}
            sizes={IMAGE_SIZES.blogHero}
          />
        )}

        <div className="blog-post-layout">
          <article
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: postContentHtml(post) }}
          />

          <aside className="blog-sidebar-card">
            <h2>Categories</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <a href={`/blog/?category=${encodeURIComponent(category.slug)}`}>
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {relatedPosts.length > 0 ? (
          <section className="blog-related">
            <h2>Related articles</h2>
            <div className="blog-grid">
              {relatedPosts.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
