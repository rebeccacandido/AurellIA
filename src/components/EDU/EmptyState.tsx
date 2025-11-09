import React from 'react';
import logo from 'figma:asset/09f7ee12a8c5086d31827a15c309403f49a5355c.png';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      <img src={logo} alt="AurellIA" className="w-32 h-32 mb-6 opacity-40" />
      <h3 className="text-[#1C1C1E] mb-2">{title}</h3>
      <p className="text-[#9CA3AF] mb-6">{description}</p>
      {action && (
        <button 
          onClick={action.onClick}
          className="text-[#2D5BFF] hover:underline"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}