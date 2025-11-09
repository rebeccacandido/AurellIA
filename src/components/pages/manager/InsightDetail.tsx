import React from 'react';
import { PageHeader } from '../../EDU/PageHeader';
import { TrendingUp, Download, Share2, Sparkles } from 'lucide-react';
import { Button } from '../../EDU/Button';

interface InsightDetailProps {
  onBack: () => void;
}

export function InsightDetail({ onBack }: InsightDetailProps) {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <PageHeader 
        title="Análise de Desempenho"
        subtitle="Relatório detalhado - Nov 2025"
        onBack={onBack}
        rightElement={
          <button className="p-2 hover:bg-[#F6F7F9] rounded-lg transition-colors">
            <Share2 size={20} className="text-[#2D5BFF]" />
          </button>
        }
      />
      
      <div className="px-6 pt-6 pb-20 space-y-6">
        {/* Resumo Executivo */}
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#2D5BFF]/10 flex items-center justify-center">
              <Sparkles size={20} className="text-[#2D5BFF]" />
            </div>
            <h3 className="text-[#1C1C1E]">Resumo Executivo</h3>
          </div>
          <p className="text-[#9CA3AF] mb-4">
            A instituição apresentou crescimento de <strong className="text-[#2D5BFF]">8%</strong> no desempenho médio no último trimestre. 
            As disciplinas de Exatas tiveram melhor evolução (+12%), enquanto Humanas mantiveram-se estáveis (+2%).
          </p>
          <div className="flex items-center gap-2 p-3 bg-[#F6F7F9] rounded-2xl">
            <TrendingUp size={18} className="text-green-500" />
            <span className="text-green-600">Tendência positiva identificada</span>
          </div>
        </div>

        {/* Gráfico de Evolução */}
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <h3 className="text-[#1C1C1E] mb-4">Evolução Trimestral</h3>
          <div className="h-48 flex items-end justify-between gap-3">
            {[
              { mes: 'Ago', valor: 70 },
              { mes: 'Set', valor: 72 },
              { mes: 'Out', valor: 75 },
              { mes: 'Nov', valor: 78 }
            ].map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-[#2D5BFF]">{item.valor}%</div>
                <div 
                  className="w-full bg-gradient-to-t from-[#2D5BFF] to-[#AEC6FF] rounded-t-2xl transition-all"
                  style={{ height: `${item.valor}%` }}
                />
                <small className="text-[#9CA3AF]">{item.mes}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Detalhamento por Área */}
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <h3 className="text-[#1C1C1E] mb-4">Desempenho por Área</h3>
          <div className="space-y-4">
            {[
              { area: 'Exatas', valor: 82, variacao: '+12%', cor: 'bg-blue-500' },
              { area: 'Humanas', valor: 74, variacao: '+2%', cor: 'bg-purple-500' },
              { area: 'Linguagens', valor: 78, variacao: '+6%', cor: 'bg-green-500' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#1C1C1E]">{item.area}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">{item.variacao}</span>
                    <span>{item.valor}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-[#E0E3E7] rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.cor} transition-all duration-500`}
                    style={{ width: `${item.valor}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recomendações da IA */}
        <div className="bg-gradient-to-br from-[#AEC6FF]/20 to-[#2D5BFF]/10 rounded-3xl p-5 border border-[#2D5BFF]/20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-[#2D5BFF]" />
            <h3 className="text-[#1C1C1E]">Recomendações da IA</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#2D5BFF] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">1</span>
              </div>
              <p className="text-[#1C1C1E]">
                Implementar metodologias ativas nas disciplinas de Humanas, replicando estratégias bem-sucedidas de Exatas.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#2D5BFF] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">2</span>
              </div>
              <p className="text-[#1C1C1E]">
                Investir em capacitação docente focada em ferramentas digitais e metodologias inovadoras.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#2D5BFF] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">3</span>
              </div>
              <p className="text-[#1C1C1E]">
                Expandir o uso de gamificação para todas as turmas, priorizando áreas com menor engajamento.
              </p>
            </li>
          </ul>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <Button variant="primary" fullWidth>
            <Download size={18} />
            Exportar Relatório (PDF)
          </Button>
          <Button variant="secondary" fullWidth>
            Compartilhar com Equipe
          </Button>
        </div>
      </div>
    </div>
  );
}
