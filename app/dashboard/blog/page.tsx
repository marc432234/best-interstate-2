import DeleteConfirmForm from "@/components/dashboard/DeleteConfirmForm";
import { formatPostDate } from "@/lib/blog-utils";
import { getBlogCategories, getBlogPosts } from "@/lib/blog-data";
import { deletePostAction } from "./actions";

export default async function DashboardBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
}) {
  const params = await searchParams;
  const [posts, categories] = await Promise.all([getBlogPosts(), getBlogCategories()]);
  const categoryNames = new Map(categories.map((category) => [category.id, category.name]));

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Blog Posts</h1>
          <p>Create posts with categories, status, dates, and SEO fields.</p>
        </div>
        <a href="/dashboard/blog/new" className="admin-button admin-button-primary">
          Add post
        </a>
      </div>

      {params.saved ? <div className="admin-alert admin-alert-success">Post saved.</div> : null}
      {params.deleted ? <div className="admin-alert admin-alert-success">Post deleted.</div> : null}
      {params.error ? <div className="admin-alert admin-alert-error">{params.error}</div> : null}

      <div className="admin-card">
        {posts.length === 0 ? (
          <div className="admin-empty">No posts yet. Create your first post.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <strong>{post.title}</strong>
                      <div className="admin-form-note">/{post.slug}</div>
                    </td>
                    <td>{post.categories?.name || categoryNames.get(post.category_id || "") || "—"}</td>
                    <td>
                      <span
                        className={`admin-badge ${
                          post.status === "published"
                            ? "admin-badge-success"
                            : post.status === "draft"
                              ? "admin-badge-warning"
                              : "admin-badge-muted"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td>{formatPostDate(post.published_at)}</td>
                    <td>
                      <div className="admin-actions">
                        <a href={`/dashboard/blog/${post.id}`}>Edit</a>
                        <a href={`/blog/${post.slug}/`} target="_blank">
                          View
                        </a>
                        <DeleteConfirmForm
                          action={deletePostAction}
                          fields={[
                            { name: "id", value: post.id },
                            { name: "slug", value: post.slug },
                          ]}
                          itemLabel={post.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
