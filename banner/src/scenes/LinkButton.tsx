import { AbsoluteFill, useVideoConfig } from "remotion";
import { Icon, type IconName } from "../components/Icon";
import { Sheen } from "../components/Sheen";
import { Stage } from "../components/Stage";
import { useLoop, wave } from "../loop";
import { scatterShards } from "../shards";
import { fonts, palette } from "../theme";

const SHARD_ICONS: IconName[] = ["python", "javascript", "css", "git", "docker", "typescript"];

export type LinkButtonProps = {
  label: string;
  icon: IconName;
};

export const LinkButton = ({ label, icon }: LinkButtonProps) => {
  const { width, height } = useVideoConfig();
  const progress = useLoop();
  const nudge = 7 * wave(progress, 2, 0.1);
  const shards = scatterShards({
    seed: `button-${label}`,
    count: 4,
    width,
    height,
    minSize: 44,
    maxSize: 78,
    risers: 1,
    keepOut: { left: width * 0.15, right: width * 0.87 },
    icons: SHARD_ICONS,
  });

  return (
    <Stage shards={shards} radius={height / 2}>
      <AbsoluteFill
        style={{
          borderRadius: height / 2,
          boxShadow: "inset 0 0 0 3px rgba(255,255,255,.55), inset 0 5px 4px rgba(255,255,255,.6), inset 0 -6px 12px rgba(12,59,184,.35)",
        }}
      >
        <Sheen start={0.12} span={0.3} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 40,
          letterSpacing: "-.01em",
          color: palette.white,
          textShadow: "0 6px 22px rgba(10,45,160,.5)",
        }}
      >
        <Icon name={icon} size={50} weight={2.1} />
        {label}
        <div style={{ transform: `translateX(${nudge}px)`, display: "flex" }}>
          <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
