import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import gifsicle from "gifsicle";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS = path.resolve(ROOT, "..", "assets");
const FRAMES = path.join(ROOT, "out", "frames");
const ENTRY = "src/index.ts";
const SOURCE_FPS = 30;
const GIF_FPS = 15;
const MATTE = "0x111615";
const GIF_LOSS = 30;

const TARGETS = [
  { id: "hero", width: 800, video: true },
  { id: "stack", width: 800 },
  { id: "title-portfolio", width: 800 },
  { id: "title-contacts", width: 800 },
  { id: "button-telegram", width: 600 },
  { id: "button-channel", width: 600 },
  { id: "button-site", width: 600 },
  { id: "button-reviews", width: 600 },
];

const run = (command, args) => execFileSync(command, args, { cwd: ROOT, stdio: ["ignore", "ignore", "inherit"] });

const renderFrames = (id) => {
  const directory = path.join(FRAMES, id);
  rmSync(directory, { recursive: true, force: true });
  const args = ["remotion", "render", ENTRY, id, directory, "--sequence", "--image-format=png", "--log=error"];
  if (process.env.BROWSER_EXECUTABLE) {
    args.push(`--browser-executable=${process.env.BROWSER_EXECUTABLE}`);
  }
  run("npx", args);
  return path.join(directory, "element-%03d.png");
};

const flatten = (scale) =>
  [
    `[0:v]${scale}format=rgba,split=3[fg][base][alpha]`,
    `[base]drawbox=color=${MATTE}@1:t=fill:replace=1[matte]`,
    "[matte][fg]overlay=format=auto,format=rgb24[flat]",
  ].join(";");

const encodeGif = (frames, id, width) => {
  const output = path.join(ASSETS, `${id}.gif`);
  const graph = [
    flatten(`fps=${GIF_FPS},scale=${width}:-1:flags=lanczos,`),
    "[alpha]alphaextract,lut='if(gt(val,40),255,0)'[mask]",
    "[flat][mask]alphamerge,split[sample][picture]",
    "[sample]palettegen=max_colors=255:reserve_transparent=1:stats_mode=full[palette]",
    "[picture][palette]paletteuse=dither=none:alpha_threshold=128",
  ].join(";");
  run("ffmpeg", ["-y", "-v", "error", "-framerate", String(SOURCE_FPS), "-i", frames, "-filter_complex", graph, "-loop", "0", output]);
  run(gifsicle, ["-O3", `--lossy=${GIF_LOSS}`, "--batch", output]);
  return output;
};

const encodeVideo = (frames, id) => {
  const output = path.join(ASSETS, `${id}.mp4`);
  const graph = `${flatten("")};[alpha]nullsink`;
  run("ffmpeg", [
    "-y", "-v", "error", "-framerate", String(SOURCE_FPS), "-i", frames,
    "-filter_complex", graph, "-map", "[flat]",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-movflags", "+faststart", output,
  ]);
  return output;
};

const report = (file) => console.log(`${path.basename(file)}  ${(statSync(file).size / 1024).toFixed(0)} KB`);

const only = process.argv.slice(2);
const queue = only.length ? TARGETS.filter(({ id }) => only.includes(id)) : TARGETS;

mkdirSync(ASSETS, { recursive: true });

for (const { id, width, video } of queue) {
  const frames = renderFrames(id);
  report(encodeGif(frames, id, width));
  if (video) {
    report(encodeVideo(frames, id));
  }
}
