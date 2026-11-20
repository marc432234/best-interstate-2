import type { Metadata } from "next";
import { signOutAction } from "@/app/login/actions";
import { getDashboardUser } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import "./dashboard.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | Best Interstate Moving + Storage",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/pages", label: "Pages / SEO" },
  { href: "/dashboard/blog", label: "Blog Posts" },
  { href: "/dashboard/categories", label: "Categories" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getDashboardUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a href="/dashboard" className="admin-logo">
          BIMS Admin
        </a>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="admin-nav-link">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="/" className="admin-nav-link admin-nav-link-muted" target="_blank">
          View website
        </a>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">Content dashboard</div>
          <div className="admin-user">
            <span>{user.email || "Admin user"}</span>
            <form action={signOutAction}>
              <button type="submit" className="admin-button admin-button-ghost">
                Sign out
              </button>
            </form>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
