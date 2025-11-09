import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface TextFieldProps {
  type?: 'email' | 'password' | 'text';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
}

export function TextField({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  label,
  error
}: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  const Icon = type === 'email' ? Mail : type === 'password' ? Lock : null;
  
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-[#1C1C1E]">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
            <Icon size={20} />
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 ${Icon ? 'pl-12' : ''} ${type === 'password' ? 'pr-12' : ''} py-3 rounded-xl border-2 ${
            error ? 'border-red-500' : 'border-[#E0E3E7]'
          } focus:border-[#2D5BFF] focus:outline-none bg-white transition-colors`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1C1C1E]"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-red-500">{error}</span>
      )}
    </div>
  );
}
