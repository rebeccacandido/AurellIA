import React from 'react';
import { Coins, ChevronRight } from 'lucide-react';

interface AtividadeCardProps {
  title: string;
  description: string;
  progress?: number;
  coins: number;
  onClick?: () => void;
  disabled?: boolean;
}

export function AtividadeCard({ title, description, progress, coins, onClick, disabled }: AtividadeCardProps) {
  return (
    <div 
      onClick={disabled ? undefined : onClick}
      className={`bg-white rounded-3xl p-5 card-shadow transition-transform ${
        disabled 
          ? 'cursor-not-allowed opacity-50' 
          : 'cursor-pointer hover:scale-[1.02]'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="text-[#1C1C1E] mb-1">{title}</h4>
          <p className="text-[#9CA3AF]">{description}</p>
        </div>
        <ChevronRight size={20} className="text-[#9CA3AF] flex-shrink-0 ml-2" />
      </div>
      
      {progress !== undefined && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <small className="text-[#9CA3AF]">Progresso</small>
            <small className="text-[#2D5BFF]">{progress}%</small>
          </div>
          <div className="w-full h-2 bg-[#E0E3E7] rounded-full overflow-hidden">
            <div 
              className="h-full gradient-bg rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-1 text-[#F59E0B]">
        <Coins size={16} />
        <span>{coins} moedas</span>
      </div>
    </div>
  );
}
