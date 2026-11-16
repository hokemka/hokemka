import { AbsoluteFill } from "remotion";
import { Glass } from "../components/Glass";
import { Icon, type IconName } from "../components/Icon";
import type { ShardSpec } from "../components/Shard";
import { Stage } from "../components/Stage";
import { fonts, palette } from "../theme";

const SHARDS: ShardSpec[] = [
  { id: "about-a", x: -40, y: -30, width: 150, height: 150, radius: 46, tilt: -16, phase: 0.1, drift: 18, sway: 12, icon: "python" },
  { id: "about-b", x: 1080, y: -20, width: 140, height: 140, radius: 70, tilt: 0, phase: 0.55, drift: 18, sway: 12, icon: "telegram" },
  { id: "about-c", x: 1090, y: 500, width: 130, height: 130, radius: 40, tilt: 14, phase: 0.3, drift: 16, sway: 10, icon: "javascript" },
  { id: "about-d", x: -30, y: 520, width: 120, height: 120, radius: 60, tilt: 0, phase: 0.8, drift: 16, sway: 10, icon: "nodejs" },
  { id: "about-e", x: 560, y: 0, width: 56, height: 56, radius: 18, tilt: 18, phase: 0.4, rise: 1, sway: 18, spin: 18, icon: "git" },
];

const SERVICES: { label: string; icon: IconName }[] = [
  { label: "сайты", icon: "window" },
  { label: "софт", icon: "code" },
  { label: "telegram-боты", icon: "telegram" },
  { label: "парсеры", icon: "search" },
  { label: "чекеры", icon: "check" },
  { label: "скрипты", icon: "terminal" },
];

const FEATURES: { title: string; note: string; icon: IconName }[] = [
  { title: "строго по тз", note: "делаю ровно то, что согласовали", icon: "check" },
  { title: "в срок", note: "называю дедлайн и держу его", icon: "bolt" },
  { title: "чистый код", note: "понятная архитектура без костылей", icon: "code" },
  { title: "на связи", note: "показываю результат по этапам", icon: "chat" },
];

const chip = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 22px 10px 17px",
  borderRadius: 999,
  fontFamily: fonts.text,
  fontWeight: 800,
  fontSize: 27,
  color: palette.white,
  background: "linear-gradient(180deg, rgba(255,255,255,.3), rgba(255,255,255,.14))",
  boxShadow: "inset 0 0 0 2px rgba(255,255,255,.45), inset 0 3px 1px rgba(255,255,255,.5), 0 8px 18px rgba(10,45,160,.2)",
} as const;

export const About = () => (
  <Stage shards={SHARDS}>
    <AbsoluteFill style={{ padding: 40, justifyContent: "center" }}>
      <Glass radius={44} blur={18} tint={0.13}>
        <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 52,
              letterSpacing: "-.01em",
              color: palette.white,
              textShadow: "0 6px 22px rgba(10,45,160,.45)",
            }}
          >
            разработка под ключ
          </div>
          <div
            style={{
              marginTop: 14,
              maxWidth: 940,
              fontFamily: fonts.text,
              fontWeight: 600,
              fontSize: 32,
              lineHeight: 1.35,
              color: palette.mist,
            }}
          >
            беру проект целиком — от архитектуры до запуска — и сдаю готовый продукт, а не набросок
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 24 }}>
            {SERVICES.map(({ label, icon }) => (
              <div key={label} style={chip}>
                <Icon name={icon} size={29} weight={2.2} />
                {label}
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 30, width: "100%" }}>
            {FEATURES.map(({ title, note, icon }) => (
              <div
                key={title}
                style={{
                  padding: "22px 20px 24px",
                  borderRadius: 30,
                  textAlign: "left",
                  background: "linear-gradient(180deg, rgba(255,255,255,.26), rgba(255,255,255,.1))",
                  boxShadow: "inset 0 0 0 2px rgba(255,255,255,.4), inset 0 3px 1px rgba(255,255,255,.5), 0 10px 22px rgba(10,45,160,.2)",
                }}
              >
                <Icon name={icon} size={40} weight={2.2} />
                <div style={{ marginTop: 14, fontFamily: fonts.text, fontWeight: 800, fontSize: 30, color: palette.white }}>{title}</div>
                <div style={{ marginTop: 6, fontFamily: fonts.text, fontWeight: 600, fontSize: 23, lineHeight: 1.3, color: palette.mist }}>{note}</div>
              </div>
            ))}
          </div>
        </div>
      </Glass>
    </AbsoluteFill>
  </Stage>
);
