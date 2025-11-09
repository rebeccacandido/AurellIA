import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  state?: 'default' | 'pressed' | 'disabled';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'primary', 
  state = 'default',
  children, 
  onClick,
  className = '',
  fullWidth = false
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2";
  
  const variantStyles = {
    primary: {
      default: "bg-[#2D5BFF] text-white hover:bg-[#2347CC]",
      pressed: "bg-[#2347CC] text-white",
      disabled: "bg-[#E0E3E7] text-[#9CA3AF] cursor-not-allowed"
    },
    secondary: {
      default: "bg-white border-2 border-[#2D5BFF] text-[#2D5BFF] hover:bg-[#F6F7F9]",
      pressed: "bg-[#F6F7F9] border-2 border-[#2D5BFF] text-[#2D5BFF]",
      disabled: "bg-white border-2 border-[#E0E3E7] text-[#9CA3AF] cursor-not-allowed"
    },
    ghost: {
      default: "bg-transparent text-[#2D5BFF] hover:bg-[#AEC6FF]/20",
      pressed: "bg-[#AEC6FF]/30 text-[#2D5BFF]",
      disabled: "bg-transparent text-[#9CA3AF] cursor-not-allowed"
    }
  };
  
  const styles = variantStyles[variant][state];
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button
      onClick={state !== 'disabled' ? onClick : undefined}
      disabled={state === 'disabled'}
      className={`${baseStyles} ${styles} ${widthStyle} ${className}`}
    >
      {children}
    </button>
  );
}
