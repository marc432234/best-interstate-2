import DeleteConfirmForm from "@/components/dashboard/DeleteConfirmForm";
import { getBlogCategories, getBlogPosts } from "@/lib/blog-data";
import { deleteCategoryAction, saveCategoryAction } from "@/app/dashboard/blog/actions";

export default async function DashboardCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
}) {
  const params = await searchParams;
  const [categories, posts] = await Promise.all([getBlogCategories(), getBlogPosts()]);

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Categories</h1>
          <p>Organize blog posts into categories.</p>
        </div>
      </div>

      {params.saved ? <div className="admin-alert admin-alert-success">Category saved.</div> : null}
      {params.deleted ? <div className="admin-alert admin-alert-success">Category deleted.</div> : null}
      {params.error ? <div className="admin-alert admin-alert-error">{params.error}</div> : null}

      <div className="admin-card">
        <h2>Add category</h2>
        <form action={saveCategoryAction} className="admin-form">
          <div className="admin-form-row">
            <label>
              <span>Name</span>
              <input type="text" name="name" required />
            </label>
            <label>
              <span>Slug</span>
              <input type="text" name="slug" placeholder="auto-from-name" />
            </label>
          </div>
          <label>
            <span>Description</span>
            <textarea name="description" />
          </label>
          <button type="submit" className="admin-button admin-button-primary">
            Add category
          </button>
        </form>
      </div>

      <div className="admin-card">
        <h2>Existing categories</h2>
        {categories.length === 0 ? (
          <div className="admin-empty">No categories yet.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Posts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <strong>{category.name}</strong>
                      <div className="admin-form-note">{category.description || "—"}</div>
                    </td>
                    <td>/{category.slug}</td>
                    <td>{posts.filter((post) => post.category_id === category.id).length}</td>
                    <td>
                      <div className="admin-actions">
                        <a href={`/dashboard/categories/${category.id}`}>Edit</a>
                        <DeleteConfirmForm
                          action={deleteCategoryAction}
                          fields={[{ name: "id", value: category.id }]}
                          itemLabel={category.name}
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
