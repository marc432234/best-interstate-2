import RichTextPostEditor from "@/components/dashboard/RichTextPostEditor";
import { getBlogCategories } from "@/lib/blog-data";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { savePostAction } from "../actions";

export default async function NewBlogPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const query = await searchParams;
  const supabase = await createSupabaseServerClient();
  const categories = await getBlogCategories(supabase);

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Add blog post</h1>
          <p>Write with the rich text editor. Slug is generated from the title.</p>
        </div>
      </div>

      {query.error ? <div className="admin-alert admin-alert-error">{query.error}</div> : null}
      {categories.length === 0 ? (
        <div className="admin-alert admin-alert-error">
          Add at least one category before publishing.{" "}
          <a href="/dashboard/categories">Manage categories</a>
        </div>
      ) : null}

      <div className="admin-card">
        <RichTextPostEditor action={savePostAction} categories={categories} />
      </div>
    </div>
  );
}
