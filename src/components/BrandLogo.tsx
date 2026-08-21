import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'crimson' | 'gold' | 'monochrome';
  showGlow?: boolean;
  animated?: boolean;
  idPrefix?: string;
}

/**
 * Flame & Dagger Official Brand Emblem
 * Handcrafted high-resolution SVG matching the user's flame-enveloped dagger insignia.
 */
export default function BrandLogo({
  className = '',
  size = 36,
  variant = 'crimson',
  showGlow = false,
  animated = false,
  idPrefix = 'flame-dagger',
}: BrandLogoProps) {
  const gradientId = `${idPrefix}-grad`;
  const filterId = `${idPrefix}-glow`;

  // Color configurations based on variant
  const colors = {
    crimson: {
      primary: '#D31A24',
      secondary: '#9E0B12',
      highlight: '#FF4D55',
      glow: 'rgba(211, 26, 36, 0.5)',
      stroke: '#FF4D55',
    },
    gold: {
      primary: '#E5B869',
      secondary: '#9A6E24',
      highlight: '#FFF2C6',
      glow: 'rgba(229, 184, 105, 0.5)',
      stroke: '#FFF2C6',
    },
    monochrome: {
      primary: '#F5F0E8',
      secondary: '#8C827A',
      highlight: '#FFFFFF',
      glow: 'rgba(245, 240, 232, 0.4)',
      stroke: '#FFFFFF',
    },
  }[variant];

  return (
    <svg
      viewBox="0 0 200 240"
      width={size}
      height={typeof size === 'number' ? (size * 240) / 200 : size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${animated ? 'transition-transform duration-300 hover:scale-105' : ''} ${className}`}
      style={{
        filter: showGlow ? `drop-shadow(0 0 10px ${colors.glow})` : undefined,
      }}
      aria-label="Ember & Stone Flame Dagger Logo"
    >
      <defs>
        <linearGradient id={gradientId} x1="100" y1="10" x2="100" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors.highlight} />
          <stop offset="45%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.secondary} />
        </linearGradient>

        <linearGradient id={`${gradientId}-blade`} x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors.highlight} />
          <stop offset="50%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.secondary} />
        </linearGradient>

        {showGlow && (
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      {/* OUTER FLAME BODY WITH DUAL WINGS & CRESTS */}
      <path
        d="M 100 228
           C 85 228, 70 216, 62 198
           C 54 180, 58 152, 64 128
           C 68 112, 70 94, 76 74
           C 80 60, 86 44, 94 12
           C 95 10, 97 10, 98 12
           C 106 44, 112 60, 116 74
           C 122 94, 124 112, 128 128
           C 134 152, 138 180, 130 198
           C 122 216, 107 228, 100 228 Z
           
           M 100 16
           C 88 48, 76 68, 68 94
           C 60 120, 56 142, 60 168
           C 64 194, 78 214, 100 216
           C 122 214, 136 194, 140 168
           C 144 142, 140 120, 132 94
           C 124 68, 112 48, 100 16 Z"
        fill={`url(#${gradientId})`}
        fillRule="evenodd"
        opacity="0.15"
      />

      {/* MAIN RED FLAME CONTOUR (User's Exact Silhouette) */}
      <path
        d="M 100 8
           C 104 22, 106 38, 112 50
           C 118 62, 128 72, 134 60
           C 132 78, 126 94, 118 108
           C 114 114, 122 120, 128 126
           C 138 136, 146 150, 148 166
           C 152 186, 142 208, 124 222
           C 112 230, 98 232, 92 230
           C 82 226, 72 218, 66 206
           C 58 190, 58 170, 62 152
           C 66 136, 76 122, 80 114
           C 74 100, 68 84, 66 66
           C 72 76, 82 66, 88 52
           C 94 38, 96 22, 100 8 Z
           
           M 100 58
           C 95 72, 88 92, 86 114
           C 84 136, 86 156, 92 174
           C 96 186, 100 196, 100 206
           C 100 196, 104 186, 108 174
           C 114 156, 116 136, 114 114
           C 112 92, 105 72, 100 58 Z"
        fill={`url(#${gradientId})`}
        fillRule="evenodd"
      />

      {/* CENTRAL DAGGER BLADE (Upper Tip) */}
      <path
        d="M 100 22
           L 108 55
           L 92 55
           Z"
        fill={`url(#${gradientId}-blade)`}
      />

      {/* CENTRAL DAGGER BLADE (Main Lower Wedge) */}
      <path
        d="M 94 112
           L 106 112
           L 114 168
           L 86 168
           Z"
        fill={`url(#${gradientId}-blade)`}
      />

      {/* DAGGER CROSS-GUARD BAR */}
      <path
        d="M 80 168
           L 120 168
           L 124 180
           L 76 180
           Z"
        fill={`url(#${gradientId})`}
        stroke={colors.highlight}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* DAGGER HILT HANDLE */}
      <path
        d="M 94 180
           L 106 180
           L 106 208
           L 94 208
           Z"
        fill={`url(#${gradientId})`}
        stroke={colors.highlight}
        strokeWidth="1.5"
      />

      {/* HILT GRIP ACCENT RINGS */}
      <line x1="94" y1="189" x2="106" y2="189" stroke={colors.highlight} strokeWidth="1.5" />
      <line x1="94" y1="198" x2="106" y2="198" stroke={colors.highlight} strokeWidth="1.5" />

      {/* DAGGER POMMEL */}
      <path
        d="M 91 208
           C 91 208, 93 222, 100 222
           C 107 222, 109 208, 109 208
           Z"
        fill={`url(#${gradientId})`}
        stroke={colors.highlight}
        strokeWidth="1.5"
      />
    </svg>
  );
}
