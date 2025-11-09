import React, { useState } from 'react';
import { PageHeader } from '../../EDU/PageHeader';
import { Button } from '../../EDU/Button';
import { TextField } from '../../EDU/TextField';
import { Save, Eye, CheckCircle, Search, Filter } from 'lucide-react';
import { Modal } from '../../EDU/Modal';

interface Questao {
  id: string;
  pergunta: string;
  alternativas: string[];
  respostaCorreta: number;
  explicacao: string;
  topico: string;
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
}

export function TeacherCriarQuiz({ onBack }: { onBack: () => void }) {
  const [quizData, setQuizData] = useState({
    tema: '',
    descricao: ''
  });

  const [questoesSelecionadas, setQuestoesSelecionadas] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTopico, setFiltroTopico] = useState<string>('todos');
  const [filtroDificuldade, setFiltroDificuldade] = useState<string>('todas');
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock de questões disponíveis (simula resposta da API GET /api/questoes)
  const questoesDisponiveis: Questao[] = [
    {
      id: 'q1',
      pergunta: 'Quanto é 2 + 2?',
      alternativas: ['3', '4', '5', '6'],
      respostaCorreta: 1,
      explicacao: '2 + 2 = 4',
      topico: 'Álgebra',
      dificuldade: 'Fácil'
    },
    {
      id: 'q2',
      pergunta: 'Qual é o valor de x na equação x + 5 = 10?',
      alternativas: ['3', '4', '5', '6'],
      respostaCorreta: 2,
      explicacao: 'x = 10 - 5 = 5',
      topico: 'Álgebra',
      dificuldade: 'Média'
    },
    {
      id: 'q3',
      pergunta: 'Qual é a área de um quadrado de lado 4?',
      alternativas: ['8', '12', '16', '20'],
      respostaCorreta: 2,
      explicacao: 'Área = lado × lado = 4 × 4 = 16',
      topico: 'Geometria',
      dificuldade: 'Fácil'
    },
    {
      id: 'q4',
      pergunta: 'Quanto é 15% de 200?',
      alternativas: ['20', '25', '30', '35'],
      respostaCorreta: 2,
      explicacao: '15% de 200 = 0,15 × 200 = 30',
      topico: 'Porcentagem',
      dificuldade: 'Média'
    },
    {
      id: 'q5',
      pergunta: 'Qual é o perímetro de um triângulo equilátero de lado 6?',
      alternativas: ['12', '15', '18', '24'],
      respostaCorreta: 2,
      explicacao: 'Perímetro = 3 × lado = 3 × 6 = 18',
      topico: 'Geometria',
      dificuldade: 'Média'
    },
    {
      id: 'q6',
      pergunta: 'Resolva: 3x - 9 = 0',
      alternativas: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
      respostaCorreta: 1,
      explicacao: '3x = 9, logo x = 9/3 = 3',
      topico: 'Álgebra',
      dificuldade: 'Média'
    },
    {
      id: 'q7',
      pergunta: 'Qual é a raiz quadrada de 64?',
      alternativas: ['6', '7', '8', '9'],
      respostaCorreta: 2,
      explicacao: '√64 = 8, pois 8 × 8 = 64',
      topico: 'Potenciação',
      dificuldade: 'Fácil'
    },
    {
      id: 'q8',
      pergunta: 'Se 2x + 3 = 11, qual o valor de x?',
      alternativas: ['3', '4', '5', '6'],
      respostaCorreta: 1,
      explicacao: '2x = 11 - 3 = 8, logo x = 4',
      topico: 'Álgebra',
      dificuldade: 'Difícil'
    }
  ];

  // Filtrar questões
  const questoesFiltradas = questoesDisponiveis.filter(q => {
    const matchSearch = q.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       q.topico.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTopico = filtroTopico === 'todos' || q.topico === filtroTopico;
    const matchDificuldade = filtroDificuldade === 'todas' || q.dificuldade === filtroDificuldade;
    
    return matchSearch && matchTopico && matchDificuldade;
  });

  // Obter tópicos únicos
  const topicos = ['todos', ...Array.from(new Set(questoesDisponiveis.map(q => q.topico)))];

  const handleToggleQuestao = (id: string) => {
    if (questoesSelecionadas.includes(id)) {
      setQuestoesSelecionadas(questoesSelecionadas.filter(qId => qId !== id));
    } else {
      if (questoesSelecionadas.length < 6) {
        setQuestoesSelecionadas([...questoesSelecionadas, id]);
      } else {
        alert('Você pode selecionar no máximo 6 questões');
      }
    }
  };

  const isQuizValid = () => {
    return quizData.tema.trim() !== '' && 
           quizData.descricao.trim() !== '' && 
           questoesSelecionadas.length >= 1 &&
           questoesSelecionadas.length <= 6;
  };

  const handleGerarQuiz = async () => {
    if (!isQuizValid()) {
      alert('Preencha todos os campos e selecione entre 1 e 6 questões');
      return;
    }

    setIsLoading(true);

    // Simular chamada à API
    try {
      // Em produção, fazer:
      // const response = await fetch('/api/quizzes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     tema: quizData.tema,
      //     descricao: quizData.descricao,
      //     questaoIds: questoesSelecionadas
      //   })
      // });
      
      console.log('POST /api/quizzes', {
        tema: quizData.tema,
        descricao: quizData.descricao,
        questaoIds: questoesSelecionadas
      });

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsLoading(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        onBack();
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      alert('Erro ao criar quiz. Tente novamente.');
    }
  };

  const questoesPreview = questoesSelecionadas.map(id => 
    questoesDisponiveis.find(q => q.id === id)!
  );

  const getCorDificuldade = (dificuldade: string) => {
    switch (dificuldade) {
      case 'Fácil': return 'bg-green-100 text-green-700';
      case 'Média': return 'bg-yellow-100 text-yellow-700';
      case 'Difícil': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="pb-20">
      <PageHeader title="Criar Novo Quiz" showBack onBack={onBack} />
      
      <div className="px-6 pt-6 space-y-6">
        {/* Informações do Quiz */}
        <div className="bg-white rounded-3xl p-5 card-shadow space-y-4">
          <h3 className="text-[#1C1C1E]">Informações do Quiz</h3>
          <div className="space-y-3">
            <TextField
              label="Tema do Quiz"
              placeholder="Ex: Álgebra Básica"
              value={quizData.tema}
              onChange={(e) => setQuizData({ ...quizData, tema: e.target.value })}
            />
            <TextField
              label="Descrição"
              placeholder="Ex: Aprenda equações de 1º grau"
              value={quizData.descricao}
              onChange={(e) => setQuizData({ ...quizData, descricao: e.target.value })}
            />
          </div>
        </div>

        {/* Contador de Seleção */}
        <div className="bg-gradient-to-r from-[#2D5BFF] to-[#7B61FF] rounded-3xl p-5 card-shadow">
          <div className="flex items-center justify-between text-white">
            <div>
              <small className="text-white/80">Questões Selecionadas</small>
              <h2 className="text-white">{questoesSelecionadas.length} / 6</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">{questoesSelecionadas.length}</span>
            </div>
          </div>
        </div>

        {/* Busca e Filtros */}
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <h3 className="text-[#1C1C1E] mb-4">Buscar Questões</h3>
          
          <div className="relative mb-4">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Buscar por pergunta ou tópico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F6F7F9] rounded-xl border border-[#E0E3E7] focus:outline-none focus:border-[#2D5BFF] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-2 text-[#9CA3AF]">
                <small>Tópico</small>
              </label>
              <select
                value={filtroTopico}
                onChange={(e) => setFiltroTopico(e.target.value)}
                className="w-full px-4 py-3 bg-[#F6F7F9] rounded-xl border border-[#E0E3E7] focus:outline-none focus:border-[#2D5BFF] transition-colors"
              >
                {topicos.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-[#9CA3AF]">
                <small>Dificuldade</small>
              </label>
              <select
                value={filtroDificuldade}
                onChange={(e) => setFiltroDificuldade(e.target.value)}
                className="w-full px-4 py-3 bg-[#F6F7F9] rounded-xl border border-[#E0E3E7] focus:outline-none focus:border-[#2D5BFF] transition-colors"
              >
                <option value="todas">todas</option>
                <option value="Fácil">Fácil</option>
                <option value="Média">Média</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Questões */}
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1C1C1E]">Questões Disponíveis</h3>
            <small className="text-[#9CA3AF]">{questoesFiltradas.length} questões</small>
          </div>

          {questoesFiltradas.length > 0 ? (
            <div className="space-y-3">
              {questoesFiltradas.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleToggleQuestao(q.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    questoesSelecionadas.includes(q.id)
                      ? 'border-[#2D5BFF] bg-[#2D5BFF]/5'
                      : 'border-[#E0E3E7] hover:border-[#AEC6FF]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-1 ${
                      questoesSelecionadas.includes(q.id)
                        ? 'bg-[#2D5BFF] border-[#2D5BFF]'
                        : 'border-[#E0E3E7]'
                    }`}>
                      {questoesSelecionadas.includes(q.id) && (
                        <CheckCircle size={14} className="text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-lg text-xs ${getCorDificuldade(q.dificuldade)}`}>
                          {q.dificuldade}
                        </span>
                        <span className="px-2 py-1 bg-[#2D5BFF]/10 text-[#2D5BFF] rounded-lg text-xs">
                          {q.topico}
                        </span>
                      </div>
                      
                      <p className="text-[#1C1C1E] mb-2">{q.pergunta}</p>
                      
                      <div className="grid grid-cols-2 gap-1">
                        {q.alternativas.map((alt, idx) => (
                          <small key={idx} className={`text-[#9CA3AF] ${q.respostaCorreta === idx ? 'text-green-600' : ''}`}>
                            {String.fromCharCode(65 + idx)}) {alt}
                          </small>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#9CA3AF]">Nenhuma questão encontrada</p>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <div className="space-y-2">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setShowPreview(true)}
              disabled={questoesSelecionadas.length === 0}
            >
              <Eye size={18} />
              Visualizar Quiz
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleGerarQuiz}
              disabled={!isQuizValid() || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Gerar Quiz
                </>
              )}
            </Button>
          </div>

          {!isQuizValid() && quizData.tema && quizData.descricao && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-2xl">
              <small className="text-yellow-800">
                ⚠️ Selecione entre 1 e 6 questões para gerar o quiz
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Preview */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Pré-visualização do Quiz"
      >
        <div className="space-y-4">
          <div className="text-center pb-4 border-b border-[#E0E3E7]">
            <h2 className="text-[#1C1C1E] mb-2">{quizData.tema || 'Sem título'}</h2>
            <p className="text-[#9CA3AF]">{quizData.descricao || 'Sem descrição'}</p>
            <small className="text-[#2D5BFF] mt-2 block">{questoesSelecionadas.length} questões</small>
          </div>

          {questoesPreview.map((p, index) => (
            <div key={p.id} className="bg-[#F6F7F9] rounded-2xl p-4">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#9CA3AF]">Questão {index + 1}</span>
                  <span className={`px-2 py-0.5 rounded-lg text-xs ${getCorDificuldade(p.dificuldade)}`}>
                    {p.dificuldade}
                  </span>
                </div>
                <p className="text-[#1C1C1E]">{p.pergunta}</p>
              </div>
              
              <div className="space-y-2 mb-3">
                {p.alternativas.map((alt, altIndex) => (
                  <div
                    key={altIndex}
                    className={`p-3 rounded-xl ${
                      p.respostaCorreta === altIndex
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-white border border-[#E0E3E7]'
                    }`}
                  >
                    <small className={p.respostaCorreta === altIndex ? 'text-green-700' : 'text-[#1C1C1E]'}>
                      {String.fromCharCode(65 + altIndex)}) {alt}
                      {p.respostaCorreta === altIndex && ' ✓'}
                    </small>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E0E3E7]">
                <small className="text-[#9CA3AF]">💡 Explicação:</small>
                <small className="text-[#1C1C1E] block mt-1">
                  {p.explicacao}
                </small>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal de Sucesso */}
      <Modal
        isOpen={showSuccess}
        onClose={() => {}}
        title=""
      >
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h3 className="text-[#1C1C1E] mb-2">Quiz Gerado com Sucesso!</h3>
          <p className="text-[#9CA3AF]">
            O quiz "{quizData.tema}" com {questoesSelecionadas.length} questões foi publicado e já está disponível para os alunos da turma 7º Ano A.
          </p>
        </div>
      </Modal>
    </div>
  );
}
