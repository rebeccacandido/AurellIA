import React from 'react';
import { Star } from 'lucide-react';

interface LevelChipProps {
  level: number;
  title: string;
}

export function LevelChip({ level, title }: LevelChipProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#AEC6FF] to-[#2D5BFF] text-white px-4 py-2 rounded-lg">
      <Star size={16} fill="currentColor" />
      <span>Nível {level} – {title}</span>
    </div>
  );
}
