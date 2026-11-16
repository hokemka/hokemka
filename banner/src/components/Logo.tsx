type LogoProps = {
  size: number;
};

const FACE =
  "183,207 248,181 248,298 342,298 342,247 407,222 407,298 483,298 462,350 407,350 407,447 342,447 342,350 248,350 248,447 183,447";
const DEPTH_STEPS = Array.from({ length: 10 }, (_, step) => step + 1);

export const Logo = ({ size }: LogoProps) => (
  <svg width={size} height={size} viewBox="100 100 440 440">
    <defs>
      <linearGradient id="logo-face" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#e9eeff" />
      </linearGradient>
      <linearGradient id="logo-depth" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#c6d3ff" />
        <stop offset="1" stopColor="#8fa9f5" />
      </linearGradient>
      <filter id="logo-shadow" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#0c3bb8" floodOpacity=".38" />
      </filter>
    </defs>
    <g filter="url(#logo-shadow)">
      {DEPTH_STEPS.map((step) => (
        <polygon
          key={step}
          points={FACE}
          transform={`translate(${step * 0.35} ${step * 1.1})`}
          fill="url(#logo-depth)"
          stroke="url(#logo-depth)"
          strokeWidth={7}
          strokeLinejoin="round"
        />
      ))}
      <polygon points={FACE} fill="url(#logo-face)" stroke="url(#logo-face)" strokeWidth={7} strokeLinejoin="round" />
    </g>
    <g fill="none" stroke="#ffffff" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M441 194l-10 9 10 9" />
      <path d="M456 190l-8 26" />
      <path d="M463 194l10 9-10 9" />
    </g>
  </svg>
);
