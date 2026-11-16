import { AbsoluteFill } from "remotion";
import { useFonts } from "../fonts";
import { Icon, type IconName } from "../components/Icon";
import { Sheen } from "../components/Sheen";
import { useLoop, wave } from "../loop";
import { fonts } from "../theme";

export type PillProps = {
  label: string;
  icon: IconName;
  primary?: boolean;
  phase?: number;
};

export const PILL_WIDTH = 600;
export const PILL_HEIGHT = 156;

export const Pill = ({ label, icon, primary = false, phase = 0 }: PillProps) => {
  useFonts();
  const progress = useLoop();
  const nudge = 6 * wave(progress, 2, phase);
  const ink = primary ? "#1d57de" : "#ffffff";

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          position: "relative",
          width: 540,
          height: 116,
          borderRadius: 999,
          overflow: "hidden",
          background: primary
            ? "linear-gradient(180deg, #ffffff 0%, #e6eeff 100%)"
            : "linear-gradient(180deg, #77a8f5 0%, #3d77eb 55%, #245fe0 100%)",
          boxShadow: primary
            ? "inset 0 -3px 6px rgba(29,87,222,.2), inset 0 0 0 2px rgba(255,255,255,.9)"
            : "inset 0 0 0 2px rgba(255,255,255,.5), inset 0 3px 2px rgba(255,255,255,.65), inset 0 -4px 8px rgba(12,59,184,.4)",
        }}
      >
        {primary ? null : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,.35) 1.6px, rgba(255,255,255,0) 2.2px)",
              backgroundSize: "26px 26px",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(80% 70% at 30% 0%, rgba(255,255,255,.45), rgba(255,255,255,0) 65%)",
          }}
        />
        <Sheen start={0.1 + phase * 0.4} />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            height: "100%",
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 36,
            letterSpacing: "-.01em",
            color: ink,
            textShadow: primary ? "none" : "0 4px 16px rgba(10,45,160,.45)",
          }}
        >
          <Icon name={icon} size={42} color={ink} weight={2.2} />
          {label}
          <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ transform: `translateX(${nudge}px)` }}>
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
