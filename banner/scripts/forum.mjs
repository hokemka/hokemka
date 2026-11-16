import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BRANDS, LINES } from "../src/icons.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const TEMPLATE = path.join(ROOT, "forum", "template.html");
const OUTPUT = path.resolve(ROOT, "..", "lolz", "theme.html");

const AVATAR = path.join(ROOT, "forum", "avatar.jpg");

const brandIcon = (name) => `<svg viewBox="0 0 24 24"><path d="${BRANDS[name]}"/></svg>`;

const lineIcon = (name) =>
  `<svg class="hk-line" viewBox="0 0 24 24">${LINES[name].map((d) => `<path d="${d}"/>`).join("")}</svg>`;

const arrowIcon = () => '<svg class="hk-line hk-go" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';

const avatar = () =>
  `<img src="data:image/jpeg;base64,${readFileSync(AVATAR).toString("base64")}" alt="hokemka" width="360" height="360">`;

const render = (template) =>
  template
    .replace(/\{\{brand:([a-z]+)\}\}/g, (_, name) => brandIcon(name))
    .replace(/\{\{line:([a-z]+)\}\}/g, (_, name) => lineIcon(name))
    .replaceAll("{{go}}", arrowIcon())
    .replaceAll("{{avatar}}", avatar());

mkdirSync(path.dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, render(readFileSync(TEMPLATE, "utf8")));
console.log(`${path.relative(process.cwd(), OUTPUT)}  ${(readFileSync(OUTPUT).length / 1024).toFixed(1)} KB`);
