import React, { useState } from 'react';
import { Button } from '../EDU/Button';
import { Trophy, BarChart3, FileText } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Trophy,
    title: 'Aprenda Jogando',
    description: 'Ganhe moedas, desbloqueie conquistas e suba de nível enquanto estuda. Aprender nunca foi tão divertido!'
  },
  {
    icon: BarChart3,
    title: 'Painéis Inteligentes',
    description: 'Acompanhe seu progresso em tempo real com gráficos e métricas personalizadas para cada disciplina.'
  },
  {
    icon: FileText,
    title: 'Relatórios com IA',
    description: 'Receba insights personalizados e recomendações de metodologias baseadas em inteligência artificial.'
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };
  
  const slide = slides[currentSlide];
  const Icon = slide.icon;
  
  return (
    <div className="mobile-container flex flex-col bg-[#F6F7F9] px-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full gradient-bg flex items-center justify-center mb-8 card-shadow">
          <Icon size={64} className="text-white" />
        </div>
        
        <h2 className="text-[#1C1C1E] mb-4 text-center">{slide.title}</h2>
        <p className="text-[#9CA3AF] text-center mb-8 max-w-sm">
          {slide.description}
        </p>
        
        <div className="flex gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-[#2D5BFF] w-6' 
                  : 'bg-[#E0E3E7]'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="pb-8 space-y-3">
        <Button variant="primary" fullWidth onClick={handleNext}>
          {currentSlide < slides.length - 1 ? 'Próximo' : 'Começar'}
        </Button>
        {currentSlide < slides.length - 1 && (
          <Button variant="ghost" fullWidth onClick={onComplete}>
            Pular
          </Button>
        )}
      </div>
    </div>
  );
}
