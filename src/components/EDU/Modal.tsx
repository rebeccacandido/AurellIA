import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
  }[];
}

export function Modal({ isOpen, onClose, title, children, actions }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] overflow-hidden card-shadow">
        <div className="flex items-center justify-between p-5 border-b border-[#E0E3E7]">
          <h3 className="text-[#1C1C1E]">{title}</h3>
          <button 
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#1C1C1E]"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-5 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
        
        {actions && actions.length > 0 && (
          <div className="flex gap-3 p-5 border-t border-[#E0E3E7]">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'primary'}
                onClick={action.onClick}
                fullWidth
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
