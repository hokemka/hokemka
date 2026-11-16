import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { Glass } from "../components/Glass";
import { Icon, type IconName } from "../components/Icon";
import type { ShardSpec } from "../components/Shard";
import { Stage } from "../components/Stage";
import { useLoop, wave } from "../loop";
import { fonts, palette } from "../theme";
import { About, SHARDS as ABOUT_SHARDS } from "./About";
import { Hero, SHARDS as HERO_SHARDS } from "./Hero";
import { Stack, SHARDS as STACK_SHARDS } from "./Stack";

type Section = {
  id: string;
  height: number;
};

export const PAGE_WIDTH = 1200;

export const SECTIONS: Section[] = [
  { id: "hero", height: 600 },
  { id: "about", height: 720 },
  { id: "stack", height: 1056 },
  { id: "portfolio", height: 160 },
  { id: "portfolio-links", height: 156 },
  { id: "contacts", height: 160 },
  { id: "contact-links", height: 156 },
  { id: "footer", height: 44 },
];

export const sectionTop = (id: string): number => {
  let top = 0;
  for (const section of SECTIONS) {
    if (section.id === id) {
      return top;
    }
    top += section.height;
  }
  throw new Error(`unknown section ${id}`);
};

export const PAGE_HEIGHT = SECTIONS.reduce((sum, section) => sum + section.height, 0);

const shift = (shards: ShardSpec[], prefix: string, offset: number): ShardSpec[] =>
  shards.map((spec) => ({ ...spec, id: `${prefix}-${spec.id}`, y: spec.y + offset, rise: 0 }));

const SHARDS: ShardSpec[] = [
  ...shift(HERO_SHARDS, "page", sectionTop("hero")),
  ...shift(ABOUT_SHARDS, "page", sectionTop("about")),
  ...shift(STACK_SHARDS, "page", sectionTop("stack")),
  { id: "page-p1", x: 40, y: sectionTop("portfolio") + 30, width: 84, height: 84, radius: 26, tilt: -14, phase: 0.2, icon: "python" },
  { id: "page-p2", x: 1070, y: sectionTop("portfolio") + 20, width: 92, height: 92, radius: 46, tilt: 0, phase: 0.7, icon: "php" },
  { id: "page-c1", x: 60, y: sectionTop("contacts") + 24, width: 80, height: 80, radius: 40, tilt: 0, phase: 0.45, icon: "typescript" },
  { id: "page-c2", x: 1060, y: sectionTop("contacts") + 34, width: 86, height: 86, radius: 26, tilt: 16, phase: 0.9, icon: "mongodb" },
];

const Slot = ({ id, children }: { id: string; children: ReactNode }) => {
  const section = SECTIONS.find((item) => item.id === id);
  return (
    <div style={{ position: "absolute", left: 0, top: sectionTop(id), width: PAGE_WIDTH, height: section?.height }}>{children}</div>
  );
};

const Title = ({ label, icon }: { label: string; icon: IconName }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <Glass radius={999} blur={14} tint={0.17} sheenAt={0.06}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "18px 46px 18px 34px",
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 46,
          letterSpacing: "-.01em",
          color: palette.white,
          textShadow: "0 6px 22px rgba(10,45,160,.45)",
        }}
      >
        <Icon name={icon} size={50} weight={2.1} />
        {label}
      </div>
    </Glass>
  </AbsoluteFill>
);

const Button = ({ label, icon, primary = false }: { label: string; icon: IconName; primary?: boolean }) => {
  const nudge = 6 * wave(useLoop(), 2, 0.1);
  const ink = primary ? "#1d57de" : palette.white;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      <Glass
        radius={999}
        blur={14}
        tint={primary ? 0.9 : 0.17}
        sheenAt={primary ? 0.3 : 0.15}
        style={{ width: 520, height: 112 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            height: 112,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 34,
            letterSpacing: "-.01em",
            color: ink,
            textShadow: primary ? "none" : "0 6px 22px rgba(10,45,160,.45)",
          }}
        >
          <Icon name={icon} size={40} color={ink} weight={2.2} />
          {label}
          <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ transform: `translateX(${nudge}px)` }}>
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </div>
      </Glass>
    </div>
  );
};

const Row = ({ children }: { children: [ReactNode, ReactNode] }) => (
  <AbsoluteFill style={{ flexDirection: "row" }}>
    <div style={{ width: PAGE_WIDTH / 2, height: "100%", paddingLeft: 30 }}>{children[0]}</div>
    <div style={{ width: PAGE_WIDTH / 2, height: "100%", paddingRight: 30 }}>{children[1]}</div>
  </AbsoluteFill>
);

export const Page = () => (
  <Stage shards={SHARDS} band={{ top: 14, height: 252 }}>
    <Slot id="hero">
      <Hero bare />
    </Slot>
    <Slot id="about">
      <About bare />
    </Slot>
    <Slot id="stack">
      <Stack bare />
    </Slot>
    <Slot id="portfolio">
      <Title label="портфолио" icon="folder" />
    </Slot>
    <Slot id="portfolio-links">
      <Row>
        <Button label="отзывы" icon="star" />
        <Button label="сайт-портфолио" icon="globe" />
      </Row>
    </Slot>
    <Slot id="contacts">
      <Title label="контакты" icon="telegram" />
    </Slot>
    <Slot id="contact-links">
      <Row>
        <Button label="написать" icon="telegram" primary />
        <Button label="канал" icon="megaphone" />
      </Row>
    </Slot>
  </Stage>
);
