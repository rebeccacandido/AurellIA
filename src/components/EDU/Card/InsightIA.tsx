import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../Button';

interface InsightIACardProps {
  title: string;
  insight: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function InsightIACard({ title, insight, actionLabel, onAction }: InsightIACardProps) {
  return (
    <div className="bg-gradient-to-br from-[#AEC6FF] to-[#2D5BFF] rounded-3xl p-5 card-shadow text-white">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={24} />
        <h4 className="text-white">{title}</h4>
      </div>
      
      <p className="mb-4 text-white/90">{insight}</p>
      
      {actionLabel && onAction && (
        <Button 
          variant="secondary" 
          onClick={onAction}
          className="bg-white text-[#2D5BFF] hover:bg-white/90"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
