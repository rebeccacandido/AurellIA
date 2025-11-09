import React, { useState } from 'react';
import { RankingList } from '../../EDU/RankingList';

const rankingAlunos = [
  { position: 1, name: 'Pedro Silva', points: 3850, isCurrentUser: false },
  { position: 2, name: 'Ana Costa', points: 3420, isCurrentUser: false },
  { position: 3, name: 'Lucas Oliveira', points: 3180, isCurrentUser: false },
  { position: 4, name: 'Juliana Santos', points: 2950, isCurrentUser: false },
  { position: 5, name: 'Rafael Ferreira', points: 2780, isCurrentUser: false }
];

const rankingTurmas = [
  { position: 1, name: 'Turma 7º A', points: 38920, isCurrentUser: true }
];

export function TeacherRanking() {
  const [activeTab, setActiveTab] = useState<'alunos' | 'turmas'>('alunos');
  
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div>
        <h2 className="text-[#1C1C1E] mb-2">Ranking</h2>
        <p className="text-[#9CA3AF]">Desempenho dos alunos e turmas</p>
      </div>
      
      <div className="flex gap-2 bg-white rounded-2xl p-1 card-shadow">
        <button
          onClick={() => setActiveTab('alunos')}
          className={`flex-1 py-2 rounded-xl transition-all text-center ${
            activeTab === 'alunos'
              ? 'bg-[#2D5BFF] text-white'
              : 'text-[#9CA3AF] hover:text-[#1C1C1E]'
          }`}
        >
          Alunos da Turma
        </button>
        <button
          onClick={() => setActiveTab('turmas')}
          className={`flex-1 py-2 rounded-xl transition-all text-center ${
            activeTab === 'turmas'
              ? 'bg-[#2D5BFF] text-white'
              : 'text-[#9CA3AF] hover:text-[#1C1C1E]'
          }`}
        >
          Turmas
        </button>
      </div>
      
      {activeTab === 'alunos' ? (
        <RankingList items={rankingAlunos} />
      ) : (
        <RankingList items={rankingTurmas} />
      )}
    </div>
  );
}