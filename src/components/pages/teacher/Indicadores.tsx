import React from 'react';
import { MetricaCard } from '../../EDU/Card/Metrica';
import { InsightIACard } from '../../EDU/Card/InsightIA';
import { Button } from '../../EDU/Button';
import { TrendingUp, Users, Target, BookOpen, User, Mail, Building2, BookText, Plus } from 'lucide-react';

export function TeacherIndicadores({ onNavigateToCriarQuiz }: { onNavigateToCriarQuiz?: () => void }) {
  // Dados do Professor
  const professor = {
    nome: 'Prof. Carlos Silva',
    email: 'carlos.silva@escola.com.br',
    instituicao: 'Escola Estadual Dom Pedro II',
    disciplina: 'Matemática'
  };
  
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div>
        <h2 className="text-[#1C1C1E] mb-2">Indicadores de {professor.disciplina}</h2>
        <p className="text-[#9CA3AF]">Turma 7º A - 30 alunos</p>
      </div>
      
      {/* Ação Rápida - Criar Quiz */}
      <button
        onClick={onNavigateToCriarQuiz}
        className="w-full bg-gradient-to-r from-[#2D5BFF] to-[#7B61FF] rounded-3xl p-5 card-shadow hover:scale-[1.02] transition-transform"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Plus size={24} className="text-white" />
            </div>
            <div className="text-left">
              <h4 className="text-white mb-1">Criar Novo Quiz</h4>
              <small className="text-white/80">Adicione atividades para sua turma</small>
            </div>
          </div>
          <div className="text-white text-2xl">→</div>
        </div>
      </button>
      
      {/* Perfil do Professor */}
      <div className="bg-gradient-to-br from-[#AEC6FF]/20 to-[#2D5BFF]/10 rounded-3xl p-5 border border-[#2D5BFF]/20">
        <h3 className="text-[#1C1C1E] mb-4">Meu Perfil</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2D5BFF] rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <small className="text-[#9CA3AF]">Nome</small>
              <p className="text-[#1C1C1E]">{professor.nome}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2D5BFF] rounded-full flex items-center justify-center">
              <Mail size={20} className="text-white" />
            </div>
            <div>
              <small className="text-[#9CA3AF]">E-mail</small>
              <p className="text-[#1C1C1E]">{professor.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2D5BFF] rounded-full flex items-center justify-center">
              <Building2 size={20} className="text-white" />
            </div>
            <div>
              <small className="text-[#9CA3AF]">Instituição</small>
              <p className="text-[#1C1C1E]">{professor.instituicao}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2D5BFF] rounded-full flex items-center justify-center">
              <BookText size={20} className="text-white" />
            </div>
            <div>
              <small className="text-[#9CA3AF]">Disciplina</small>
              <p className="text-[#1C1C1E]">{professor.disciplina}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Métricas */}
      <div className="grid grid-cols-2 gap-4">
        <MetricaCard
          title="Média de Acertos"
          value="78%"
          icon={<Target size={24} />}
          trend="up"
          trendValue="+5%"
        />
        <MetricaCard
          title="Alunos Ativos"
          value="28/32"
          icon={<Users size={24} />}
        />
      </div>
      
      {/* Desempenho por Tópico da Disciplina */}
      <div className="bg-white rounded-3xl p-5 card-shadow">
        <h3 className="text-[#1C1C1E] mb-4">Desempenho por Tópico</h3>
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
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#1C1C1E]">Frações</span>
              <span className="text-[#9CA3AF]">70%</span>
            </div>
            <div className="w-full h-2 bg-[#F6F7F9] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FF6B6B] rounded-full transition-all duration-300"
                style={{ width: '70%' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Insight IA */}
      <InsightIACard
        title="Sugestão da IA"
        insight="Detectamos que 45% da turma tem dificuldade com equações de 1º grau. Recomendamos usar jogos matemáticos e atividades práticas para tornar o aprendizado mais engajador. Os alunos respondem bem a desafios e competições saudáveis."
        actionLabel="Gerar Plano de Aula Personalizado"
        onAction={() => alert('Plano de aula gerado com foco em equações!')}
      />
    </div>
  );
}