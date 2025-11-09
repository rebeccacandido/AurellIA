import React from 'react';
import { Trophy, Medal } from 'lucide-react';

interface RankingItem {
  position: number;
  name: string;
  avatar?: string;
  points: number;
  isCurrentUser?: boolean;
}

interface RankingListProps {
  items: RankingItem[];
}

export function RankingList({ items }: RankingListProps) {
  const getMedalIcon = (position: number) => {
    if (position === 1) return <Trophy size={20} className="text-yellow-500" />;
    if (position === 2) return <Medal size={20} className="text-gray-400" />;
    if (position === 3) return <Medal size={20} className="text-amber-700" />;
    return null;
  };
  
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.position}
          className={`flex items-center gap-3 p-4 rounded-2xl ${
            item.isCurrentUser 
              ? 'bg-gradient-to-r from-[#AEC6FF] to-[#2D5BFF] text-white' 
              : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-center w-8 h-8">
            {getMedalIcon(item.position) || (
              <span className={item.isCurrentUser ? 'text-white' : 'text-[#9CA3AF]'}>
                #{item.position}
              </span>
            )}
          </div>
          
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#AEC6FF] to-[#2D5BFF] flex items-center justify-center text-white flex-shrink-0">
            {item.avatar ? (
              <img src={item.avatar} alt={item.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span>{item.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          
          <div className="flex-1">
            <h4 className={item.isCurrentUser ? 'text-white' : 'text-[#1C1C1E]'}>
              {item.name}
            </h4>
          </div>
          
          <div className={`${item.isCurrentUser ? 'text-white' : 'text-[#2D5BFF]'}`}>
            {item.points.toLocaleString('pt-BR')} pts
          </div>
        </div>
      ))}
    </div>
  );
}
