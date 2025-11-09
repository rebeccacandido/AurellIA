import React from 'react';
import { MetricaCard } from '../../EDU/Card/Metrica';
import { InsightIACard } from '../../EDU/Card/InsightIA';
import { TrendingUp, Users, Target, BookOpen, User, Mail, Building2, BookText } from 'lucide-react';

export function TeacherIndicadores() {
  // Dados do Professor
  const professor = {
    nome: 'Prof. Carlos Silva',
    email: 'carlos.silva@escola.com.br',
    instituicao: 'Escola Estadual Dom Pedro II',
    disciplina: 'Matemática'
  };
  
  // Temas disponíveis no quiz de Matemática
  const temas = ['Equações de 1º Grau', 'Geometria Plana', 'Frações'];
  
  // Perfis baseados nos acertos/erros no quiz
  const alunos = [
    { 
      nome: 'Pedro Silva', 
      forcas: ['Geometria Plana'], // Acertou 4/5 questões de Geometria
      fraquezas: ['Equações de 1º Grau'], // Acertou apenas 2/5 questões de Equações
      preferencias: ['Geometria Plana'] // Tópico que mais acessa (mesmo das forças)
    },
    { 
      nome: 'Ana Costa', 
      forcas: ['Frações'], // Acertou 5/5 questões de Frações
      fraquezas: ['Geometria Plana'], // Acertou apenas 2/5 questões de Geometria
      preferencias: ['Frações'] // Tópico que mais acessa (mesmo das forças)
    },
    { 
      nome: 'Lucas Oliveira', 
      forcas: ['Equações de 1º Grau'], // Acertou 4/5 questões de Equações
      fraquezas: ['Frações'], // Acertou apenas 1/5 questões de Frações
      preferencias: ['Equações de 1º Grau'] // Tópico que mais acessa (mesmo das forças)
    }
  ];
  
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div>
        <h2 className="text-[#1C1C1E] mb-2">Indicadores de {professor.disciplina}</h2>
        <p className="text-[#9CA3AF]">Turma 7º A - 30 alunos</p>
      </div>
      
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
      
      {/* Principais Dificuldades */}
      <div className="bg-white rounded-3xl p-5 card-shadow">
        <h3 className="text-[#1C1C1E] mb-4">Principais Dificuldades em {professor.disciplina}</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-[#FEF3C7] rounded-xl">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <h4 className="text-[#1C1C1E] mb-1">Equações de 1º Grau</h4>
              <p className="text-[#9CA3AF] text-sm">45% dos alunos apresentam dificuldade</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-[#FEE2E2] rounded-xl">
            <span className="text-2xl">🔴</span>
            <div className="flex-1">
              <h4 className="text-[#1C1C1E] mb-1">Cálculos com Frações</h4>
              <p className="text-[#9CA3AF] text-sm">38% dos alunos apresentam dificuldade</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-[#E0F2FE] rounded-xl">
            <span className="text-2xl">ℹ️</span>
            <div className="flex-1">
              <h4 className="text-[#1C1C1E] mb-1">Interpretação de Problemas</h4>
              <p className="text-[#9CA3AF] text-sm">28% dos alunos apresentam dificuldade</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Perfil dos Alunos */}
      <div className="bg-white rounded-3xl p-5 card-shadow">
        <h3 className="text-[#1C1C1E] mb-4">Perfil dos Alunos em {professor.disciplina}</h3>
        <div className="space-y-4">
          {alunos.map((aluno, index) => (
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
        insight="Detectamos que 45% da turma tem dificuldade com equações de 1º grau. Recomendamos usar jogos matemáticos e atividades práticas para tornar o aprendizado mais engajador. Os alunos respondem bem a desafios e competições saudáveis."
        actionLabel="Gerar Plano de Aula Personalizado"
        onAction={() => alert('Plano de aula gerado com foco em equações!')}
      />
    </div>
  );
}