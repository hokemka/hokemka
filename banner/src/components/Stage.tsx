import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { useFonts } from "../fonts";
import { Backdrop, SkyBandContext, type SkyBand } from "./Backdrop";
import { Shard, type ShardSpec } from "./Shard";

type StageProps = {
  children: ReactNode;
  shards: ShardSpec[];
  radius?: number;
  band?: SkyBand;
  bare?: boolean;
};

export const Stage = ({ children, shards, radius = 44, band, bare = false }: StageProps) => {
  useFonts();
  if (bare) {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }

  return (
    <SkyBandContext.Provider value={band ?? null}>
      <AbsoluteFill style={{ borderRadius: radius, overflow: "hidden" }}>
        <Backdrop />
        {shards.map((spec) => (
          <Shard key={spec.id} spec={spec} />
        ))}
        {children}
      </AbsoluteFill>
    </SkyBandContext.Provider>
  );
};
