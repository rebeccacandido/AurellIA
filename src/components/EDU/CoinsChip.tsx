import React from 'react';
import { Coins } from 'lucide-react';

interface CoinsChipProps {
  amount: number;
  size?: 'small' | 'medium' | 'large';
}

export function CoinsChip({ amount, size = 'medium' }: CoinsChipProps) {
  const sizes = {
    small: 'px-2 py-1 gap-1',
    medium: 'px-3 py-2 gap-2',
    large: 'px-4 py-2 gap-2'
  };
  
  const iconSizes = {
    small: 14,
    medium: 18,
    large: 22
  };
  
  return (
    <div className={`inline-flex items-center ${sizes[size]} bg-[#FEF3C7] text-[#F59E0B] rounded-lg`}>
      <Coins size={iconSizes[size]} />
      <span>{amount.toLocaleString('pt-BR')}</span>
    </div>
  );
}
