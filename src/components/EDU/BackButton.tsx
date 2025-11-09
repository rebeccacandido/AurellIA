import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export function BackButton({ onClick, label = 'Voltar' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-[#2D5BFF] hover:opacity-80 transition-opacity"
    >
      <ChevronLeft size={20} />
      <span>{label}</span>
    </button>
  );
}
