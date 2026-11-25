import { notFound } from "next/navigation";
import RichTextPostEditor from "@/components/dashboard/RichTextPostEditor";
import { getBlogCategories, getBlogPostById } from "@/lib/blog-data";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { savePostAction } from "../actions";

export default async function EditBlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const supabase = await createSupabaseServerClient();
  const [post, categories] = await Promise.all([
    getBlogPostById(id, supabase),
    getBlogCategories(supabase),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Edit blog post</h1>
          <p>{post.title}</p>
        </div>
        <a href={`/blog/${post.slug}/`} target="_blank" className="admin-button admin-button-secondary">
          View post
        </a>
      </div>

      {query.error ? <div className="admin-alert admin-alert-error">{query.error}</div> : null}

      <div className="admin-card">
        <RichTextPostEditor action={savePostAction} categories={categories} post={post} />
      </div>
    </div>
  );
}
