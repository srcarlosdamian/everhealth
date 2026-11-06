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
  size = 22,
  className = '',
}) => {
  if (isCompleted || progress >= 100) {
    return (
      <div
        className={`rounded-full border border-black flex items-center justify-center text-black shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <Check className="stroke-[3]" style={{ width: size * 0.58, height: size * 0.58 }} />
      </div>
    );
  }

  // Circular progress ring matching exact Figma design
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeProgress = Math.max(15, Math.min(progress, 95));
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
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
