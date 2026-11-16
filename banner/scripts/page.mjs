import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import gifsicle from "gifsicle";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUTPUT = path.resolve(ROOT, "..", "assets", "page");
const FRAMES = path.join(ROOT, "out", "frames", "page");
const BBCODE = path.resolve(ROOT, "..", "lolz", "theme-page.bbcode");
const PUBLIC_BASE = "https://raw.githubusercontent.com/hokemka/hokemka/moirab/friendly-wozniak-kvvsew/assets/page";
const SOURCE_WIDTH = 1200;
const TARGET_WIDTH = 800;
const SOURCE_FPS = 30;
const GIF_FPS = 15;
const GIF_LOSS = 60;
const VERSION = process.env.THEME_VERSION ?? "3";
const MATTE = "0x111615";

const SECTIONS = [
  { id: "hero", height: 600, link: "https://t.me/hokemka" },
  { id: "about", height: 720 },
  { id: "stack", height: 1056 },
  { id: "portfolio", height: 160 },
  { id: "portfolio-links", height: 156, pills: [["pill-reviews", "https://t.me/hokemkaCode"], ["pill-site", "https://hokemkabio.netlify.app/"]] },
  { id: "contacts", height: 160 },
  { id: "contact-links", height: 156, pills: [["pill-write", "https://t.me/hokemka"], ["pill-channel", "https://t.me/hokemkaCode"]] },
  { id: "footer", height: 44, skip: true },
];

const scale = (value) => Math.round((value * TARGET_WIDTH) / SOURCE_WIDTH);
const run = (command, args) => execFileSync(command, args, { cwd: ROOT, stdio: ["ignore", "ignore", "inherit"] });

const renderFrames = (id, directory) => {
  rmSync(directory, { recursive: true, force: true });
  const args = ["remotion", "render", "src/index.ts", id, directory, "--sequence", "--image-format=png", "--log=error"];
  if (process.env.BROWSER_EXECUTABLE) {
    args.push(`--browser-executable=${process.env.BROWSER_EXECUTABLE}`);
  }
  run("npx", args);
};

const encode = ({ name, x, y, width, height, frames = FRAMES }) => {
  const output = path.join(OUTPUT, `${name}.gif`);
  const outWidth = scale(x + width) - scale(x);
  const outHeight = scale(y + height) - scale(y);
  const graph = [
    `[0:v]fps=${GIF_FPS},crop=${width}:${height}:${x}:${y},scale=${outWidth}:${outHeight}:flags=lanczos,format=rgba,split=2[fg][base]`,
    `[base]drawbox=color=${MATTE}@1:t=fill:replace=1[matte]`,
    "[matte][fg]overlay=format=auto,format=rgb24,split[sample][picture]",
    "[sample]palettegen=max_colors=255:stats_mode=full[palette]",
    "[picture][palette]paletteuse=dither=none",
  ].join(";");
  run("ffmpeg", ["-y", "-v", "error", "-framerate", String(SOURCE_FPS), "-i", path.join(frames, "element-%03d.png"), "-filter_complex", graph, "-loop", "0", output]);
  run(gifsicle, ["-O3", `--lossy=${GIF_LOSS}`, "--batch", output]);
  console.log(`${name}.gif  ${outWidth}x${outHeight}  ${(statSync(output).size / 1024).toFixed(0)} KB`);
  return `${PUBLIC_BASE}/${name}.gif?v=${VERSION}`;
};

const image = (url, link) => (link ? `[URL='${link}'][IMG]${url}[/IMG][/URL]` : `[IMG]${url}[/IMG]`);

const PILL_FRAMES = (id) => path.join(ROOT, "out", "frames", id);
const PILL_SIZE = { width: 600, height: 156 };

if (!process.argv.includes("--skip-render")) {
  renderFrames("page", FRAMES);
}
if (!process.argv.includes("--skip-pills")) {
  for (const section of SECTIONS) {
    for (const [id] of section.pills ?? []) {
      renderFrames(id, PILL_FRAMES(id));
    }
  }
}
mkdirSync(OUTPUT, { recursive: true });

const lines = [];
let top = 0;
SECTIONS.forEach((section, index) => {
  const prefix = String(index + 1).padStart(2, "0");
  if (section.skip) {
    top += section.height;
    return;
  }
  if (section.pills) {
    const pills = section.pills.map(([id, link], side) => {
      const url = encode({ name: `${prefix}-${section.id}-${side ? "b" : "a"}`, x: 0, y: 0, ...PILL_SIZE, frames: PILL_FRAMES(id) });
      return image(url, link);
    });
    lines.push(pills.join(""));
  } else {
    const url = encode({ name: `${prefix}-${section.id}`, x: 0, y: top, width: SOURCE_WIDTH, height: section.height });
    lines.push(image(url, section.link));
  }
  top += section.height;
});

writeFileSync(BBCODE, `[CENTER]${lines.join("\n")}[/CENTER]\n`);
console.log(path.relative(process.cwd(), BBCODE));
