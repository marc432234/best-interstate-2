import { formatPostDate } from "@/lib/blog-utils";
import type { BlogPost } from "@/lib/blog-utils";
import OptimizedImage from "./OptimizedImage";
import { IMAGE_SIZES } from "@/lib/image-sizes";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <a href={`/blog/${post.slug}/`}>
        {post.meta_image || post.featured_image ? (
          <OptimizedImage
            src={post.meta_image || post.featured_image || ""}
            alt={post.title}
            width={800}
            height={450}
            sizes={IMAGE_SIZES.blogCard}
            className="blog-card-image"
          />
        ) : (
          <div className="blog-card-image blog-card-image-placeholder">
            <span>Best Interstate Moving + Storage</span>
          </div>
        )}
      </a>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          {post.categories ? <span className="blog-card-category">{post.categories.name}</span> : null}
          <span className={`blog-status blog-status-${post.status}`}>{post.status}</span>
        </div>
        <h2>
          <a href={`/blog/${post.slug}/`}>{post.title}</a>
        </h2>
        <div className="blog-card-date">{formatPostDate(post.published_at)}</div>
        <p>{post.excerpt || "Read this post from Best Interstate Moving + Storage."}</p>
        <a href={`/blog/${post.slug}/`} className="blog-card-link">
          Read article
        </a>
      </div>
    </article>
  );
}
