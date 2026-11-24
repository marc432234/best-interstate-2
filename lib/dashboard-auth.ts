import { redirect } from "next/navigation";
import { createSupabaseServerClient, getDashboardUser } from "./supabase-server";

export async function requireDashboardClient() {
  const user = await getDashboardUser();
  if (!user) {
    redirect("/jna/login");
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirect("/jna/login?error=Supabase%20environment%20variables%20are%20missing");
  }

  return { supabase, user };
}
