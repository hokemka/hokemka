import { AbsoluteFill, Img, staticFile } from "remotion";
import { Glass } from "../components/Glass";
import { Icon, type IconName } from "../components/Icon";
import type { ShardSpec } from "../components/Shard";
import { Stage } from "../components/Stage";
import { fonts, palette } from "../theme";

const SHARDS: ShardSpec[] = [
  { id: "hero-a", x: 70, y: 56, width: 168, height: 168, radius: 50, tilt: -16, phase: 0.05, drift: 26, sway: 16, icon: "python" },
  { id: "hero-b", x: 962, y: 44, width: 196, height: 196, radius: 58, tilt: 14, phase: 0.4, drift: 30, sway: 18, icon: "telegram" },
  { id: "hero-c", x: 22, y: 292, width: 122, height: 122, radius: 38, tilt: 10, phase: 0.7, drift: 18, sway: 10, icon: "javascript" },
  { id: "hero-d", x: 1044, y: 276, width: 128, height: 128, radius: 64, tilt: 0, phase: 0.2, drift: 18, sway: 8, icon: "nodejs" },
  { id: "hero-e", x: 318, y: 70, width: 84, height: 84, radius: 27, tilt: 24, phase: 0.55, drift: 18, sway: 12, spin: 14, icon: "html" },
  { id: "hero-f", x: 930, y: 236, width: 70, height: 70, radius: 35, tilt: 0, phase: 0.85, drift: 14, sway: 10, icon: "mongodb" },
  { id: "hero-g", x: 196, y: 236, width: 74, height: 74, radius: 24, tilt: -22, phase: 0.3, drift: 14, sway: 12, spin: 16, icon: "css" },
  { id: "hero-h", x: 402, y: 0, width: 68, height: 68, radius: 22, tilt: 18, phase: 0.1, rise: 1, sway: 18, spin: 20, icon: "php" },
  { id: "hero-i", x: 742, y: 300, width: 62, height: 62, radius: 31, tilt: 0, phase: 0.6, rise: 1, sway: 22, icon: "git" },
  { id: "hero-j", x: 834, y: 180, width: 60, height: 60, radius: 20, tilt: -14, phase: 0.9, rise: 1, sway: 12, spin: 22, icon: "cplusplus" },
  { id: "hero-k", x: 570, y: 480, width: 58, height: 58, radius: 29, tilt: 0, phase: 0.45, rise: 1, sway: 16, icon: "docker" },
];

const SKILLS: { label: string; icon: IconName }[] = [
  { label: "сайты", icon: "window" },
  { label: "софт", icon: "code" },
  { label: "telegram-боты", icon: "telegram" },
  { label: "скрипты", icon: "terminal" },
];

const AVATAR = { top: 14, size: 252 };
const EDGE_FADE = "rgba(0,0,0,0), #000 9%, #000 91%, rgba(0,0,0,0)";

export const Hero = () => (
  <Stage shards={SHARDS} band={{ top: AVATAR.top, height: AVATAR.size }}>
    <AbsoluteFill style={{ alignItems: "center", paddingTop: AVATAR.top }}>
      <Img
        src={staticFile("avatar.jpg")}
        style={{
          width: AVATAR.size,
          height: AVATAR.size,
          WebkitMaskImage: `linear-gradient(90deg, ${EDGE_FADE}), linear-gradient(180deg, ${EDGE_FADE})`,
          WebkitMaskComposite: "source-in",
        }}
      />
      <div
        style={{
          marginTop: -12,
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 104,
          lineHeight: 1.05,
          letterSpacing: "-.01em",
          color: palette.white,
          textShadow: "0 10px 34px rgba(10,45,160,.5)",
        }}
      >
        hokemka
      </div>
      <div
        style={{
          marginTop: 4,
          fontFamily: fonts.text,
          fontWeight: 700,
          fontSize: 38,
          letterSpacing: ".02em",
          color: palette.mist,
          textShadow: "0 4px 18px rgba(10,45,160,.45)",
        }}
      >
        fullstack-разработчик · 5+ лет опыта
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 22 }}>
        {SKILLS.map(({ label, icon }) => (
          <Glass key={label} radius={999} blur={12} tint={0.16}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "14px 26px 14px 22px",
                fontFamily: fonts.text,
                fontWeight: 800,
                fontSize: 33,
                color: palette.white,
              }}
            >
              <Icon name={icon} size={35} weight={2.2} />
              {label}
            </div>
          </Glass>
        ))}
      </div>
    </AbsoluteFill>
  </Stage>
);
