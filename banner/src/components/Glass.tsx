import type { CSSProperties, ReactNode } from "react";
import { Sheen } from "./Sheen";

type GlassProps = {
  children?: ReactNode;
  radius: number;
  blur?: number;
  tint?: number;
  sheenAt?: number;
  style?: CSSProperties;
};

export const Glass = ({ children, radius, blur = 16, tint = 0.14, sheenAt, style }: GlassProps) => (
  <div
    style={{
      position: "relative",
      borderRadius: radius,
      backdropFilter: `blur(${blur}px) saturate(160%) brightness(1.06)`,
      background: `linear-gradient(160deg, rgba(255,255,255,${tint + 0.12}) 0%, rgba(255,255,255,${tint}) 45%, rgba(255,255,255,${tint + 0.05}) 100%)`,
      boxShadow: [
        "inset 0 0 0 2px rgba(255,255,255,.5)",
        "inset 0 3px 2px rgba(255,255,255,.75)",
        "inset 0 -2px 3px rgba(255,255,255,.22)",
        "0 26px 56px rgba(10,45,160,.3)",
      ].join(","),
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        background: "radial-gradient(80% 55% at 30% 0%, rgba(255,255,255,.4), rgba(255,255,255,0) 65%)",
        pointerEvents: "none",
      }}
    />
    {sheenAt === undefined ? null : <Sheen start={sheenAt} />}
    <div style={{ position: "relative" }}>{children}</div>
  </div>
);
