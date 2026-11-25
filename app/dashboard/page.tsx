import { getBlogCategories, getBlogPosts } from "@/lib/blog-data";
import { getPageMetaRows } from "@/lib/page-meta";
import { getSitePages } from "@/lib/site-pages";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const [metaRows, posts, categories] = await Promise.all([
    getPageMetaRows(),
    getBlogPosts(supabase),
    getBlogCategories(supabase),
  ]);
  const sitePages = getSitePages();

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Overview</h1>
          <p>Manage SEO fields, blog posts, and categories.</p>
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-stat">
          <div>
            <span>Site pages</span>
            <strong>{sitePages.length}</strong>
          </div>
          <a href="/dashboard/pages">Manage</a>
        </div>
        <div className="admin-stat">
          <div>
            <span>Configured SEO</span>
            <strong>{metaRows.length}</strong>
          </div>
          <a href="/dashboard/pages">Edit</a>
        </div>
        <div className="admin-stat">
          <div>
            <span>Blog posts</span>
            <strong>{posts.length}</strong>
          </div>
          <a href="/dashboard/blog">Manage</a>
        </div>
        <div className="admin-stat">
          <div>
            <span>Categories</span>
            <strong>{categories.length}</strong>
          </div>
          <a href="/dashboard/categories">Manage</a>
        </div>
      </div>

      <div className="admin-card">
        <h2>Quick links</h2>
        <div className="admin-actions">
          <a href="/dashboard/pages" className="admin-button admin-button-primary">
            Edit page SEO
          </a>
          <a href="/dashboard/blog/new" className="admin-button admin-button-secondary">
            Add blog post
          </a>
          <a href="/dashboard/categories" className="admin-button admin-button-secondary">
            Add category
          </a>
          <a href="/blog/" className="admin-button admin-button-secondary" target="_blank">
            View blog
          </a>
        </div>
      </div>
    </div>
  );
}
