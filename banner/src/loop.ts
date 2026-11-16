import { useCurrentFrame, useVideoConfig } from "remotion";

const TAU = Math.PI * 2;

export const useLoop = (): number => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (frame % durationInFrames) / durationInFrames;
};

export const wave = (progress: number, cycles: number, phase = 0): number =>
  Math.sin(TAU * (cycles * progress + phase));

export const wrap = (value: number, size: number): number => ((value % size) + size) % size;
