import {
  siCplusplus,
  siCss,
  siDocker,
  siDotnet,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLinux,
  siMongodb,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siTypescript,
} from "simple-icons";

const TELEGRAM_PLANE =
  "M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z";

export const BRANDS = {
  telegram: TELEGRAM_PLANE,
  python: siPython.path,
  javascript: siJavascript.path,
  typescript: siTypescript.path,
  php: siPhp.path,
  cplusplus: siCplusplus.path,
  html: siHtml5.path,
  css: siCss.path,
  nodejs: siNodedotjs.path,
  java: siOpenjdk.path,
  csharp: siDotnet.path,
  mysql: siMysql.path,
  postgresql: siPostgresql.path,
  mongodb: siMongodb.path,
  git: siGit.path,
  docker: siDocker.path,
  linux: siLinux.path,
  github: siGithub.path,
};

export const LINES = {
  code: ["M8.5 7.5 4 12l4.5 4.5", "M15.5 7.5 20 12l-4.5 4.5", "M13.4 5.5l-2.8 13"],
  folder: ["M3.5 7.5a2 2 0 0 1 2-2h4l2 2.4h7a2 2 0 0 1 2 2v7.6a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-10Z"],
  star: ["M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.8L12 3.6Z"],
  megaphone: ["M4 10v4a1.5 1.5 0 0 0 1.5 1.5H8l7.5 4V4.5L8 8.5H5.5A1.5 1.5 0 0 0 4 10Z", "M18.5 9.3a4 4 0 0 1 0 5.4", "M8 15.5l1.2 4.5"],
  globe: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z", "M3.5 12h17", "M12 3.5c2.3 2.3 3.5 5.2 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.2-3.5-8.5s1.2-6.2 3.5-8.5Z"],
  layers: ["M12 3.5 3.5 8l8.5 4.5L20.5 8 12 3.5Z", "M3.5 12l8.5 4.5 8.5-4.5", "M3.5 16l8.5 4.5 8.5-4.5"],
  server: ["M5.5 4h13A1.5 1.5 0 0 1 20 5.5v4a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 9.5v-4A1.5 1.5 0 0 1 5.5 4Z", "M5.5 13h13a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-4A1.5 1.5 0 0 1 5.5 13Z", "M7.5 7.5h.01", "M7.5 16.5h.01"],
  database: ["M4.5 6.5c0-1.7 3.4-3 7.5-3s7.5 1.3 7.5 3-3.4 3-7.5 3-7.5-1.3-7.5-3Z", "M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11", "M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"],
  window: ["M5 4.5h14A1.5 1.5 0 0 1 20.5 6v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18V6A1.5 1.5 0 0 1 5 4.5Z", "M3.5 9h17", "M6.5 6.8h.01", "M9 6.8h.01"],
};

export type BrandName = keyof typeof BRANDS;
export type IconName = BrandName | keyof typeof LINES;
