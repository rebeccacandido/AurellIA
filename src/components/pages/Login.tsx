import React, { useState } from 'react';
import { Button } from '../EDU/Button';
import { TextField } from '../EDU/TextField';
import { BackButton } from '../EDU/BackButton';
import { GraduationCap, Users, Briefcase } from 'lucide-react';
import logo from 'figma:asset/09f7ee12a8c5086d31827a15c309403f49a5355c.png';

interface LoginProps {
  onLoginSuccess: (role: 'student' | 'teacher' | 'manager') => void;
  onBack?: () => void;
}

export function Login({ onLoginSuccess, onBack }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'manager' | null>(null);
  
  const handleLogin = () => {
    if (email && password && selectedRole) {
      onLoginSuccess(selectedRole);
    }
  };
  
  const roles = [
    {
      id: 'student' as const,
      label: 'Aluno',
      icon: <GraduationCap size={28} />,
      description: 'Acesse suas jornadas e quizzes',
      gradient: 'from-[#2D5BFF] to-[#7B61FF]'
    },
    {
      id: 'teacher' as const,
      label: 'Professor',
      icon: <Users size={28} />,
      description: 'Gerencie suas turmas',
      gradient: 'from-[#7B61FF] to-[#FF6B9D]'
    },
    {
      id: 'manager' as const,
      label: 'Gestor',
      icon: <Briefcase size={28} />,
      description: 'Visualize relatórios e indicadores',
      gradient: 'from-[#FF6B9D] to-[#FFA500]'
    }
  ];
  
  return (
    <div className="mobile-container flex flex-col bg-[#F6F7F9] px-6">
      {onBack && (
        <div className="pt-8 pb-4">
          <BackButton onClick={onBack} />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-center py-8">
        <div className="mb-8 text-center">
          <img src={logo} alt="AurellIA" className="w-48 mx-auto mb-6" />
          <h2 className="text-[#1C1C1E] mb-2">Bem-vindo de volta!</h2>
          <p className="text-[#9CA3AF]">Entre com suas credenciais</p>
        </div>
        
        {/* Seleção de Papel */}
        <div className="mb-6">
          <label className="block mb-3 text-[#1C1C1E] text-center">
            Entrar como:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  selectedRole === role.id
                    ? 'border-[#2D5BFF] bg-[#2D5BFF]/5'
                    : 'border-[#E0E3E7] hover:border-[#AEC6FF]'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${role.gradient} rounded-xl flex items-center justify-center text-white mb-2`}>
                    {React.cloneElement(role.icon, { size: 22 })}
                  </div>
                  <small className={`block ${selectedRole === role.id ? 'text-[#2D5BFF]' : 'text-[#1C1C1E]'}`}>
                    {role.label}
                  </small>
                </div>
              </button>
            ))}
          </div>
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
          state={email && password && selectedRole ? 'default' : 'disabled'}
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