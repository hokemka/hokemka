import { useVideoConfig } from "remotion";
import { useLoop, wave, wrap } from "../loop";
import { Backdrop } from "./Backdrop";
import { Icon, type IconName } from "./Icon";
import { LensFilter } from "./LensFilter";

export type ShardSpec = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  tilt: number;
  drift?: number;
  sway?: number;
  spin?: number;
  phase?: number;
  rise?: number;
  zoom?: number;
  icon?: IconName;
};

type ShardProps = {
  spec: ShardSpec;
};

const RIM =
  "conic-gradient(from var(--rim-angle), rgba(255,255,255,.95), rgba(120,225,255,.7) 14%, rgba(255,255,255,.12) 30%, rgba(185,160,255,.65) 48%, rgba(255,255,255,.9) 58%, rgba(255,255,255,.1) 76%, rgba(255,200,235,.55) 88%, rgba(255,255,255,.95))";

export const Shard = ({ spec }: ShardProps) => {
  const progress = useLoop();
  const stage = useVideoConfig();
  const { id, width, height, radius, tilt, drift = 22, sway = 14, spin = 8, phase = 0, rise = 0, zoom = 1.22, icon } = spec;

  const lane = stage.height + height * 2;
  const baseY = rise ? wrap(spec.y + height - rise * lane * progress, lane) - height : spec.y;
  const x = spec.x + sway * wave(progress, 1, phase);
  const y = baseY + (rise ? 0 : drift * wave(progress, 1, phase + 0.25));
  const angle = tilt + spin * wave(progress, 1, phase + 0.6);
  const rimAngle = 200 + 360 * progress + phase * 360;

  return (
    <>
      <LensFilter id={id} width={width} height={height} radius={radius} strength={Math.min(width, height) * 0.34} />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height,
          borderRadius: radius,
          transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
          boxShadow: "0 24px 46px rgba(10,45,160,.36), 0 4px 10px rgba(10,45,160,.18)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", filter: `url(#${id}) saturate(1.25) brightness(1.06)` }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: stage.width,
                height: stage.height,
                transformOrigin: `${width / 2}px ${height / 2}px`,
                transform: `scale(${zoom}) rotate(${-angle}deg) translate(${-x}px, ${-y}px)`,
              }}
            >
              <Backdrop />
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: [
              "radial-gradient(90% 60% at 26% 0%, rgba(255,255,255,.46), rgba(255,255,255,0) 58%)",
              "radial-gradient(70% 45% at 80% 100%, rgba(255,255,255,.3), rgba(255,255,255,0) 70%)",
              "linear-gradient(140deg, rgba(255,255,255,.12) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,.1) 100%)",
            ].join(","),
            boxShadow: [
              "inset 0 2px 1px rgba(255,255,255,.8)",
              "inset 2px 0 1px rgba(255,255,255,.3)",
              "inset 0 -3px 6px rgba(255,255,255,.28)",
              "inset 0 0 22px rgba(255,255,255,.16)",
            ].join(","),
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            padding: 2,
            background: RIM,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            ["--rim-angle" as string]: `${rimAngle}deg`,
          }}
        />
        {icon ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "drop-shadow(0 6px 12px rgba(10,45,160,.5))",
            }}
          >
            <Icon name={icon} size={Math.min(width, height) * 0.5} />
          </div>
        ) : null}
      </div>
    </>
  );
};
