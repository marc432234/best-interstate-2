import fs from "fs";
import path from "path";
import { getLocalImageSize } from "@/lib/local-image-size";

const contentDir = path.join(process.cwd(), "content");
const quoteFormSource = fs.readFileSync(
  path.join(contentDir, "_partials", "quote-form.html"),
  "utf8",
);

function extractVariant(startToken: string, endToken: string) {
  const start = quoteFormSource.indexOf(startToken);
  const end = quoteFormSource.indexOf(endToken, start);

  if (start === -1 || end === -1) {
    throw new Error("Quote form variants are missing from quote-form.html");
  }

  return quoteFormSource.slice(start + startToken.length, end).trim();
}

const quoteFormVariants: Record<string, string> = {
  "@@QUOTE_FORM@@": extractVariant(
    "<!--@@QUOTE_FORM_INTERIOR_START@@-->",
    "<!--@@QUOTE_FORM_INTERIOR_END@@-->",
  ),
  "@@QUOTE_FORM_STATE@@": extractVariant(
    "<!--@@QUOTE_FORM_STATE_START@@-->",
    "<!--@@QUOTE_FORM_STATE_END@@-->",
  ),
};

function prepareImages(html: string) {
  return html.replace(/<img\b([^>]*)>/gi, (match, attributes: string) => {
    const cleanAttributes = attributes.replace(/\s*\/\s*$/, "");
    const extras = [
      /\bloading\s*=/.test(cleanAttributes) ? "" : ' loading="lazy"',
      /\bdecoding\s*=/.test(cleanAttributes) ? "" : ' decoding="async"',
    ];

    const hasWidth = /\bwidth\s*=/.test(cleanAttributes);
    const hasHeight = /\bheight\s*=/.test(cleanAttributes);
    if (!hasWidth || !hasHeight) {
      const srcMatch = cleanAttributes.match(
        /\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i,
      );
      const src = srcMatch?.[1] || srcMatch?.[2];
      const size = src ? getLocalImageSize(src) : null;
      if (size) {
        if (!hasWidth) extras.push(` width="${size[0]}"`);
        if (!hasHeight) extras.push(` height="${size[1]}"`);
      }
    }

    return extras.some(Boolean)
      ? `<img${cleanAttributes}${extras.join("")} />`
      : match;
  });
}

export default function PageContent({ slug }: { slug: string }) {
  const filePath = path.join(contentDir, `${slug}.html`);
  let html = fs.readFileSync(filePath, "utf8");

  for (const [token, markup] of Object.entries(quoteFormVariants)) {
    html = html.split(`<!--${token}-->`).join(markup);
  }

  if (/<!--@@QUOTE_FORM(?:_STATE)?@@-->/.test(html)) {
    throw new Error(`Unreplaced quote form token in ${slug}.html`);
  }

  return (
    <div
      className="page-content"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: prepareImages(html) }}
    />
  );
}
