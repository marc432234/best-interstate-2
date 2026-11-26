import { notFound } from "next/navigation";
import { getBlogCategoryById } from "@/lib/blog-data";
import { saveCategoryAction } from "@/app/dashboard/blog/actions";

export default async function EditCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const category = await getBlogCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Edit category</h1>
          <p>{category.name}</p>
        </div>
      </div>

      {query.error ? <div className="admin-alert admin-alert-error">{query.error}</div> : null}

      <div className="admin-card">
        <form action={saveCategoryAction} className="admin-form">
          <input type="hidden" name="id" value={category.id} />
          <div className="admin-form-row">
            <label>
              <span>Name</span>
              <input type="text" name="name" defaultValue={category.name} required />
            </label>
            <label>
              <span>Slug</span>
              <input type="text" name="slug" defaultValue={category.slug} />
            </label>
          </div>
          <label>
            <span>Description</span>
            <textarea name="description" defaultValue={category.description || ""} />
          </label>
          <div className="admin-actions">
            <button type="submit" className="admin-button admin-button-primary">
              Save category
            </button>
            <a href="/dashboard/categories" className="admin-button admin-button-secondary">
              Back to categories
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
