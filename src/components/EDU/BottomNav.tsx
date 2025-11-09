import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomNavProps {
  items: NavItem[];
  active: string;
  onSelect: (id: string) => void;
}

export function BottomNav({ items, active, onSelect }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E3E7] px-4 py-2 safe-area-bottom">
      <div className="max-w-[390px] mx-auto flex justify-around items-center">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              active === item.id 
                ? 'text-[#2D5BFF]' 
                : 'text-[#9CA3AF] hover:text-[#1C1C1E]'
            }`}
          >
            <div className={active === item.id ? 'scale-110' : ''}>
              {item.icon}
            </div>
            <small className={active === item.id ? '' : ''}>{item.label}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
