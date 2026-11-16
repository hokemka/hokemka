import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { useFonts } from "../fonts";
import { Backdrop } from "./Backdrop";
import { Shard, type ShardSpec } from "./Shard";

type StageProps = {
  children: ReactNode;
  shards: ShardSpec[];
  radius?: number;
};

export const Stage = ({ children, shards, radius = 44 }: StageProps) => {
  useFonts();

  return (
    <AbsoluteFill style={{ borderRadius: radius, overflow: "hidden" }}>
      <Backdrop />
      {shards.map((spec) => (
        <Shard key={spec.id} spec={spec} />
      ))}
      {children}
    </AbsoluteFill>
  );
};
