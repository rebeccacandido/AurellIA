import React, { useState } from 'react';
import { InsightIACard } from '../../EDU/Card/InsightIA';
import { Button } from '../../EDU/Button';
import { FileText, Download, TrendingUp, AlertTriangle, CheckCircle, Sparkles, Calendar } from 'lucide-react';

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

  const relatoriosMensais = [
    {
      mes: 'Outubro 2025',
      arquivo: 'relatorio_outubro_2025.pdf',
      tamanho: '2.4 MB',
      data: '01/11/2025'
    },
    {
      mes: 'Setembro 2025',
      arquivo: 'relatorio_setembro_2025.pdf',
      tamanho: '2.1 MB',
      data: '01/10/2025'
    },
    {
      mes: 'Agosto 2025',
      arquivo: 'relatorio_agosto_2025.pdf',
      tamanho: '2.3 MB',
      data: '01/09/2025'
    }
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
      
      {/* Relatórios Mensais de Desempenho */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar size={24} className="text-[#2D5BFF]" />
          <h3 className="text-[#1C1C1E]">Relatórios Mensais de Desempenho</h3>
        </div>
        
        {/* Lista de PDFs Mensais */}
        <div className="space-y-3">
          {relatoriosMensais.map((relatorio, index) => (
            <div key={index} className="bg-white rounded-3xl p-4 card-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                    <FileText size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-[#1C1C1E] mb-1">{relatorio.mes}</h4>
                    <div className="flex items-center gap-3">
                      <small className="text-[#9CA3AF]">{relatorio.tamanho}</small>
                      <span className="text-[#E0E3E7]">•</span>
                      <small className="text-[#9CA3AF]">Gerado em {relatorio.data}</small>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Baixando ${relatorio.arquivo}...`)}
                  className="w-10 h-10 bg-[#F6F7F9] rounded-xl flex items-center justify-center hover:bg-[#2D5BFF] hover:text-white transition-colors"
                >
                  <Download size={18} />
                </button>
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