import React, { useState } from 'react';
import { Button } from '../EDU/Button';
import { TextField } from '../EDU/TextField';
import { BackButton } from '../EDU/BackButton';
import logo from 'figma:asset/09f7ee12a8c5086d31827a15c309403f49a5355c.png';

interface LoginProps {
  onLoginSuccess: () => void;
  onBack?: () => void;
}

export function Login({ onLoginSuccess, onBack }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    if (email && password) {
      onLoginSuccess();
    }
  };
  
  return (
    <div className="mobile-container flex flex-col bg-[#F6F7F9] px-6">
      {onBack && (
        <div className="pt-8 pb-4">
          <BackButton onClick={onBack} />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-12 text-center">
          <img src={logo} alt="AurellIA" className="w-48 mx-auto mb-6" />
          <h2 className="text-[#1C1C1E] mb-2">Bem-vindo de volta!</h2>
        </div>
        
        <div className="space-y-4 mb-6">
          <TextField
            type="email"
            label="E-mail"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChange={setEmail}
          />
          
          <TextField
            type="password"
            label="Senha"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
          />
        </div>
        
        <button className="text-[#2D5BFF] text-right mb-6 hover:underline">
          Esqueci minha senha
        </button>
        
        <Button 
          variant="primary" 
          fullWidth 
          onClick={handleLogin}
          state={email && password ? 'default' : 'disabled'}
        >
          Entrar
        </Button>
        
        <p className="text-[#9CA3AF] text-center mt-6">
          Não tem uma conta?{' '}
          <button className="text-[#2D5BFF] hover:underline">
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}