import React, { useState } from 'react';
import { Users, ChevronRight, Target, TrendingUp, BookOpen } from 'lucide-react';
import { MetricaCard } from '../../EDU/Card/Metrica';
import { InsightIACard } from '../../EDU/Card/InsightIA';

export function TeacherTurmas() {
  const [selectedTurma, setSelectedTurma] = useState<string | null>(null);

  const turmas = [
    { 
      id: '7a',
      nome: '7º A', 
      alunos: 30, 
      progresso: 72,
      disciplina: 'Matemática'
    }
  ];

  const alunosPerfil = [
    { 
      nome: 'Pedro Silva', 
      forcas: ['Geometria Plana'],
      fraquezas: ['Equações de 1º Grau'],
      preferencias: ['Geometria Plana']
    },
    { 
      nome: 'Ana Costa', 
      forcas: ['Frações'],
      fraquezas: ['Geometria Plana'],
      preferencias: ['Frações']
    },
    { 
      nome: 'Lucas Oliveira', 
      forcas: ['Equações de 1º Grau'],
      fraquezas: ['Frações'],
      preferencias: ['Equações de 1º Grau']
    }
  ];

  // Se uma turma estiver selecionada, mostra o relatório
  if (selectedTurma) {
    const turma = turmas.find(t => t.id === selectedTurma);
    
    return (
      <div className="pb-20 px-6 pt-6 space-y-6">
        {/* Header com botão voltar */}
        <div>
          <button 
            onClick={() => setSelectedTurma(null)}
            className="text-[#2D5BFF] mb-2 flex items-center gap-1"
          >
            ← Voltar
          </button>
          <h2 className="text-[#1C1C1E] mb-2">Relatório - {turma?.nome}</h2>
          <p className="text-[#9CA3AF]">{turma?.alunos} alunos • {turma?.disciplina}</p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 gap-4">
          <MetricaCard
            title="Média de Acertos"
            value={`${turma?.progresso}%`}
            icon={<Target size={24} />}
            trend="up"
            trendValue="+5%"
          />
          <MetricaCard
            title="Alunos Ativos"
            value={`${turma?.alunos - 4}/${turma?.alunos}`}
            icon={<Users size={24} />}
          />
        </div>

        {/* Disciplina */}
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <h3 className="text-[#1C1C1E] mb-4">Desempenho em {turma?.disciplina}</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#1C1C1E]">Álgebra</span>
                <span className="text-[#9CA3AF]">75%</span>
              </div>
              <div className="w-full h-2 bg-[#F6F7F9] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2D5BFF] rounded-full transition-all duration-300"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#1C1C1E]">Geometria</span>
                <span className="text-[#9CA3AF]">82%</span>
              </div>
              <div className="w-full h-2 bg-[#F6F7F9] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#7B61FF] rounded-full transition-all duration-300"
                  style={{ width: '82%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#1C1C1E]">Estatística</span>
                <span className="text-[#9CA3AF]">68%</span>
              </div>
              <div className="w-full h-2 bg-[#F6F7F9] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00C875] rounded-full transition-all duration-300"
                  style={{ width: '68%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Perfil dos Alunos */}
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <h3 className="text-[#1C1C1E] mb-4">Perfil dos Alunos</h3>
          <div className="space-y-4">
            {alunosPerfil.map((aluno, index) => (
              <div key={index} className="border-b border-[#E0E3E7] last:border-0 pb-4 last:pb-0">
                <h4 className="text-[#1C1C1E] mb-2">{aluno.nome}</h4>
                <div className="space-y-2">
                  <div>
                    <small className="text-[#9CA3AF]">Forças:</small>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {aluno.forcas.map((forca, i) => (
                        <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs">
                          {forca}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <small className="text-[#9CA3AF]">Fraquezas:</small>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {aluno.fraquezas.map((fraqueza, i) => (
                        <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs">
                          {fraqueza}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <small className="text-[#9CA3AF]">Preferências:</small>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {aluno.preferencias.map((pref, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight IA */}
        <InsightIACard
          title="Sugestão da IA"
          insight="Com base no perfil da turma, recomendamos aplicar Aprendizagem Baseada em Projetos (ABP) para aumentar o engajamento. Os alunos demonstram preferência por atividades práticas e colaborativas."
          actionLabel="Aplicar ABP à Turma"
          onAction={() => alert('Metodologia ABP aplicada com sucesso!')}
        />
      </div>
    );
  }

  // Lista de turmas disponíveis
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div>
        <h2 className="text-[#1C1C1E] mb-2">Minhas Turmas</h2>
        <p className="text-[#9CA3AF]">Selecione uma turma para ver o relatório</p>
      </div>
      
      {/* Cards de Turmas */}
      <div className="space-y-4">
        {turmas.map((turma) => (
          <button
            key={turma.id}
            onClick={() => setSelectedTurma(turma.id)}
            className="w-full bg-white rounded-3xl p-5 card-shadow hover:scale-[1.02] active:scale-[0.98] transition-transform text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#AEC6FF] to-[#2D5BFF] rounded-2xl flex items-center justify-center">
                  <Users size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[#1C1C1E] mb-1">{turma.nome}</h3>
                  <p className="text-[#9CA3AF]">{turma.alunos} alunos • {turma.disciplina}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="text-[#2D5BFF] mb-1">{turma.progresso}%</p>
                  <small className="text-[#9CA3AF]">progresso</small>
                </div>
                <ChevronRight size={20} className="text-[#9CA3AF]" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}