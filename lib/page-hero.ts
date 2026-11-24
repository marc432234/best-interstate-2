import fs from "fs";
import path from "path";

const SITE_URL = "https://bestinterstatemovingandstorage.com";
const contentDir = path.join(process.cwd(), "content");

export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/banner_bg.webp`;

function toAbsoluteUrl(value: string): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) {
    return value;
  }
  return `${SITE_URL}/${value.replace(/^\/+/, "")}`;
}

export function getPageHeroImage(slug: string): string | undefined {
  if (!/^[a-z0-9_-]+$/.test(slug)) {
    return undefined;
  }

  const filePath = path.join(contentDir, `${slug}.html`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const html = fs.readFileSync(filePath, "utf8");
  const match = html.match(
    /background-image\s*:\s*[^;]*?url\(\s*(['"]?)([^'")]+)\1\s*\)/i,
  );
  const value = match?.[2]?.trim();

  if (!value || !/\.(?:avif|gif|jpe?g|png|webp)(?:\?|$)/i.test(value)) {
    return undefined;
  }

  return toAbsoluteUrl(value);
}
