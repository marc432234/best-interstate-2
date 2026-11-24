import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getDashboardUser } from "@/lib/supabase-server";
import { signInAction } from "./actions";
import "@/app/dashboard/dashboard.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login | Best Interstate Moving + Storage",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getDashboardUser();
  if (user) {
    redirect("/dashboard");
  }

  const { error } = await searchParams;

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">
        <div className="admin-auth-brand">Best Interstate Moving + Storage</div>
        <h1>Dashboard login</h1>
        <p>Sign in with your Supabase Auth account to manage pages and blog posts.</p>
        {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}
        <form action={signInAction} className="admin-form">
          <label>
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button type="submit" className="admin-button admin-button-primary">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
