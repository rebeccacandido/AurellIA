import React, { useState } from 'react';
import { Users, ChevronRight, Target, TrendingUp, BookOpen, Search, ChevronDown } from 'lucide-react';
import { MetricaCard } from '../../EDU/Card/Metrica';
import { InsightIACard } from '../../EDU/Card/InsightIA';
import { Button } from '../../EDU/Button';
import { api, GroupPerformanceReport } from '../../../lib/api';

type GroupPerformanceData = GroupPerformanceReport['data'] | null;

export function TeacherTurmas() {
  const [selectedTurma, setSelectedTurma] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAluno, setExpandedAluno] = useState<number | null>(null);
  const [groupReport, setGroupReport] = useState<GroupPerformanceData>(null);
  const [reportError, setReportError] = useState<string | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [reportTurmaId, setReportTurmaId] = useState<string | null>(null);

  const turmas = [
    { 
      id: '7a',
      nome: '7º A', 
      alunos: 30, 
      progresso: 72,
      disciplina: 'Matemática',
      groupId: 1
    }
  ];

  const alunosPerfil = [
    { 
      nome: 'Ana Costa', 
      forcas: ['Frações'],
      fraquezas: ['Geometria Plana'],
      preferencias: ['Frações']
    },
    { 
      nome: 'Carla Mendes', 
      forcas: ['Geometria Plana', 'Frações'],
      fraquezas: ['Equações de 1º Grau'],
      preferencias: ['Geometria Plana']
    },
    { 
      nome: 'João Ferreira', 
      forcas: ['Estatística'],
      fraquezas: ['Álgebra'],
      preferencias: ['Estatística']
    },
    { 
      nome: 'Lucas Oliveira', 
      forcas: ['Equações de 1º Grau'],
      fraquezas: ['Frações'],
      preferencias: ['Equações de 1º Grau']
    },
    { 
      nome: 'Maria Santos', 
      forcas: ['Álgebra'],
      fraquezas: ['Estatística'],
      preferencias: ['Álgebra']
    },
    { 
      nome: 'Pedro Silva', 
      forcas: ['Geometria Plana'],
      fraquezas: ['Equações de 1º Grau'],
      preferencias: ['Geometria Plana']
    }
  ];

  const handleGenerateReport = async (turmaId: string, groupId: number) => {
    setIsLoadingReport(true);
    setReportError(null);
    setReportTurmaId(turmaId);
    try {
      const response = await api.generateQuizGroupReport(groupId);
      setGroupReport(response.data);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Não foi possível gerar o relatório da turma.';
      setReportError(message);
      setGroupReport(null);
    } finally {
      setIsLoadingReport(false);
    }
  };

  // Filtrar alunos por nome
  const alunosFiltrados = alunosPerfil.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Se uma turma estiver selecionada, mostra o relatório
  if (selectedTurma) {
    const turma = turmas.find(t => t.id === selectedTurma);
    
    return (
      <div className="pb-20 px-6 pt-6 space-y-6">
        {/* Header com botão voltar */}
        <div>
          <button 
            onClick={() => {
              setSelectedTurma(null);
              setGroupReport(null);
              setReportError(null);
              setReportTurmaId(null);
            }}
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

        {/* Relatório IA */}
        <div className="bg-white rounded-3xl p-5 card-shadow space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-[#1C1C1E] mb-1">Relatório IA da turma</h3>
              <small className="text-[#9CA3AF]">Insights personalizados com IA</small>
            </div>
            {turma?.groupId && (
              <Button
                variant="secondary"
                onClick={() => handleGenerateReport(turma.id, turma.groupId)}
                state={isLoadingReport ? 'disabled' : 'default'}
              >
                {isLoadingReport && reportTurmaId === turma.id ? 'Gerando...' : 'Gerar'}
              </Button>
            )}
          </div>
          {reportError && reportTurmaId === turma?.id && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100">
              {reportError}
            </div>
          )}
          {groupReport && reportTurmaId === turma?.id ? (
            <div className="space-y-3">
              <div className="text-sm text-[#9CA3AF]">
                Período: {groupReport.period.start} a {groupReport.period.end}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F6F7F9] rounded-2xl p-3">
                  <small className="text-[#9CA3AF] block">Taxa média de acertos</small>
                  <p className="text-xl text-[#1C1C1E]">
                    {groupReport.group_metrics.average_accuracy_rate}%
                  </p>
                </div>
                <div className="bg-[#F6F7F9] rounded-2xl p-3">
                  <small className="text-[#9CA3AF] block">Tempo médio</small>
                  <p className="text-xl text-[#1C1C1E]">
                    {groupReport.group_metrics.average_time_spent}s
                  </p>
                </div>
              </div>
              <div>
                <small className="text-[#9CA3AF] block mb-1">Destaques da semana</small>
                <ul className="space-y-1 text-sm text-[#1C1C1E]">
                  {groupReport.student_ranking.slice(0, 3).map((student) => (
                    <li key={student.student_id} className="flex items-center justify-between">
                      <span>{student.name}</span>
                      <span>{student.accuracy_rate}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            !isLoadingReport && (
              <p className="text-[#9CA3AF] text-sm">
                Gere um relatório para visualizar o desempenho consolidado desta turma.
              </p>
            )
          )}
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
          
          {/* Campo de Busca */}
          <div className="mb-4 relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Buscar aluno por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F6F7F9] rounded-xl border border-[#E0E3E7] focus:outline-none focus:border-[#2D5BFF] transition-colors"
            />
          </div>

          {/* Lista de Alunos Filtrados */}
          {alunosFiltrados.length > 0 ? (
            <div className="space-y-2">
              {alunosFiltrados.map((aluno, index) => (
                <div key={index} className="border border-[#E0E3E7] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedAluno(expandedAluno === index ? null : index)}
                    className="w-full p-3 flex items-center justify-between hover:bg-[#F6F7F9] transition-colors"
                  >
                    <span className="text-[#1C1C1E]">{aluno.nome}</span>
                    <ChevronDown 
                      size={18} 
                      className={`text-[#9CA3AF] transition-transform ${expandedAluno === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {expandedAluno === index && (
                    <div className="px-3 pb-3 pt-1 space-y-2 bg-[#F6F7F9]/50">
                      <div>
                        <small className="text-[#9CA3AF]">Forças:</small>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {aluno.forcas.map((forca, i) => (
                            <span key={i} className="px-2 py-0.5 bg-green-100 text-green-700 rounded-lg text-xs">
                              {forca}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <small className="text-[#9CA3AF]">Fraquezas:</small>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {aluno.fraquezas.map((fraqueza, i) => (
                            <span key={i} className="px-2 py-0.5 bg-red-100 text-red-700 rounded-lg text-xs">
                              {fraqueza}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#9CA3AF]">Nenhum aluno encontrado</p>
            </div>
          )}
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
            onClick={() => {
              setSelectedTurma(turma.id);
              setGroupReport(null);
              setReportError(null);
              setReportTurmaId(null);
            }}
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
