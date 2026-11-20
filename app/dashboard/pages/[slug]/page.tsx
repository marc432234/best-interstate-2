import { notFound } from "next/navigation";
import { getPageMetaBySlug } from "@/lib/page-meta";
import { getSitePages } from "@/lib/site-pages";
import { savePageMetaAction } from "./actions";

export default async function EditPageMeta({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const page = getSitePages().find((item) => item.slug === slug);
  if (!page) {
    notFound();
  }

  const row = await getPageMetaBySlug(slug);

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>{page.label}</h1>
          <p>
            {page.path} · Leave a field empty to use the fallback value from code.
          </p>
        </div>
        <a href={page.path} target="_blank" className="admin-button admin-button-secondary">
          View page
        </a>
      </div>

      {query.saved ? <div className="admin-alert admin-alert-success">SEO fields saved.</div> : null}
      {query.error ? <div className="admin-alert admin-alert-error">{query.error}</div> : null}

      <div className="admin-card">
        <form action={savePageMetaAction} className="admin-form">
          <input type="hidden" name="slug" value={slug} />

          <label>
            <span>Meta Title / OG Title</span>
            <input
              type="text"
              name="title"
              defaultValue={row?.title || ""}
              placeholder={page.fallbackTitle}
            />
            <span className="admin-form-note">Current fallback: {page.fallbackTitle}</span>
          </label>

          <label>
            <span>Description / OG Description</span>
            <textarea
              name="description"
              defaultValue={row?.description || ""}
              placeholder="Page meta description"
            />
          </label>

          <label>
            <span>Keywords</span>
            <input
              type="text"
              name="keywords"
              defaultValue={row?.keywords || ""}
              placeholder="comma,separated,keywords"
            />
          </label>

          <label>
            <span>Canonical URL</span>
            <input
              type="url"
              name="canonical"
              defaultValue={row?.canonical || ""}
              placeholder="https://bestinterstatemovingandstorage.com/page/"
            />
          </label>

          <label>
            <span>Featured Image / OG Image</span>
            <input
              type="url"
              name="featured_img"
              defaultValue={row?.featured_img || ""}
              placeholder="https://..."
            />
            <span className="admin-form-note">
              Used for the featured, meta, Open Graph, and Twitter preview image.
            </span>
          </label>

          <label className="admin-checkbox">
            <input
              type="checkbox"
              name="no_index"
              defaultChecked={Boolean(row?.no_index)}
            />
            <span>No index (robots: noindex, nofollow)</span>
          </label>

          <div className="admin-actions">
            <button type="submit" className="admin-button admin-button-primary">
              Save SEO fields
            </button>
            <a href="/dashboard/pages" className="admin-button admin-button-secondary">
              Back to pages
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
