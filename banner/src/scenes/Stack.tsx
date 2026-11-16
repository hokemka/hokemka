import { AbsoluteFill } from "remotion";
import { Glass } from "../components/Glass";
import { Icon, type IconName } from "../components/Icon";
import type { ShardSpec } from "../components/Shard";
import { Stage } from "../components/Stage";
import { fonts, palette } from "../theme";

const SHARDS: ShardSpec[] = [
  { id: "stack-a", x: -36, y: 16, width: 176, height: 176, radius: 54, tilt: -18, phase: 0.1, drift: 24, sway: 16, icon: "docker" },
  { id: "stack-b", x: 1046, y: 6, width: 156, height: 156, radius: 78, tilt: 0, phase: 0.5, drift: 22, sway: 18, icon: "git" },
  { id: "stack-c", x: 820, y: 300, width: 190, height: 190, radius: 58, tilt: 20, phase: 0.8, drift: 30, sway: 26, spin: 14, icon: "linux" },
  { id: "stack-d", x: 120, y: 520, width: 170, height: 170, radius: 85, tilt: 0, phase: 0.3, drift: 28, sway: 24, icon: "github" },
  { id: "stack-e", x: 900, y: 760, width: 200, height: 200, radius: 60, tilt: 14, phase: 0.65, drift: 26, sway: 22, icon: "telegram" },
  { id: "stack-f", x: -30, y: 880, width: 150, height: 150, radius: 46, tilt: -12, phase: 0.2, drift: 20, sway: 18, icon: "python" },
  { id: "stack-g", x: 520, y: 400, width: 64, height: 64, radius: 22, tilt: 22, phase: 0.25, rise: 1, sway: 24, spin: 18, icon: "javascript" },
  { id: "stack-h", x: 1120, y: 700, width: 56, height: 56, radius: 28, tilt: 0, phase: 0.75, rise: 1, sway: 16, icon: "mongodb" },
  { id: "stack-i", x: 320, y: 900, width: 50, height: 50, radius: 17, tilt: -16, phase: 0.45, rise: 1, sway: 22, spin: 20, icon: "css" },
];

type Tool = { label: string; icon: IconName };

const GROUPS: { title: string; icon: IconName; items: Tool[] }[] = [
  { title: "языки", icon: "code", items: [{ label: "C++", icon: "cplusplus" }, { label: "Python", icon: "python" }, { label: "PHP", icon: "php" }] },
  { title: "frontend", icon: "window", items: [{ label: "HTML", icon: "html" }, { label: "CSS", icon: "css" }, { label: "JavaScript", icon: "javascript" }, { label: "TypeScript", icon: "typescript" }] },
  { title: "backend", icon: "server", items: [{ label: "Node.js", icon: "nodejs" }, { label: "Java", icon: "java" }, { label: "C#", icon: "csharp" }] },
  { title: "базы данных", icon: "database", items: [{ label: "MySQL", icon: "mysql" }, { label: "PostgreSQL", icon: "postgresql" }, { label: "MongoDB", icon: "mongodb" }] },
];

export const Stack = () => (
  <Stage shards={SHARDS}>
    <AbsoluteFill style={{ alignItems: "center", padding: "42px 48px 0" }}>
      <Glass radius={999} blur={14} tint={0.16} sheenAt={0.05}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "20px 46px 20px 34px",
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 48,
            letterSpacing: "-.01em",
            color: palette.white,
            textShadow: "0 6px 22px rgba(10,45,160,.45)",
          }}
        >
          <Icon name="layers" size={52} weight={2.1} />
          стек технологий
        </div>
      </Glass>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, width: "100%", marginTop: 34 }}>
        {GROUPS.map(({ title, icon, items }) => (
          <Glass key={title} radius={44} blur={18} tint={0.13}>
            <div style={{ padding: "28px 34px 32px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 36,
                  lineHeight: 1.15,
                  color: palette.white,
                  textShadow: "0 4px 16px rgba(10,45,160,.4)",
                }}
              >
                <Icon name={icon} size={42} weight={2.1} />
                {title}
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
                {items.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 28px 13px 22px",
                      borderRadius: 999,
                      fontFamily: fonts.text,
                      fontWeight: 800,
                      fontSize: 35,
                      lineHeight: 1.2,
                      color: palette.white,
                      background: "linear-gradient(180deg, rgba(255,255,255,.3), rgba(255,255,255,.14))",
                      boxShadow:
                        "inset 0 0 0 2px rgba(255,255,255,.45), inset 0 3px 1px rgba(255,255,255,.5), 0 8px 18px rgba(10,45,160,.2)",
                    }}
                  >
                    <Icon name={item.icon} size={34} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </Glass>
        ))}
      </div>
    </AbsoluteFill>
  </Stage>
);
