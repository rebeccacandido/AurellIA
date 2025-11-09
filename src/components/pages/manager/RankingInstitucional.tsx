import React, { useState } from 'react';
import { RankingList } from '../../EDU/RankingList';

const topAlunos = [
  { position: 1, name: 'Pedro Silva - 8º A', points: 3850, isCurrentUser: false },
  { position: 2, name: 'Ana Costa - 9º B', points: 3420, isCurrentUser: false },
  { position: 3, name: 'Lucas Oliveira - 7º C', points: 3180, isCurrentUser: false },
  { position: 4, name: 'Juliana Santos - 8º B', points: 2950, isCurrentUser: false },
  { position: 5, name: 'Rafael Ferreira - 9º A', points: 2780, isCurrentUser: false },
  { position: 6, name: 'Camila Lima - 7º A', points: 2650, isCurrentUser: false },
  { position: 7, name: 'Gabriel Souza - 8º C', points: 2520, isCurrentUser: false },
  { position: 8, name: 'Beatriz Rocha - 9º C', points: 2480, isCurrentUser: false },
  { position: 9, name: 'Felipe Alves - 7º B', points: 2450, isCurrentUser: false },
  { position: 10, name: 'Isabela Martins - 8º A', points: 2420, isCurrentUser: false }
];

const topTurmas = [
  { position: 1, name: 'Turma 8º A - Unidade Centro', points: 45280, isCurrentUser: false },
  { position: 2, name: 'Turma 9º B - Unidade Norte', points: 42150, isCurrentUser: false },
  { position: 3, name: 'Turma 7º C - Unidade Centro', points: 38920, isCurrentUser: false },
  { position: 4, name: 'Turma 8º B - Unidade Sul', points: 36540, isCurrentUser: false },
  { position: 5, name: 'Turma 9º A - Unidade Centro', points: 34210, isCurrentUser: false }
];

export function ManagerRankingInstitucional() {
  const [activeTab, setActiveTab] = useState<'alunos' | 'turmas'>('turmas');
  const [filtroSerie, setFiltroSerie] = useState('todas');
  
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div>
        <h2 className="text-[#1C1C1E] mb-2">Ranking Institucional</h2>
        <p className="text-[#9CA3AF]">Melhores resultados da instituição</p>
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
          Top Alunos
        </button>
        <button
          onClick={() => setActiveTab('turmas')}
          className={`flex-1 py-2 rounded-xl transition-all text-center ${
            activeTab === 'turmas'
              ? 'bg-[#2D5BFF] text-white'
              : 'text-[#9CA3AF] hover:text-[#1C1C1E]'
          }`}
        >
          Top Turmas
        </button>
      </div>
      
      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['Todas', '6º Ano', '7º Ano', '8º Ano', '9º Ano'].map((serie) => (
          <button
            key={serie}
            onClick={() => setFiltroSerie(serie.toLowerCase())}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              filtroSerie === serie.toLowerCase()
                ? 'bg-[#2D5BFF] text-white'
                : 'bg-white text-[#9CA3AF] hover:bg-[#F6F7F9]'
            }`}
          >
            {serie}
          </button>
        ))}
      </div>
      
      {activeTab === 'alunos' ? (
        <RankingList items={topAlunos} />
      ) : (
        <RankingList items={topTurmas} />
      )}
    </div>
  );
}