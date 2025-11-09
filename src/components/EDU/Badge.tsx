import React from 'react';

interface BadgeProps {
  title: string;
  icon?: string;
  unlocked?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function Badge({ title, icon = '🏆', unlocked = true, size = 'medium' }: BadgeProps) {
  const sizes = {
    small: 'w-16 h-16 text-2xl',
    medium: 'w-20 h-20 text-3xl',
    large: 'w-24 h-24 text-4xl'
  };
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`${sizes[size]} rounded-2xl flex items-center justify-center ${
          unlocked 
            ? 'bg-gradient-to-br from-[#AEC6FF] to-[#2D5BFF] card-shadow' 
            : 'bg-[#E0E3E7] opacity-50'
        }`}
      >
        <span className={unlocked ? '' : 'grayscale'}>{icon}</span>
      </div>
      <small className={`text-center ${unlocked ? 'text-[#1C1C1E]' : 'text-[#9CA3AF]'}`}>
        {title}
      </small>
    </div>
  );
}
