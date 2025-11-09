import React from 'react';
import { GraduationCap, Users, Building2 } from 'lucide-react';
import { BackButton } from '../EDU/BackButton';
import logo from 'figma:asset/09f7ee12a8c5086d31827a15c309403f49a5355c.png';

interface RoleSelectionProps {
  onSelectRole: (role: 'student' | 'teacher' | 'manager') => void;
  onBack?: () => void;
}

export function RoleSelection({ onSelectRole, onBack }: RoleSelectionProps) {
  const roles = [
    {
      id: 'student' as const,
      title: 'Aluno',
      description: 'Aprenda de forma divertida e gamificada',
      icon: GraduationCap,
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      id: 'teacher' as const,
      title: 'Professor',
      description: 'Acompanhe o desempenho da sua turma',
      icon: Users,
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      id: 'manager' as const,
      title: 'Gestor',
      description: 'Visão estratégica de toda a escola',
      icon: Building2,
      gradient: 'from-green-400 to-green-600'
    }
  ];
  
  return (
    <div className="mobile-container flex flex-col bg-[#F6F7F9] px-6 py-8">
      {onBack && (
        <div className="mb-4">
          <BackButton onClick={onBack} label="Sair" />
        </div>
      )}
      <div className="text-center mb-8">
        <img src={logo} alt="AurellIA" className="w-40 mx-auto mb-6" />
        <h2 className="text-[#1C1C1E] mb-2">Selecione seu Perfil</h2>
      </div>
      
      <div className="space-y-4 flex-1">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className="w-full bg-white rounded-3xl p-6 card-shadow hover:scale-[1.02] transition-transform text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center`}>
                  <Icon size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#1C1C1E] mb-1">{role.title}</h3>
                  <p className="text-[#9CA3AF]">{role.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-[#AEC6FF]/20 rounded-2xl">
        <p className="text-[#2D5BFF] text-center">
          💡 Você pode alternar entre perfis a qualquer momento
        </p>
      </div>
    </div>
  );
}