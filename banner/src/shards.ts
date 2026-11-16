import { random } from "remotion";
import type { IconName } from "./components/Icon";
import type { ShardSpec } from "./components/Shard";

type ScatterOptions = {
  seed: string;
  count: number;
  width: number;
  height: number;
  minSize: number;
  maxSize: number;
  risers?: number;
  keepOut?: { left: number; right: number };
  icons?: IconName[];
};

export const scatterShards = ({ seed, count, width, height, minSize, maxSize, risers = 0, keepOut, icons }: ScatterOptions): ShardSpec[] =>
  Array.from({ length: count }, (_, index) => {
    const pick = (salt: string): number => random(`${seed}-${index}-${salt}`);
    const size = minSize + (maxSize - minSize) * pick("size");
    const round = pick("shape") > 0.55;
    const slot = (index + 0.2 + pick("slot") * 0.4) / count;
    let x = slot * (width + size) - size / 2;
    if (keepOut && x + size > keepOut.left && x < keepOut.right) {
      x = index % 2 ? keepOut.right + pick("gap") * 40 : keepOut.left - size - pick("gap") * 40;
    }

    return {
      id: `${seed}-${index}`,
      x,
      y: pick("y") * (height - size * 0.6) - size * 0.2,
      width: size,
      height: size,
      radius: round ? size / 2 : size * 0.3,
      tilt: round ? 0 : -24 + pick("tilt") * 48,
      phase: pick("phase"),
      drift: 8 + pick("drift") * 12,
      sway: 8 + pick("sway") * 12,
      spin: round ? 0 : 10 + pick("spin") * 12,
      rise: index < risers ? 1 : 0,
      icon: icons?.[index % icons.length],
    };
  });
