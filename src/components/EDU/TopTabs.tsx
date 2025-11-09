import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TopTabsProps {
  tabs: Tab[];
  active: string;
  onSelect: (id: string) => void;
}

export function TopTabs({ tabs, active, onSelect }: TopTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
            active === tab.id
              ? 'bg-[#2D5BFF] text-white'
              : 'bg-white text-[#9CA3AF] hover:bg-[#F6F7F9]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
