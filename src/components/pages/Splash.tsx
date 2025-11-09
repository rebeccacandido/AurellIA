import React, { useEffect } from 'react';
import logo from 'figma:asset/09f7ee12a8c5086d31827a15c309403f49a5355c.png';

interface SplashProps {
  onComplete: () => void;
}

export function Splash({ onComplete }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div className="mobile-container flex flex-col items-center justify-center bg-[#F6F7F9]">
      <img 
        src={logo} 
        alt="AurellIA" 
        className="w-64 mb-8 animate-fade-in"
      />
    </div>
  );
}