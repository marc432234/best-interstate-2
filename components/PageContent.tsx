import fs from "fs";
import path from "path";

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

export default function PageContent({ slug }: { slug: string }) {
  const filePath = path.join(contentDir, `${slug}.html`);
  let html = fs.readFileSync(filePath, "utf8");

  for (const [token, markup] of Object.entries(quoteFormVariants)) {
    html = html.split(`<!--${token}-->`).join(markup);
  }

  if (/<!--@@QUOTE_FORM(?:_STATE)?@@-->/.test(html)) {
    throw new Error(`Unreplaced quote form token in ${slug}.html`);
  }

  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
