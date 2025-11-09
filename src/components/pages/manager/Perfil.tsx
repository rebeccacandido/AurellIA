import React, { useState } from 'react';
import { User, Mail, School, Briefcase, Edit2, LogOut, Users, BarChart3 } from 'lucide-react';

interface ManagerPerfilProps {
  onLogout: () => void;
}

export function ManagerPerfil({ onLogout }: ManagerPerfilProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@escola.com',
    instituicao: 'Escola Municipal Santos Dumont',
    cargo: 'Coordenadora Pedagógica',
    departamento: 'Ensino Fundamental II',
    bio: 'Gestora educacional com 15 anos de experiência, focada em inovação pedagógica e inclusão.'
  });

  const stats = {
    professores: 28,
    alunos: 1248,
    turmas: 42
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aqui implementaria a lógica de salvar
  };

  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1C1C1E] mb-1">Meu Perfil</h2>
          <p className="text-[#9CA3AF]">Gerencie suas informações</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-10 h-10 rounded-full bg-[#2D5BFF] flex items-center justify-center"
        >
          <Edit2 size={20} className="text-white" />
        </button>
      </div>

      {/* Avatar e Info Principal */}
      <div className="bg-white rounded-3xl p-6 card-shadow">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#AEC6FF] to-[#2D5BFF] flex items-center justify-center text-white text-3xl mb-4">
            MO
          </div>
          
          {isEditing ? (
            <div className="w-full space-y-3">
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-2 border border-[#E0E3E7] rounded-xl text-center"
                placeholder="Nome"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-[#E0E3E7] rounded-xl text-center text-[#9CA3AF]"
                placeholder="Email"
              />
              <input
                type="text"
                value={formData.instituicao}
                onChange={(e) => setFormData({ ...formData, instituicao: e.target.value })}
                className="w-full px-4 py-2 border border-[#E0E3E7] rounded-xl text-center text-[#9CA3AF]"
                placeholder="Instituição"
              />
              <input
                type="text"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                className="w-full px-4 py-2 border border-[#E0E3E7] rounded-xl text-center text-[#9CA3AF]"
                placeholder="Cargo"
              />
              <input
                type="text"
                value={formData.departamento}
                onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                className="w-full px-4 py-2 border border-[#E0E3E7] rounded-xl text-center text-[#9CA3AF]"
                placeholder="Departamento"
              />
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-2 border border-[#E0E3E7] rounded-xl text-center text-[#9CA3AF]"
                rows={3}
                placeholder="Bio"
              />
              <button
                onClick={handleSave}
                className="w-full bg-[#2D5BFF] text-white py-3 rounded-xl"
              >
                Salvar Alterações
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-[#1C1C1E] mb-1">{formData.nome}</h2>
              <p className="text-[#9CA3AF] mb-1">{formData.email}</p>
              <p className="text-[#2D5BFF] mb-4">{formData.cargo}</p>
              <p className="text-[#9CA3AF]">{formData.bio}</p>
            </>
          )}
        </div>
      </div>

      {/* Visão Geral da Instituição */}
      <div className="bg-white rounded-3xl p-6 card-shadow">
        <h3 className="text-[#1C1C1E] mb-4">Visão Geral</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-[#F6F7F9] rounded-2xl">
            <Users className="text-[#2D5BFF] mx-auto mb-2" size={24} />
            <p className="text-[#1C1C1E] mb-1">{stats.alunos}</p>
            <small className="text-[#9CA3AF]">Alunos</small>
          </div>
          <div className="text-center p-3 bg-[#F6F7F9] rounded-2xl">
            <User className="text-green-500 mx-auto mb-2" size={24} />
            <p className="text-[#1C1C1E] mb-1">{stats.professores}</p>
            <small className="text-[#9CA3AF]">Professores</small>
          </div>
          <div className="text-center p-3 bg-[#F6F7F9] rounded-2xl">
            <School className="text-purple-500 mx-auto mb-2" size={24} />
            <p className="text-[#1C1C1E] mb-1">{stats.turmas}</p>
            <small className="text-[#9CA3AF]">Turmas</small>
          </div>
        </div>
      </div>

      {/* Informações Profissionais */}
      <div className="bg-white rounded-3xl p-6 card-shadow">
        <h3 className="text-[#1C1C1E] mb-4">Informações Profissionais</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-[#F6F7F9] rounded-xl">
            <School className="text-[#2D5BFF]" size={20} />
            <div className="flex-1">
              <small className="text-[#9CA3AF] block">Instituição</small>
              <p className="text-[#1C1C1E]">{formData.instituicao}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F6F7F9] rounded-xl">
            <Briefcase className="text-[#2D5BFF]" size={20} />
            <div className="flex-1">
              <small className="text-[#9CA3AF] block">Cargo</small>
              <p className="text-[#1C1C1E]">{formData.cargo}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F6F7F9] rounded-xl">
            <BarChart3 className="text-[#2D5BFF]" size={20} />
            <div className="flex-1">
              <small className="text-[#9CA3AF] block">Departamento</small>
              <p className="text-[#1C1C1E]">{formData.departamento}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botão de Logout */}
      <button
        onClick={onLogout}
        className="w-full bg-red-50 text-red-600 py-4 rounded-2xl flex items-center justify-center gap-2 border border-red-200"
      >
        <LogOut size={20} />
        Sair da Conta
      </button>
    </div>
  );
}