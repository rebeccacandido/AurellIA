import React, { useState } from 'react';
import { InsightIACard } from '../../EDU/Card/InsightIA';
import { Button } from '../../EDU/Button';
import { FileText, Download, TrendingUp, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';

export function ManagerRelatoriosIA() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  
  const relatorios = [
    {
      id: 'performance',
      title: 'Análise de Desempenho',
      icon: TrendingUp,
      description: 'Visão geral do desempenho institucional',
      status: 'success'
    },
    {
      id: 'risk',
      title: 'Alunos em Risco',
      icon: AlertTriangle,
      description: 'Identificação de estudantes que precisam de suporte',
      status: 'warning'
    },
    {
      id: 'engagement',
      title: 'Engajamento',
      icon: CheckCircle,
      description: 'Métricas de participação e motivação',
      status: 'success'
    }
  ];
  
  const insights = [
    {
      categoria: 'Desempenho Geral',
      insight: 'A instituição apresentou crescimento de 8% no desempenho médio no último trimestre. As disciplinas de Exatas tiveram melhor evolução (+12%), enquanto Humanas mantiveram-se estáveis (+2%).',
      recomendacao: 'Implementar metodologias ativas nas disciplinas de Humanas, replicando estratégias bem-sucedidas de Exatas.'
    },
    {
      categoria: 'Alunos em Risco',
      insight: 'Foram identificados 47 alunos (3,8% do total) com baixo engajamento e queda de desempenho. A maioria está concentrada no 8º ano da Unidade Norte.',
      recomendacao: 'Criar programa de tutoria personalizada com professores da Unidade Centro, que apresentam melhores resultados nesta série.'
    },
    {
      categoria: 'Engajamento',
      insight: 'O sistema de gamificação aumentou o engajamento em 45% nas turmas que o adotaram. Alunos completam 2,3x mais atividades quando há recompensas solidárias.',
      recomendacao: 'Expandir gamificação para todas as turmas e ampliar catálogo de ações solidárias no marketplace.'
    },
    {
      categoria: 'Recursos Pedagógicos',
      insight: 'Conteúdos interativos (vídeos, simulações) têm taxa de conclusão 60% maior que conteúdos tradicionais. Turmas com mais recursos digitais apresentam 15% mais engajamento.',
      recomendacao: 'Investir em produção de conteúdo multimídia e capacitar professores para uso de ferramentas digitais.'
    }
  ];
  
  const comparativos = [
    { unidade: 'Unidade Centro', progresso: 78, engajamento: 85, risco: 2.1 },
    { unidade: 'Unidade Norte', progresso: 72, engajamento: 78, risco: 5.2 },
    { unidade: 'Unidade Sul', progresso: 75, engajamento: 82, risco: 3.5 }
  ];
  
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div>
        <h2 className="text-[#1C1C1E] mb-2">Relatórios com IA</h2>
        <p className="text-[#9CA3AF]">Insights avançados para tomada de decisão</p>
      </div>
      
      {/* Tipos de Relatórios */}
      <div className="space-y-3">
        {relatorios.map((relatorio) => {
          const Icon = relatorio.icon;
          const isSelected = selectedReport === relatorio.id;
          return (
            <button
              key={relatorio.id}
              onClick={() => setSelectedReport(isSelected ? null : relatorio.id)}
              className={`w-full bg-white rounded-3xl p-5 card-shadow hover:scale-[1.01] transition-all text-left ${
                isSelected ? 'ring-2 ring-[#2D5BFF]' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  relatorio.status === 'success' ? 'bg-green-100 text-green-600' :
                  relatorio.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#1C1C1E] mb-1">{relatorio.title}</h4>
                  <small className="text-[#9CA3AF]">{relatorio.description}</small>
                </div>
                <FileText size={20} className="text-[#9CA3AF]" />
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Insights IA */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={24} className="text-[#2D5BFF]" />
          <h3 className="text-[#1C1C1E]">Insights Gerados por IA</h3>
        </div>
        
        {insights.map((item, index) => (
          <div key={index} className="bg-white rounded-3xl p-5 card-shadow">
            <h4 className="text-[#2D5BFF] mb-3">{item.categoria}</h4>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#2D5BFF] rounded-full" />
                  <small className="text-[#9CA3AF]">Análise</small>
                </div>
                <p className="text-[#1C1C1E] ml-4">{item.insight}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <small className="text-[#9CA3AF]">Recomendação</small>
                </div>
                <p className="text-[#1C1C1E] ml-4">{item.recomendacao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Comparativo entre Unidades */}
      <div className="bg-white rounded-3xl p-5 card-shadow">
        <h3 className="text-[#1C1C1E] mb-4">Comparativo de Unidades</h3>
        <div className="space-y-4">
          {comparativos.map((item, index) => (
            <div key={index} className="pb-4 border-b border-[#E0E3E7] last:border-0 last:pb-0">
              <h4 className="text-[#1C1C1E] mb-3">{item.unidade}</h4>
              
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <small className="text-[#9CA3AF]">Progresso</small>
                    <small className="text-[#2D5BFF]">{item.progresso}%</small>
                  </div>
                  <div className="w-full h-2 bg-[#E0E3E7] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#2D5BFF] rounded-full transition-all"
                      style={{ width: `${item.progresso}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <small className="text-[#9CA3AF]">Engajamento</small>
                    <small className="text-green-600">{item.engajamento}%</small>
                  </div>
                  <div className="w-full h-2 bg-[#E0E3E7] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${item.engajamento}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <small className="text-[#9CA3AF]">Alunos em Risco</small>
                    <small className={item.risco > 4 ? 'text-red-600' : 'text-yellow-600'}>
                      {item.risco}%
                    </small>
                  </div>
                  <div className="w-full h-2 bg-[#E0E3E7] rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        item.risco > 4 ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${item.risco * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Insight IA Principal */}
      <InsightIACard
        title="Recomendação Estratégica"
        insight="Com base na análise consolidada, a IA sugere focar em: 1) Expansão do sistema de gamificação para todas as unidades, 2) Programa de tutoria para alunos em risco da Unidade Norte, 3) Investimento em conteúdo multimídia para disciplinas de Humanas. Impacto estimado: +15% no desempenho geral em 6 meses."
        actionLabel="Gerar Plano de Ação"
        onAction={() => alert('Plano de ação detalhado gerado! Verifique seu e-mail.')}
      />
      
      {/* Ações de Exportação */}
      <div className="space-y-3">
        <Button
          variant="primary"
          fullWidth
          onClick={() => alert('Relatório completo exportado para PDF!')}
        >
          <Download size={18} />
          Exportar Relatório Completo
        </Button>
        <Button
          variant="secondary"
          fullWidth
          onClick={() => alert('Análise enviada por e-mail!')}
        >
          <FileText size={18} />
          Enviar Análise por E-mail
        </Button>
      </div>
    </div>
  );
}
