import React from 'react';
import { Check } from 'lucide-react';

interface ProgressCheckCircleProps {
  progress?: number; // 0 to 100
  isCompleted?: boolean;
  size?: number;
  className?: string;
}

export const ProgressCheckCircle: React.FC<ProgressCheckCircleProps> = ({
  progress = 0,
  isCompleted = false,
  size = 24,
  className = '',
}) => {
  // Homologated Progress Check Circle per User Feedback:
  // - All states (25%, 50%, 80%, Completed) strictly have the exact same bounding box (size, default 24px).
  // - Matches Lucide icon geometry and stroke weight.
  // - Track circle strokeWidth: 2px (#e2e8f0).
  // - Active progress arc strokeWidth: 2px (#0f172a).
  // - Check strokeWidth: 2.2px (#0f172a), centered with standard Lucide icon padding (size * 0.62).

  const strokeWidth = 2;
  const padding = 2; // Inset so stroke never clips outside the SVG viewBox
  const radius = (size - padding * 2 - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  if (isCompleted || progress >= 100) {
    return (
      <div
        className={`relative shrink-0 flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
          {/* Outer circle matching progress ring radius */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#0f172a"
            strokeWidth={strokeWidth}
            fill="none"
          />
        </svg>
        {/* Lucide Check centered inside */}
        <div className="absolute inset-0 flex items-center justify-center text-black pointer-events-none">
          <Check
            style={{ width: size * 0.58, height: size * 0.58 }}
            className="stroke-[2.5]"
          />
        </div>
      </div>
    );
  }

  // Active progress ring
  const safeProgress = Math.max(10, Math.min(progress, 95));
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 shrink-0"
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#0f172a"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
