import { Fragment } from "react";

type LensFilterProps = {
  id: string;
  width: number;
  height: number;
  radius: number;
  strength: number;
};

const buildMap = (width: number, height: number, radius: number): string => {
  const edge = Math.min(width, height) * 0.17;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs>
<linearGradient id="r" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#f00"/></linearGradient>
<linearGradient id="b" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#00f"/></linearGradient>
<filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${edge * 0.55}"/></filter>
</defs>
<rect width="${width}" height="${height}" fill="#800080"/>
<rect width="${width}" height="${height}" rx="${radius}" fill="#000"/>
<rect width="${width}" height="${height}" rx="${radius}" fill="url(#r)" style="mix-blend-mode:screen"/>
<rect width="${width}" height="${height}" rx="${radius}" fill="url(#b)" style="mix-blend-mode:screen"/>
<rect x="${edge}" y="${edge}" width="${width - edge * 2}" height="${height - edge * 2}" rx="${Math.max(radius - edge, 4)}" fill="#800080" filter="url(#soft)"/>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const CHANNELS = [
  { key: "r", gain: 1, matrix: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" },
  { key: "g", gain: 1.07, matrix: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" },
  { key: "b", gain: 1.14, matrix: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" },
];

export const LensFilter = ({ id, width, height, radius, strength }: LensFilterProps) => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feImage
        href={buildMap(width, height, radius)}
        x={0}
        y={0}
        width={width}
        height={height}
        preserveAspectRatio="none"
        result="map"
      />
      {CHANNELS.map(({ key, gain, matrix }) => (
        <Fragment key={key}>
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale={-strength * gain}
            xChannelSelector="R"
            yChannelSelector="B"
            result={`shift-${key}`}
          />
          <feColorMatrix in={`shift-${key}`} type="matrix" values={matrix} result={`tone-${key}`} />
        </Fragment>
      ))}
      <feBlend in="tone-r" in2="tone-g" mode="screen" result="tone-rg" />
      <feBlend in="tone-rg" in2="tone-b" mode="screen" />
    </filter>
  </svg>
);
