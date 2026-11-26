import fs from "node:fs";
import path from "node:path";
import safeParser from "next/dist/compiled/postcss-safe-parser/safe-parse.js";
import { PurgeCSS } from "purgecss";

const rootDir = process.cwd();
const sourcePath = path.join(rootDir, "public/assets/css/site.css");
const outputPath = path.join(rootDir, "app/site.css");
const themeMarker = "/*\nTheme Name: Moving";

const staticContent = [
  "content/**/*.html",
  "app/**/*.{tsx,ts,jsx,js}",
  "components/**/*.{tsx,ts,jsx,js}",
  "lib/**/*.{ts,tsx,js,jsx}",
];

const safelist = {
  standard: [
    "active",
    "in",
    "show",
    "collapse",
    "collapsing",
    "open",
    "disabled",
    "selected",
    "current",
    "quote-popup-overlay",
    "sr-only",
    "clearfix",
  ],
  deep: [
    /^quote-popup/,
    /^jsx-/,
    /^rslides/,
    /^wpcf7/,
    /^wp-block/,
    /^nf-/,
    /^gform/,
    /^datepicker/,
    /^modal/,
    /^tooltip/,
    /^popover/,
    /^carousel/,
    /^glyphicon/,
    /^fa-/,
    /^has-/,
    /^is-/,
  ],
};

function normalizeCss(css) {
  return css
    .replace(/^\s*@import\s+url\([^)]*\)\s*;\s*/i, "")
    .replace(/url\(\.\.\/images\//g, "url(/assets/images/")
    .replace(/url\('\.\.\/images\//g, "url('/assets/images/")
    .replace(/url\("\.\.\/images\//g, 'url("/assets/images/');
}

function sanitizeLegacyCss(css) {
  const root = safeParser(css);
  const removeAtRules = new Set([
    "-ms-viewport",
    "-o-viewport",
    "viewport",
    "-o-keyframes",
  ]);

  root.walkAtRules((rule) => {
    if (removeAtRules.has(rule.name)) {
      rule.remove();
    }
  });

  root.walkDecls((decl) => {
    if (decl.value == null || String(decl.value).trim() === "") {
      decl.remove();
    }
  });

  return root
    .toString()
    .replace(/;\s*left\s*;/g, ";")
    .replace(/;\s*right\s*;/g, ";");
}

async function main() {
  const original = normalizeCss(fs.readFileSync(sourcePath, "utf8"));
  const markerIndex = original.indexOf(themeMarker);

  if (markerIndex === -1) {
    throw new Error("Could not find the legacy theme boundary in site.css");
  }

  const tailwindCss = original.slice(0, markerIndex);
  const legacyCss = sanitizeLegacyCss(original.slice(markerIndex));

  const result = await new PurgeCSS().purge({
    content: staticContent,
    css: [{ raw: legacyCss }],
    safelist,
    fontFace: false,
    keyframes: false,
    variables: false,
  });

  const purgedLegacy = result[0]?.css ?? "";
  const output = `${tailwindCss}\n${purgedLegacy}`;

  fs.writeFileSync(outputPath, output);

  const pct = ((1 - output.length / original.length) * 100).toFixed(1);
  console.log(
    `site.css: ${(original.length / 1024).toFixed(1)} KB -> ${(output.length / 1024).toFixed(1)} KB (-${pct}%)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
