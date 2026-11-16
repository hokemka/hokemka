import { AbsoluteFill, useVideoConfig } from "remotion";
import { Glass } from "../components/Glass";
import { Icon, type IconName } from "../components/Icon";
import { Stage } from "../components/Stage";
import { scatterShards } from "../shards";
import { fonts, palette } from "../theme";

const SHARD_ICONS: IconName[] = ["python", "telegram", "javascript", "html", "nodejs", "typescript", "php", "mongodb"];

export type SectionTitleProps = {
  title: string;
  icon: IconName;
};

export const SectionTitle = ({ title, icon }: SectionTitleProps) => {
  const { width, height } = useVideoConfig();
  const shards = scatterShards({ seed: `title-${title}`, count: 8, width, height, minSize: 46, maxSize: 104, risers: 2, icons: SHARD_ICONS });

  return (
    <Stage shards={shards} radius={40}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Glass radius={999} blur={14} tint={0.17} sheenAt={0.06}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "20px 48px 20px 34px",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 48,
              letterSpacing: "-.01em",
              color: palette.white,
              textShadow: "0 6px 22px rgba(10,45,160,.45)",
            }}
          >
            <Icon name={icon} size={52} weight={2.1} />
            {title}
          </div>
        </Glass>
      </AbsoluteFill>
    </Stage>
  );
};
