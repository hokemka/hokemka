import { interpolate } from "remotion";
import { useLoop } from "../loop";

type SheenProps = {
  start?: number;
  span?: number;
};

export const Sheen = ({ start = 0.1, span = 0.26 }: SheenProps) => {
  const progress = useLoop();
  const shift = interpolate(progress, [start, start + span], [-60, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: "-20%",
          bottom: "-20%",
          width: "34%",
          left: 0,
          transform: `translateX(${shift * 2.95}%) skewX(-20deg)`,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.42) 50%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
};
