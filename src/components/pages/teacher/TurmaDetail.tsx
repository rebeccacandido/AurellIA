import React, { useState } from 'react';
import { PageHeader } from '../../EDU/PageHeader';
import { Button } from '../../EDU/Button';
import { Users, TrendingUp, AlertTriangle, Trophy, BookOpen, BarChart3 } from 'lucide-react';

interface TurmaDetailProps {
  onBack: () => void;
}

export function TurmaDetail({ onBack }: TurmaDetailProps) {
  const [selectedView, setSelectedView] = useState<'overview' | 'students'>('overview');

  const alunos = [
    { nome: 'Ana Silva', progresso: 92, engajamento: 95, status: 'excellent' },
    { nome: 'Bruno Costa', progresso: 88, engajamento: 85, status: 'good' },
    { nome: 'Carla Souza', progresso: 75, engajamento: 78, status: 'good' },
    { nome: 'Daniel Lima', progresso: 45, engajamento: 42, status: 'attention' },
    { nome: 'Eduarda Nunes', progresso: 82, engajamento: 88, status: 'good' }
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <PageHeader 
        title="7º Ano A"
        subtitle="30 alunos • Matemática"
        onBack={onBack}
        rightElement={
          <button className="p-2 hover:bg-[#F6F7F9] rounded-lg transition-colors">
            <BarChart3 size={20} className="text-[#2D5BFF]" />
          </button>
        }
      />
      
      <div className="px-6 pt-6 pb-20 space-y-6">
        {/* Toggle de Visualização */}
        <div className="bg-white rounded-2xl p-1 flex card-shadow">
          <button
            onClick={() => setSelectedView('overview')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              selectedView === 'overview'
                ? 'bg-[#2D5BFF] text-white'
                : 'text-[#9CA3AF]'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setSelectedView('students')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              selectedView === 'students'
                ? 'bg-[#2D5BFF] text-white'
                : 'text-[#9CA3AF]'
            }`}
          >
            Alunos
          </button>
        </div>

        {selectedView === 'overview' ? (
          <>
            {/* Métricas Principais */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 card-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={18} className="text-green-500" />
                  <small className="text-[#9CA3AF]">Progresso</small>
                </div>
                <h2 className="text-[#1C1C1E]">72%</h2>
                <small className="text-green-600">+5% vs mês anterior</small>
              </div>
              
              <div className="bg-white rounded-2xl p-4 card-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy size={18} className="text-[#2D5BFF]" />
                  <small className="text-[#9CA3AF]">Engajamento</small>
                </div>
                <h2 className="text-[#1C1C1E]">78%</h2>
                <small className="text-[#2D5BFF]">Acima da média</small>
              </div>
            </div>

            {/* Alunos que Precisam de Atenção */}
            <div className="bg-white rounded-3xl p-5 card-shadow">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} className="text-orange-500" />
                <h3 className="text-[#1C1C1E]">Precisam de Atenção</h3>
              </div>
              <div className="space-y-3">
                {alunos
                  .filter(aluno => aluno.status === 'attention')
                  .map((aluno, index) => (
                    <div key={index} className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#1C1C1E]">{aluno.nome}</span>
                        <span className="text-orange-600">{aluno.progresso}%</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-orange-200 text-orange-800 rounded-lg text-xs">
                          Baixo engajamento
                        </span>
                        <span className="px-2 py-1 bg-orange-200 text-orange-800 rounded-lg text-xs">
                          Queda de desempenho
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Desempenho por Conteúdo */}
            <div className="bg-white rounded-3xl p-5 card-shadow">
              <h3 className="text-[#1C1C1E] mb-4">Desempenho por Conteúdo</h3>
              <div className="space-y-4">
                {[
                  { conteudo: 'Equações', progresso: 85, cor: 'bg-green-500' },
                  { conteudo: 'Geometria', progresso: 72, cor: 'bg-blue-500' },
                  { conteudo: 'Frações', progresso: 58, cor: 'bg-orange-500' }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#1C1C1E]">{item.conteudo}</span>
                      <span>{item.progresso}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#E0E3E7] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.cor} transition-all duration-500`}
                        style={{ width: `${item.progresso}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metodologia Atual */}
            <div className="bg-gradient-to-br from-[#AEC6FF]/20 to-[#2D5BFF]/10 rounded-3xl p-5 border border-[#2D5BFF]/20">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={20} className="text-[#2D5BFF]" />
                <h3 className="text-[#1C1C1E]">Metodologia Ativa</h3>
              </div>
              <p className="text-[#1C1C1E] mb-3">
                Gamificação com Sala de Aula Invertida
              </p>
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp size={16} />
                <small>Impacto: +8% no último mês</small>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Lista de Alunos */}
            <div className="space-y-3">
              {alunos.map((aluno, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-4 card-shadow ${
                    aluno.status === 'attention' ? 'border-2 border-orange-200' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        aluno.status === 'excellent' ? 'bg-green-100' :
                        aluno.status === 'good' ? 'bg-blue-100' : 'bg-orange-100'
                      }`}>
                        <span className="text-xl">
                          {aluno.status === 'excellent' ? '🌟' :
                           aluno.status === 'good' ? '👍' : '⚠️'}
                        </span>
                      </div>
                      <span className="text-[#1C1C1E]">{aluno.nome}</span>
                    </div>
                    <button className="text-[#2D5BFF]">
                      Ver perfil
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <small className="text-[#9CA3AF]">Progresso</small>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-[#E0E3E7] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              aluno.status === 'attention' ? 'bg-orange-500' : 'bg-[#2D5BFF]'
                            }`}
                            style={{ width: `${aluno.progresso}%` }}
                          />
                        </div>
                        <span className="text-xs">{aluno.progresso}%</span>
                      </div>
                    </div>
                    <div>
                      <small className="text-[#9CA3AF]">Engajamento</small>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-[#E0E3E7] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              aluno.status === 'attention' ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${aluno.engajamento}%` }}
                          />
                        </div>
                        <span className="text-xs">{aluno.engajamento}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Ações */}
        <div className="space-y-3">
          <Button variant="primary" fullWidth>
            <BookOpen size={18} />
            Aplicar Nova Metodologia
          </Button>
          <Button variant="secondary" fullWidth>
            Exportar Relatório da Turma
          </Button>
        </div>
      </div>
    </div>
  );
}
