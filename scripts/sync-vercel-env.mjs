import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const envFile = resolve(process.argv[2] ?? ".env.local");
const keys = [
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ZAPIER_QUOTE_WEBHOOK",
];
const targets = ["production", "preview", "development"];

function parseEnvFile(contents) {
  const values = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const match = line.replace(/^export\s+/, "").match(/^([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!match) continue;

    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[match[1]] = value;
  }

  return values;
}

if (!existsSync(envFile)) {
  console.error(`Missing ${envFile}. Copy .env.example to .env.local and fill in your Supabase and Zapier values first.`);
  process.exit(1);
}

const values = parseEnvFile(readFileSync(envFile, "utf8"));
const selected = keys.filter(
  (key) => values[key] && !/^(your-|changeme|replace|https:\/\/your-project-ref)/i.test(values[key]),
);

if (selected.length === 0) {
  console.error(`No environment values found in ${envFile}.`);
  process.exit(1);
}

const command = process.platform === "win32" ? "vercel.cmd" : "vercel";

for (const key of selected) {
  for (const target of targets) {
    const result = spawnSync(
      command,
      ["env", "add", key, target, "--force", "--yes"],
      {
        input: values[key],
        encoding: "utf8",
        shell: process.platform === "win32",
        windowsHide: true,
      },
    );

    if (result.status !== 0) {
      const details = (result.stderr || result.stdout || "").trim();
      console.error(`Failed to sync ${key} to ${target}.${details ? `\n${details}` : ""}`);
      process.exit(1);
    }

    console.log(`Synced ${key} -> ${target}`);
  }
}
