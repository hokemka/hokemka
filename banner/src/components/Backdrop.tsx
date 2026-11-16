import { createContext, useContext } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { palette, sky } from "../theme";

export type SkyBand = {
  top: number;
  height: number;
};

export const SkyBandContext = createContext<SkyBand | null>(null);

const DOT_GAP = 40;
const DOT_RADIUS = 2;

export const Backdrop = () => {
  const stage = useVideoConfig();
  const band = useContext(SkyBandContext) ?? { top: -stage.height * 0.35, height: stage.height * 1.35 };
  const stops = sky.map((color, index) => `${color} ${band.top + (band.height * index) / (sky.length - 1)}px`);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${stops.join(", ")}, ${palette.deep} 100%)` }} />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="dots" width={DOT_GAP} height={DOT_GAP} patternUnits="userSpaceOnUse">
            <circle cx={DOT_GAP / 2} cy={DOT_GAP / 2} r={DOT_RADIUS} fill="rgba(255,255,255,.42)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </AbsoluteFill>
  );
};
