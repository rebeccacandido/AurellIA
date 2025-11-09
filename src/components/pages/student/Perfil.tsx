import React, { useState } from 'react';
import { User, Mail, School, BookOpen, Edit2, LogOut, Trophy, Coins, Award } from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';

interface StudentPerfilProps {
  onLogout: () => void;
}

export function StudentPerfil({ onLogout }: StudentPerfilProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: 'Ana Silva',
    email: 'ana.silva@escola.com',
    turma: '8º Ano A',
    serie: '8º Ano',
    bio: 'Adoro matemática e ciências! Meu objetivo é chegar ao nível 20.'
  });
  const { student } = useStudent();

  const stats = {
    moedas: student?.coins ?? 2450,
    nivel: 12,
    quizesCompletos: 58,
    badges: 18,
    acertosMedio: 82
  };

  // Calcula quizzes restantes para o próximo nível
  // A cada 5 quizzes = 1 nível
  const quizzesParaProximoNivel = 5;
  const quizzesNoNivelAtual = stats.quizesCompletos % quizzesParaProximoNivel;
  const quizzesRestantes = quizzesParaProximoNivel - quizzesNoNivelAtual;
  const progressoPercent = (quizzesNoNivelAtual / quizzesParaProximoNivel) * 100;

  const badges = [
    { id: 1, nome: 'Primeira Vitória', icon: '🏆', conquistada: true },
    { id: 2, nome: 'Expert em Matemática', icon: '🧮', conquistada: true },
    { id: 3, nome: 'Estudante Dedicado', icon: '📚', conquistada: true },
    { id: 4, nome: 'Mestre dos Quizzes', icon: '🎯', conquistada: false },
    { id: 5, nome: 'Solidário', icon: '❤️', conquistada: true },
    { id: 6, nome: 'Sequência de 7 dias', icon: '🔥', conquistada: true }
  ];

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
            AS
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
              <p className="text-[#9CA3AF] mb-2">{formData.email}</p>
              <p className="text-[#9CA3AF] mb-4">{formData.bio}</p>
            </>
          )}
        </div>

        {/* Nível e Experiência */}
        <div className="mt-6 p-4 bg-[#F6F7F9] rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="text-[#2D5BFF]" size={20} />
              <span className="text-[#1C1C1E]">Nível {stats.nivel}</span>
            </div>
            <span className="text-[#9CA3AF]">
              {quizzesRestantes} {quizzesRestantes === 1 ? 'quiz restante' : 'quizzes restantes'}
            </span>
          </div>
          <div className="w-full h-3 bg-[#E0E3E7] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#2D5BFF] to-[#AEC6FF] rounded-full transition-all"
              style={{ width: `${progressoPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Estatísticas de Gamificação */}
      <div className="bg-white rounded-3xl p-6 card-shadow">
        <h3 className="text-[#1C1C1E] mb-4">Estatísticas</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-[#F6F7F9] rounded-2xl">
            <Coins className="text-yellow-500 mx-auto mb-2" size={24} />
            <p className="text-[#1C1C1E] mb-1">{stats.moedas}</p>
            <small className="text-[#9CA3AF]">Moedas</small>
          </div>
          <div className="text-center p-3 bg-[#F6F7F9] rounded-2xl">
            <Trophy className="text-[#2D5BFF] mx-auto mb-2" size={24} />
            <p className="text-[#1C1C1E] mb-1">{stats.badges}</p>
            <small className="text-[#9CA3AF]">Badges</small>
          </div>
          <div className="text-center p-3 bg-[#F6F7F9] rounded-2xl">
            <BookOpen className="text-green-500 mx-auto mb-2" size={24} />
            <p className="text-[#1C1C1E] mb-1">{stats.quizesCompletos}</p>
            <small className="text-[#9CA3AF]">Quizzes</small>
          </div>
        </div>
        <div className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between">
            <span className="text-green-800">Média de Acertos</span>
            <span className="text-green-800">{stats.acertosMedio}%</span>
          </div>
        </div>
      </div>

      {/* Informações Acadêmicas */}
      <div className="bg-white rounded-3xl p-6 card-shadow">
        <h3 className="text-[#1C1C1E] mb-4">Informações Acadêmicas</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-[#F6F7F9] rounded-xl">
            <School className="text-[#2D5BFF]" size={20} />
            <div className="flex-1">
              <small className="text-[#9CA3AF] block">Turma</small>
              <p className="text-[#1C1C1E]">{formData.turma}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F6F7F9] rounded-xl">
            <BookOpen className="text-[#2D5BFF]" size={20} />
            <div className="flex-1">
              <small className="text-[#9CA3AF] block">Série</small>
              <p className="text-[#1C1C1E]">{formData.serie}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Conquistadas */}
      <div className="bg-white rounded-3xl p-6 card-shadow">
        <h3 className="text-[#1C1C1E] mb-4">Badges Conquistadas</h3>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`text-center p-3 rounded-2xl border-2 transition-all ${
                badge.conquistada
                  ? 'bg-[#F6F7F9] border-[#2D5BFF]'
                  : 'bg-gray-50 border-gray-200 opacity-40'
              }`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <small className={`block ${badge.conquistada ? 'text-[#1C1C1E]' : 'text-[#9CA3AF]'}`}>
                {badge.nome}
              </small>
            </div>
          ))}
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
