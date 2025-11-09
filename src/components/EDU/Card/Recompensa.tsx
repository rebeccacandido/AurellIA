import React from 'react';
import { Coins } from 'lucide-react';

interface RecompensaCardProps {
  title: string;
  description: string;
  price: number;
  image?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function RecompensaCard({ title, description, price, image, icon, onClick }: RecompensaCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden card-shadow cursor-pointer hover:scale-[1.02] transition-transform"
    >
      {image ? (
        <div className="h-40 bg-gradient-to-br from-[#AEC6FF] to-[#2D5BFF] flex items-center justify-center">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-br from-[#AEC6FF] to-[#2D5BFF] flex items-center justify-center text-white">
          {icon || <div className="text-6xl">🎁</div>}
        </div>
      )}
      
      <div className="p-4">
        <h4 className="text-[#1C1C1E] mb-2">{title}</h4>
        <p className="text-[#9CA3AF] mb-4">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#F59E0B]">
            <Coins size={18} />
            <span>{price}</span>
          </div>
          <button className="text-[#2D5BFF] hover:underline">
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
