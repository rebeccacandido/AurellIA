import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export function PageHeader({ title, subtitle, onBack, rightElement }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-[#E0E3E7] px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F6F7F9] hover:bg-[#E0E3E7] transition-colors"
            >
              <ChevronLeft size={20} className="text-[#2D5BFF]" />
            </button>
          )}
          <div className="flex-1">
            <h3 className="text-[#1C1C1E]">{title}</h3>
            {subtitle && <p className="text-[#9CA3AF]">{subtitle}</p>}
          </div>
        </div>
        {rightElement && <div>{rightElement}</div>}
      </div>
    </div>
  );
}
