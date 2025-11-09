import React, { useState } from 'react';
import { RankingList } from '../../EDU/RankingList';

const rankingAlunos = [
  { position: 1, name: 'Pedro Silva', points: 3850, isCurrentUser: false },
  { position: 2, name: 'Ana Costa', points: 3420, isCurrentUser: false },
  { position: 3, name: 'Lucas Oliveira', points: 3180, isCurrentUser: false },
  { position: 4, name: 'Juliana Santos', points: 2950, isCurrentUser: false },
  { position: 5, name: 'Rafael Ferreira', points: 2780, isCurrentUser: false },
  { position: 6, name: 'Camila Lima', points: 2650, isCurrentUser: false },
  { position: 7, name: 'Gabriel Souza', points: 2520, isCurrentUser: false },
  { position: 8, name: 'Beatriz Rocha', points: 2480, isCurrentUser: false },
  { position: 9, name: 'Felipe Alves', points: 2450, isCurrentUser: false },
  { position: 10, name: 'Isabela Martins', points: 2420, isCurrentUser: false },
  { position: 11, name: 'Thiago Barbosa', points: 2380, isCurrentUser: false },
  { position: 12, name: 'Marina Ribeiro', points: 2340, isCurrentUser: true }
];

const rankingTurmas = [
  { position: 1, name: 'Turma 8º A', points: 45280, isCurrentUser: false },
  { position: 2, name: 'Turma 9º B', points: 42150, isCurrentUser: false },
  { position: 3, name: 'Turma 7º C', points: 38920, isCurrentUser: true },
  { position: 4, name: 'Turma 8º B', points: 36540, isCurrentUser: false },
  { position: 5, name: 'Turma 9º A', points: 34210, isCurrentUser: false }
];

export function StudentRanking() {
  const [activeTab, setActiveTab] = useState<'alunos' | 'turmas'>('alunos');
  
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div>
        <h2 className="text-[#1C1C1E] mb-2">Ranking</h2>
        <p className="text-[#9CA3AF]">Veja sua posição e a dos seus colegas</p>
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
          Alunos
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