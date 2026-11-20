import fs from "fs";
import path from "path";

type RouteRecord = {
  dir: string;
  slug: string;
  title: string;
};

export type SitePage = {
  slug: string;
  path: string;
  label: string;
  fallbackTitle: string;
};

export function getSitePages(): SitePage[] {
  const routesPath = path.join(process.cwd(), "content", "_routes.json");
  const routes = JSON.parse(fs.readFileSync(routesPath, "utf8")) as RouteRecord[];

  return routes.map((route) => ({
    slug: route.slug,
    path: route.dir ? `/${route.dir}/` : "/",
    label: route.title.replace(/\s*\|\s*Best Interstate Moving \+ Storage\s*$/, ""),
    fallbackTitle: route.title,
  }));
}
