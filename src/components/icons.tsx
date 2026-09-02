import type { ReactNode, SVGProps } from "react";
import { roastName } from "../types";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 18, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconBean = (p: IconProps) => (
  <Svg {...p}>
    <ellipse cx="12" cy="12" rx="6.2" ry="8.6" transform="rotate(28 12 12)" />
    <path d="M8.6 4.8c4.4 4 2.4 10.6 6.8 14.4" />
  </Svg>
);

export const IconBag = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 8h13l.9 12.2a1 1 0 0 1-1 1.08H5.6a1 1 0 0 1-1-1.08L5.5 8Z" />
    <path d="M8.8 10.4V6.2a3.2 3.2 0 0 1 6.4 0v4.2" />
  </Svg>
);

export const IconSearch = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.6 15.6 4.9 4.9" />
  </Svg>
);

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </Svg>
);

export const IconPlus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const IconMinus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
);

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const IconTrash = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M10 4h4M6.5 7l.8 12.2a1 1 0 0 0 1 .8h7.4a1 1 0 0 0 1-.8L17.5 7" />
    <path d="M10 11v5M14 11v5" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4.5 12.8 5 5L19.5 6.5" />
  </Svg>
);

export const IconFlame = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.2c1.2 3.2 5 5.2 5 9.6a5 5 0 0 1-10 0c0-1.9.8-3.3 1.9-4.8.5 1 1.3 1.7 2.4 1.9-.6-2.6-.3-4.7.7-6.7Z" />
  </Svg>
);

export const IconTruck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 6h11.5v10H2.5zM14 9.5h4.2l2.8 3.4v3.1H14" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </Svg>
);

export const IconLeaf = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 19C5 9.5 12.5 5 20 5c0 8.5-4.5 14-13 14" />
    <path d="M5 19c2.2-5 5.4-8.2 10-10.4" />
  </Svg>
);

export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </Svg>
);

export const IconCard = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="5.5" width="19" height="13.5" rx="2" />
    <path d="M2.5 10h19M6 15h4" />
  </Svg>
);

export const IconLock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="1.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </Svg>
);

export const IconPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s-6.5-5.6-6.5-10.4a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.4" r="2.3" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

/** Five dots showing roast depth, light → dark. */
export function RoastMeter({ level, className = "" }: { level: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-[3px] ${className}`}
      title={`Roast: ${roastName(level)}`}
      aria-label={`Roast level: ${roastName(level)}`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-[7px] w-[7px] rounded-full transition-colors ${
            i <= level ? "bg-ink" : "bg-ink/15"
          }`}
        />
      ))}
    </span>
  );
}
