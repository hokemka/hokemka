import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BRANDS, LINES } from "../src/icons.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const TEMPLATE = path.join(ROOT, "forum", "template.html");
const OUTPUT = path.resolve(ROOT, "..", "lolz", "theme.html");

const FACE =
  "183,207 248,181 248,298 342,298 342,247 407,222 407,298 483,298 462,350 407,350 407,447 342,447 342,350 248,350 248,447 183,447";

const brandIcon = (name) => `<svg viewBox="0 0 24 24"><path d="${BRANDS[name]}"/></svg>`;

const lineIcon = (name) =>
  `<svg class="hk-line" viewBox="0 0 24 24">${LINES[name].map((d) => `<path d="${d}"/>`).join("")}</svg>`;

const arrowIcon = () => '<svg class="hk-line hk-go" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';

const logo = () => {
  const depth = Array.from({ length: 10 }, (_, index) => {
    const step = index + 1;
    return `<polygon points="${FACE}" transform="translate(${(step * 0.35).toFixed(2)} ${(step * 1.1).toFixed(1)})" fill="url(#hk-depth)" stroke="url(#hk-depth)" stroke-width="7" stroke-linejoin="round"/>`;
  }).join("");

  return [
    '<svg viewBox="100 100 440 440">',
    '<defs><linearGradient id="hk-face" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e9eeff"/></linearGradient>',
    '<linearGradient id="hk-depth" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#c6d3ff"/><stop offset="1" stop-color="#8fa9f5"/></linearGradient></defs>',
    `<g style="filter:drop-shadow(0 14px 14px rgba(12,59,184,.38))">${depth}<polygon points="${FACE}" fill="url(#hk-face)" stroke="url(#hk-face)" stroke-width="7" stroke-linejoin="round"/></g>`,
    '<g fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M441 194l-10 9 10 9"/><path d="M456 190l-8 26"/><path d="M463 194l10 9-10 9"/></g>',
    "</svg>",
  ].join("");
};

const render = (template) =>
  template
    .replace(/\{\{brand:([a-z]+)\}\}/g, (_, name) => brandIcon(name))
    .replace(/\{\{line:([a-z]+)\}\}/g, (_, name) => lineIcon(name))
    .replaceAll("{{go}}", arrowIcon())
    .replaceAll("{{logo}}", logo());

mkdirSync(path.dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, render(readFileSync(TEMPLATE, "utf8")));
console.log(`${path.relative(process.cwd(), OUTPUT)}  ${(readFileSync(OUTPUT).length / 1024).toFixed(1)} KB`);
