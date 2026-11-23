# bestinterstate-2

## Supabase credentials for Vercel

The app reads Supabase config only on the server. Add these in **Vercel → your project → Settings → Environment Variables** for Production, Preview and Development.

| Variable | Required | Where to find it in Supabase |
| --- | --- | --- |
| `SUPABASE_URL` | Yes | Supabase dashboard → your project → **Project Settings → API → Project URL** (e.g. `https://abcdefgh.supabase.co`). |
| `SUPABASE_ANON_KEY` | Yes | **Project Settings → API → Project API keys → `anon` / `public`** (a long `eyJ...` value). Safe to expose; RLS controls writes. |
| `SUPABASE_SERVICE_ROLE_KEY` | No | **Project Settings → API → Project API keys → `service_role` / `secret`** (or newer `sb_secret_...`). Never expose to the browser; the app does not currently use it. |

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are still accepted as fallbacks in `lib/supabase.ts`, `lib/supabase-server.ts` and `middleware.ts`, but the server-side names above are preferred.

### Local development

1. Copy the template: `cp .env.example .env.local` (PowerShell: `Copy-Item .env.example .env.local`) and fill in the values.
2. Run `npm run dev`.

### Push local values to Vercel

1. Install the CLI if needed (`npm i -g vercel`), then run `vercel login` and `vercel link` in this folder.
2. Run `npm run env:sync:vercel`. It reads `.env.local` and adds or updates each key for production, preview and development. Production/Preview values are sensitive by default.

You can also add the variables manually in the Vercel dashboard. No `vercel.json` changes are required.

### Supabase project checklist

- Run `supabase/schema.sql` in **SQL Editor → New query** to create tables, grants, the public `site-images` Storage bucket and RLS policies, plus seed content. Re-run it after updates.
- Create an admin login at **Authentication → Users → Add user** (email + password). `/login` uses Supabase Auth and writes require the `authenticated` role.
- Use the **Upload** control next to featured/meta image fields in the dashboard to store images in the `site-images` bucket; the resulting public URL is saved with the page or post.
- Add your production domain to **Authentication → URL Configuration → Site URL** and **Redirect URLs**.
- Redeploy after changing Vercel environment variables.
