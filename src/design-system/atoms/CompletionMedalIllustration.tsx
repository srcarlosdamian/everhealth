import React from 'react';

interface CompletionMedalIllustrationProps {
  className?: string;
  size?: number;
}

export const CompletionMedalIllustration: React.FC<CompletionMedalIllustrationProps> = ({
  className = '',
  size = 180,
}) => {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size * 0.95}
        viewBox="0 0 200 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Podium / Pedestal Base (Pink sketch outline) */}
        <path
          d="M30 140 H75 V110 H125 V140 H170 V165 H30 Z"
          stroke="#f472b6"
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="#fff5f9"
        />
        <path
          d="M75 110 H125 V165 H75 Z"
          stroke="#f472b6"
          strokeWidth="2.5"
          fill="#ffffff"
        />
        {/* Support lines beneath circle */}
        <line x1="88" y1="90" x2="100" y2="108" stroke="#334155" strokeWidth="2.5" />
        <line x1="112" y1="90" x2="100" y2="108" stroke="#334155" strokeWidth="2.5" />
        <line x1="72" y1="96" x2="80" y2="110" stroke="#f472b6" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="128" y1="96" x2="120" y2="110" stroke="#f472b6" strokeWidth="2" strokeDasharray="3 3" />

        {/* Circular Target / Medal Outer Ring */}
        <circle
          cx="100"
          cy="70"
          r="48"
          stroke="#334155"
          strokeWidth="3.5"
          fill="#ffffff"
        />
        <circle
          cx="100"
          cy="70"
          r="41"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          fill="#fafafa"
        />

        {/* Vibrant Pink Checkmark */}
        <path
          d="M84 70 L95 82 L118 56"
          stroke="#ec4899"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
