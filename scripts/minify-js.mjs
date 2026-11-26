import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { minify } = require("next/dist/compiled/terser");

const sourcePath = path.join(process.cwd(), "public/assets/js/site-behavior.js");
const outputPath = path.join(
  process.cwd(),
  "public/assets/js/site-behavior.min.js",
);

const source = fs.readFileSync(sourcePath, "utf8");
const { code } = await minify(source, {
  compress: true,
  mangle: true,
  format: { comments: false },
});

fs.writeFileSync(outputPath, code);
console.log(
  `site-behavior.js: ${(source.length / 1024).toFixed(1)} KB -> ${(code.length / 1024).toFixed(1)} KB`,
);
