import React, { useState } from 'react';
import { User, Mail, School, BookOpen, Edit2, LogOut, Users } from 'lucide-react';

interface TeacherPerfilProps {
  onLogout: () => void;
}

export function TeacherPerfil({ onLogout }: TeacherPerfilProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: 'Prof. Carlos Silva',
    email: 'carlos.silva@escola.com',
    instituicao: 'Escola Municipal Santos Dumont',
    disciplina: 'Matemática',
    turma: '7º Ano A',
    bio: 'Professor de Matemática há 10 anos, apaixonado por ensinar e transformar vidas através da educação.'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aqui implementaria a lógica de salvar
  };

  const handleLogout = () => {
    // Implementar logout
    onLogout();
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
            CS
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
                value={formData.disciplina}
                onChange={(e) => setFormData({ ...formData, disciplina: e.target.value })}
                className="w-full px-4 py-2 border border-[#E0E3E7] rounded-xl text-center text-[#9CA3AF]"
                placeholder="Disciplina"
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
              <p className="text-[#2D5BFF] mb-4">{formData.disciplina}</p>
              <p className="text-[#9CA3AF]">{formData.bio}</p>
            </>
          )}
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
            <BookOpen className="text-[#2D5BFF]" size={20} />
            <div className="flex-1">
              <small className="text-[#9CA3AF] block">Disciplina</small>
              <p className="text-[#1C1C1E]">{formData.disciplina}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F6F7F9] rounded-xl">
            <Users className="text-[#2D5BFF]" size={20} />
            <div className="flex-1">
              <small className="text-[#9CA3AF] block">Turma</small>
              <p className="text-[#1C1C1E]">{formData.turma}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botão de Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-50 text-red-600 py-4 rounded-2xl flex items-center justify-center gap-2 border border-red-200"
      >
        <LogOut size={20} />
        Sair da Conta
      </button>
    </div>
  );
}