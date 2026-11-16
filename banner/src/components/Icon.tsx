import { BRANDS, LINES, type BrandName, type IconName } from "../icons";

export type { IconName };

type IconProps = {
  name: IconName;
  size: number;
  color?: string;
  weight?: number;
};

const isBrand = (name: IconName): name is BrandName => name in BRANDS;

export const Icon = ({ name, size, color = "#ffffff", weight = 2 }: IconProps) =>
  isBrand(name) ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d={BRANDS[name]} />
    </svg>
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      {LINES[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
