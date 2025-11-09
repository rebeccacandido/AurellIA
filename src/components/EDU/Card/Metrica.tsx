import React from 'react';

interface MetricaCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export function MetricaCard({ title, value, subtitle, icon, trend, trendValue }: MetricaCardProps) {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-[#9CA3AF]'
  };
  
  return (
    <div className="bg-white rounded-3xl p-5 card-shadow">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[#9CA3AF]">{title}</p>
        {icon && <div className="text-[#2D5BFF]">{icon}</div>}
      </div>
      <h2 className="text-[#1C1C1E] mb-1">{value}</h2>
      {(subtitle || trendValue) && (
        <div className="flex items-center gap-2">
          {subtitle && <small className="text-[#9CA3AF]">{subtitle}</small>}
          {trend && trendValue && (
            <small className={trendColors[trend]}>{trendValue}</small>
          )}
        </div>
      )}
    </div>
  );
}
