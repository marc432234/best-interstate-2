import DeleteConfirmForm from "@/components/dashboard/DeleteConfirmForm";
import { deletePageMetaAction } from "./[slug]/actions";
import { getPageMetaRows } from "@/lib/page-meta";
import { getSitePages } from "@/lib/site-pages";

export default async function DashboardPagesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
}) {
  const params = await searchParams;
  const [sitePages, metaRows] = await Promise.all([getSitePages(), getPageMetaRows()]);
  const metaBySlug = new Map(metaRows.map((row) => [row.slug, row]));

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Pages / SEO</h1>
          <p>Override title, description, canonical, Open Graph, and robots values.</p>
        </div>
      </div>

      {params.saved ? <div className="admin-alert admin-alert-success">SEO fields saved.</div> : null}
      {params.deleted ? <div className="admin-alert admin-alert-success">Override removed.</div> : null}
      {params.error ? <div className="admin-alert admin-alert-error">{params.error}</div> : null}

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>SEO title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sitePages.map((page) => {
                const row = metaBySlug.get(page.slug);
                return (
                  <tr key={page.slug}>
                    <td>
                      <strong>{page.label}</strong>
                      <div className="admin-form-note">{page.path}</div>
                    </td>
                    <td>{row?.title || page.fallbackTitle}</td>
                    <td>
                      <span
                        className={`admin-badge ${row ? "admin-badge-success" : "admin-badge-muted"}`}
                      >
                        {row ? "Configured" : "Fallback"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <a href={`/dashboard/pages/${encodeURIComponent(page.slug)}`}>
                          Edit
                        </a>
                        {row ? (
                          <DeleteConfirmForm
                            action={deletePageMetaAction}
                            fields={[{ name: "slug", value: page.slug }]}
                            itemLabel={`SEO override for ${page.label}`}
                            buttonLabel="Remove"
                          />
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
