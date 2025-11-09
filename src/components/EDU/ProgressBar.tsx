import React from 'react';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  height?: 'small' | 'medium' | 'large';
}

export function ProgressBar({ progress, showLabel = true, height = 'medium' }: ProgressBarProps) {
  const heights = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3'
  };
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <small className="text-[#9CA3AF]">Progresso</small>
          <small className="text-[#2D5BFF]">{progress}%</small>
        </div>
      )}
      <div className={`w-full ${heights[height]} bg-[#E0E3E7] rounded-full overflow-hidden`}>
        <div 
          className="h-full gradient-bg rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
