import React, { useState } from 'react';
import { PageHeader } from '../../EDU/PageHeader';
import { Button } from '../../EDU/Button';
import { CoinsChip } from '../../EDU/CoinsChip';
import { ProgressBar } from '../../EDU/ProgressBar';
import { Clock, Target, BookOpen, CheckCircle, Star } from 'lucide-react';

interface AtividadeDetailProps {
  onBack: () => void;
}

export function AtividadeDetail({ onBack }: AtividadeDetailProps) {
  const [completed, setCompleted] = useState(false);
  
  const questoes = [
    {
      id: 1,
      pergunta: 'Qual é o resultado de 2x + 5 = 15?',
      status: 'completed' as const
    },
    {
      id: 2,
      pergunta: 'Resolva a equação 3x - 7 = 8',
      status: 'completed' as const
    },
    {
      id: 3,
      pergunta: 'Encontre o valor de x em 5x + 2 = 17',
      status: 'current' as const
    },
    {
      id: 4,
      pergunta: 'Calcule x na equação 4x - 3 = 13',
      status: 'pending' as const
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <PageHeader 
        title="Equações de 1º Grau"
        subtitle="Matemática"
        onBack={onBack}
        rightElement={
          <CoinsChip amount={180} />
        }
      />
      
      <div className="px-6 pt-6 pb-20 space-y-6">
        {/* Progresso */}
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1C1C1E]">Seu Progresso</h3>
            <span className="text-[#2D5BFF]">50%</span>
          </div>
          <ProgressBar progress={50} />
          <p className="text-[#9CA3AF] mt-3">2 de 4 questões concluídas</p>
        </div>

        {/* Informações */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 card-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-[#2D5BFF]" />
              <small className="text-[#9CA3AF]">Tempo</small>
            </div>
            <p className="text-[#1C1C1E]">25 min</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 card-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Target size={18} className="text-[#2D5BFF]" />
              <small className="text-[#9CA3AF]">Nível</small>
            </div>
            <p className="text-[#1C1C1E]">Médio</p>
          </div>
        </div>

        {/* Objetivos */}
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={20} className="text-[#2D5BFF]" />
            <h3 className="text-[#1C1C1E]">Objetivos de Aprendizagem</h3>
          </div>
          <ul className="space-y-3">
            {[
              'Resolver equações de primeiro grau',
              'Aplicar propriedades matemáticas',
              'Verificar soluções encontradas'
            ].map((objetivo, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2D5BFF]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={14} className="text-[#2D5BFF]" />
                </div>
                <span className="text-[#1C1C1E]">{objetivo}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lista de Questões */}
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <h3 className="text-[#1C1C1E] mb-4">Questões</h3>
          <div className="space-y-3">
            {questoes.map((questao) => (
              <div
                key={questao.id}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  questao.status === 'completed'
                    ? 'border-green-200 bg-green-50'
                    : questao.status === 'current'
                    ? 'border-[#2D5BFF] bg-[#2D5BFF]/5'
                    : 'border-[#E0E3E7] bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      questao.status === 'completed'
                        ? 'bg-green-500'
                        : questao.status === 'current'
                        ? 'bg-[#2D5BFF]'
                        : 'bg-[#E0E3E7]'
                    }`}
                  >
                    {questao.status === 'completed' ? (
                      <CheckCircle size={18} className="text-white" />
                    ) : (
                      <span className="text-white">{questao.id}</span>
                    )}
                  </div>
                  <p className={`flex-1 ${
                    questao.status === 'pending' ? 'text-[#9CA3AF]' : 'text-[#1C1C1E]'
                  }`}>
                    {questao.pergunta}
                  </p>
                  {questao.status === 'completed' && (
                    <Star size={18} className="text-yellow-500 fill-yellow-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recompensa */}
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-3xl p-5 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <small className="text-yellow-800 mb-1 block">Recompensa ao Concluir</small>
              <CoinsChip amount={180} size="large" />
            </div>
            <div className="text-5xl">🏆</div>
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <Button variant="primary" fullWidth>
            Continuar Atividade
          </Button>
          <Button variant="secondary" fullWidth>
            Salvar e Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
