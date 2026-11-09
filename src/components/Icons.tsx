/** Icônes au trait, décoratives (aria-hidden) : le libellé est toujours dans le texte. */
type P = { className?: string };
const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const PhoneIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M5.2 3.5h3l1.6 4.2-2 1.3a11 11 0 0 0 7.2 7.2l1.3-2 4.2 1.6v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3.2 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);
export const ArrowIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
  </svg>
);
export const PinIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);
export const MenuBookIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 5.5h6.5A1.5 1.5 0 0 1 12 7v12a1.5 1.5 0 0 0-1.5-1.5H4ZM20 5.5h-6.5A1.5 1.5 0 0 0 12 7v12a1.5 1.5 0 0 1 1.5-1.5H20Z" />
  </svg>
);
export const SearchIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </svg>
);
export const CloseIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const BurgerIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const ExternalIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);
