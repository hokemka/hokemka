import { AbsoluteFill } from "remotion";
import { palette } from "../theme";

type BackdropProps = {
  dotGap?: number;
  dotRadius?: number;
};

export const Backdrop = ({ dotGap = 40, dotRadius = 2 }: BackdropProps) => (
  <AbsoluteFill>
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${palette.skyTop} 0%, ${palette.skyMid} 46%, ${palette.skyBottom} 100%)`,
      }}
    />
    <AbsoluteFill
      style={{
        background: [
          "radial-gradient(46% 70% at 8% 0%, rgba(255,255,255,.62), rgba(255,255,255,0) 70%)",
          "radial-gradient(40% 62% at 96% 2%, rgba(255,255,255,.5), rgba(255,255,255,0) 72%)",
          "radial-gradient(60% 80% at 50% 118%, rgba(12,59,184,.55), rgba(12,59,184,0) 70%)",
        ].join(","),
      }}
    />
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <pattern id="dots" width={dotGap} height={dotGap} patternUnits="userSpaceOnUse">
          <circle cx={dotGap / 2} cy={dotGap / 2} r={dotRadius} fill="rgba(255,255,255,.42)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  </AbsoluteFill>
);
