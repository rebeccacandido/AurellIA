import React from 'react';
import { MetricaCard } from '../../EDU/Card/Metrica';
import { Users, School, TrendingUp, BookOpen } from 'lucide-react';

export function ManagerIndicadores() {
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div>
        <h2 className="text-[#1C1C1E] mb-2">Indicadores Gerais</h2>
        <p className="text-[#9CA3AF]">Visão consolidada da instituição</p>
      </div>
      
      {/* Métricas Consolidadas */}
      <div className="grid grid-cols-2 gap-4">
        <MetricaCard
          title="Total de Alunos"
          value="1.248"
          icon={<Users size={24} />}
        />
        <MetricaCard
          title="Turmas"
          value="42"
          subtitle="ativas"
          icon={<School size={24} />}
        />
      </div>
      
      {/* Distribuição por Disciplina */}
      <div className="bg-white rounded-3xl p-5 card-shadow">
        <h3 className="text-[#1C1C1E] mb-4">Desempenho por Disciplina</h3>
        <div className="space-y-3">
          {[
            { disciplina: 'Matemática', media: 72, cor: 'bg-blue-500' },
            { disciplina: 'Português', media: 78, cor: 'bg-green-500' },
            { disciplina: 'Ciências', media: 75, cor: 'bg-purple-500' },
            { disciplina: 'História', media: 80, cor: 'bg-yellow-500' },
            { disciplina: 'Geografia', media: 70, cor: 'bg-red-500' }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-24 text-[#9CA3AF]">{item.disciplina}</div>
              <div className="flex-1 h-8 bg-[#E0E3E7] rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.cor} rounded-full flex items-center justify-end pr-3 text-white transition-all duration-300`}
                  style={{ width: `${item.media}%` }}
                >
                  <span className="text-xs">{item.media}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alunos em Destaque */}
      <div className="bg-white rounded-3xl p-5 card-shadow">
        <h3 className="text-[#1C1C1E] mb-4">Alunos em Destaque</h3>
        <div className="space-y-3">
          {[
            { nome: 'Marina Silva', serie: '8º Ano', pontos: 2450, posicao: 1 },
            { nome: 'Pedro Costa', serie: '9º Ano', pontos: 2380, posicao: 2 },
            { nome: 'Ana Oliveira', serie: '7º Ano', pontos: 2290, posicao: 3 }
          ].map((aluno, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                }`}>
                  {aluno.posicao}
                </div>
                <div>
                  <h4 className="text-[#1C1C1E]">{aluno.nome}</h4>
                  <small className="text-[#9CA3AF]">{aluno.serie}</small>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#2D5BFF]">{aluno.pontos}</p>
                <small className="text-[#9CA3AF]">moedas</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}