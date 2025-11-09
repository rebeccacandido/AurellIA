import React, { useState } from 'react';
import { TopTabs } from '../../EDU/TopTabs';
import { AtividadeCard } from '../../EDU/Card/Atividade';
import { Modal } from '../../EDU/Modal';
import { Quiz } from '../../EDU/Quiz';
import { CoinsChip } from '../../EDU/CoinsChip';
import { Button } from '../../EDU/Button';
import { Lock, CheckCircle } from 'lucide-react';
import { api, QuizAnswerPayload, QuizQuestion, QuizSubmissionResponse } from '../../../lib/api';
import { appConfig } from '../../../lib/config';
import { useStudent } from '../../../context/StudentContext';

type Disciplina = 'portugues' | 'matematica' | 'ciencias' | 'historia' | 'geografia';

interface Atividade {
  id: number;
  title: string;
  description: string;
  coins: number;
  quizId?: number;
}

const disciplinas: { id: Disciplina; label: string }[] = [
  { id: 'portugues', label: 'Português' },
  { id: 'matematica', label: 'Matemática' },
  { id: 'ciencias', label: 'Ciências' },
  { id: 'historia', label: 'História' },
  { id: 'geografia', label: 'Geografia' }
];

// Perguntas para cada tema
const atividadesData: Record<Disciplina, Atividade[]> = {
  portugues: [
    { id: 1, title: 'Interpretação de Texto', description: 'Responda 5 questões sobre gramática', coins: 120 },
    { id: 2, title: 'Figuras de Linguagem', description: 'Identifique metáforas e metonímias', coins: 150 },
    { id: 3, title: 'Análise Sintática', description: 'Classifique os termos da oração', coins: 200 }
  ],
  matematica: [
    { id: 4, title: 'Equações de 1º Grau', description: 'Resolva 5 equações', coins: 180 },
    { id: 5, title: 'Geometria Plana', description: 'Calcule áreas e perímetros', coins: 220 },
    { id: 6, title: 'Frações', description: 'Operações com frações', coins: 140 }
  ],
  ciencias: [
    { id: 7, title: 'Sistema Solar', description: 'Conheça os planetas', coins: 160 },
    { id: 8, title: 'Fotossíntese', description: 'Entenda o processo das plantas', coins: 190 }
  ],
  historia: [
    { id: 9, title: 'Brasil Colonial', description: 'Período colonial brasileiro', coins: 170 },
    { id: 10, title: 'Revolução Industrial', description: 'Transformações na Europa', coins: 210 }
  ],
  geografia: [
    { id: 11, title: 'Clima e Vegetação', description: 'Tipos de clima no Brasil', coins: 150 },
    { id: 12, title: 'Relevo Brasileiro', description: 'Formas de relevo', coins: 180 }
  ]
};

export function StudentJornada() {
  const [activeTab, setActiveTab] = useState<Disciplina>('portugues');
  const [selectedAtividade, setSelectedAtividade] = useState<Atividade | null>(null);
  const [selectedDisciplina, setSelectedDisciplina] = useState<Disciplina | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedScore, setCompletedScore] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [lastResultMessage, setLastResultMessage] = useState('');
  const [completedActivity, setCompletedActivity] = useState<Atividade | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Record<Disciplina, number[]>>({
    portugues: [],
    matematica: [],
    ciencias: [],
    historia: [],
    geografia: []
  });

  const studentId = appConfig.defaultStudentId;
  const { updateCoins } = useStudent();
  
  const startQuiz = async (atividade: Atividade, disciplina: Disciplina) => {
    const quizId = atividade.quizId ?? atividade.id;
    setSelectedDisciplina(disciplina);
    setSelectedAtividade(atividade);
    setShowQuiz(true);
    setQuizQuestions([]);
    setQuizError(null);
    setIsQuizLoading(true);

    try {
      const quiz = await api.getQuiz(quizId);
      if (!quiz.questions || quiz.questions.length === 0) {
        setQuizError('Este quiz ainda não possui questões cadastradas.');
        return;
      }
      setQuizQuestions(quiz.questions);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Não foi possível carregar as questões deste quiz.';
      setQuizError(message);
    } finally {
      setIsQuizLoading(false);
    }
  };

  const handleAtividadeClick = (atividade: Atividade, disciplina: Disciplina) => {
    const atividades = atividadesData[disciplina];
    const atividadeIndex = atividades.findIndex(a => a.id === atividade.id);

    if (atividadeIndex === 0) {
      startQuiz(atividade, disciplina);
      return;
    }

    const previousActivityId = atividades[atividadeIndex - 1].id;
    if (completedActivities[disciplina].includes(previousActivityId)) {
      startQuiz(atividade, disciplina);
    }
  };
  
  const handleQuizComplete = (result: QuizSubmissionResponse) => {
    setCompletedScore(result.score_percent);
    setEarnedCoins(result.coins_earned);
    setLastResultMessage(result.message);
    setShowQuiz(false);
    setQuizQuestions([]);
    setQuizError(null);
    updateCoins(result.total_coins);

    if (selectedAtividade && selectedDisciplina && result.score_percent >= 60) {
      setCompletedActivities(prev => ({
        ...prev,
        [selectedDisciplina]: [...prev[selectedDisciplina], selectedAtividade.id]
      }));
      setCompletedActivity(selectedAtividade);
      setShowCompletionModal(true);
    } else {
      setSelectedAtividade(null);
      setSelectedDisciplina(null);
    }
  };
  
  const handleQuizCancel = () => {
    setShowQuiz(false);
    setSelectedAtividade(null);
    setSelectedDisciplina(null);
    setQuizQuestions([]);
    setQuizError(null);
  };

  const handleQuizSubmit = (answers: QuizAnswerPayload[]) => {
    if (!selectedAtividade) {
      return Promise.reject(new Error('Nenhum quiz selecionado.'));
    }

    const quizId = selectedAtividade.quizId ?? selectedAtividade.id;
    return api.submitQuiz({
      student_id: studentId,
      quiz_id: quizId,
      answers,
    });
  };

  const closeCompletionModal = () => {
    setShowCompletionModal(false);
    setSelectedAtividade(null);
    setSelectedDisciplina(null);
    setCompletedActivity(null);
  };
  
  const isActivityLocked = (atividade: Atividade, disciplina: Disciplina) => {
    const atividades = atividadesData[disciplina];
    const atividadeIndex = atividades.findIndex(a => a.id === atividade.id);
    
    // Primeira atividade sempre desbloqueada
    if (atividadeIndex === 0) return false;
    
    // Verificar se a atividade anterior foi concluída
    const previousActivityId = atividades[atividadeIndex - 1].id;
    return !completedActivities[disciplina].includes(previousActivityId);
  };
  
  const isActivityCompleted = (atividadeId: number, disciplina: Disciplina) => {
    return completedActivities[disciplina].includes(atividadeId);
  };
  
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div>
        <h2 className="text-[#1C1C1E] mb-2">Jornada de Aprendizagem</h2>
        <p className="text-[#9CA3AF]">Complete os temas em sequência</p>
      </div>
      
      <TopTabs 
        tabs={disciplinas} 
        active={activeTab} 
        onSelect={setActiveTab} 
      />
      
      <div className="space-y-4">
        {atividadesData[activeTab as keyof typeof atividadesData].map((atividade) => {
          const isLocked = isActivityLocked(atividade, activeTab);
          const isCompleted = isActivityCompleted(atividade.id, activeTab);
          
          return (
            <div key={atividade.id} className="relative">
              <AtividadeCard
                title={atividade.title}
                description={atividade.description}
                coins={atividade.coins}
                onClick={() => handleAtividadeClick(atividade, activeTab)}
                disabled={isLocked}
              />
              {isLocked && (
                <div className="absolute inset-0 bg-white/80 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <Lock size={32} className="text-[#9CA3AF] mx-auto mb-2" />
                    <p className="text-[#9CA3AF]">Complete o tema anterior</p>
                  </div>
                </div>
              )}
              {isCompleted && (
                <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2">
                  <CheckCircle size={20} className="text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Modal de Quiz */}
      <Modal
        isOpen={showQuiz && !!selectedAtividade}
        onClose={handleQuizCancel}
        title={selectedAtividade?.title || ''}
      >
        {isQuizLoading && (
          <div className="py-10 text-center text-[#9CA3AF]">
            Carregando perguntas do quiz...
          </div>
        )}

        {quizError && (
          <div className="space-y-4 text-center">
            <p className="text-[#9CA3AF]">{quizError}</p>
            <Button variant="primary" onClick={handleQuizCancel} fullWidth>
              Fechar
            </Button>
          </div>
        )}

        {!isQuizLoading && !quizError && selectedAtividade && quizQuestions.length > 0 && (
          <Quiz
            questions={quizQuestions}
            onComplete={handleQuizComplete}
            onCancel={handleQuizCancel}
            onSubmitAnswers={handleQuizSubmit}
            coins={selectedAtividade.coins}
          />
        )}

        {!isQuizLoading && !quizError && quizQuestions.length === 0 && (
          <div className="py-8 text-center text-[#9CA3AF]">
            Nenhuma questão disponível neste momento.
          </div>
        )}
      </Modal>
      
      {/* Modal de Conclusão */}
      <Modal
        isOpen={showCompletionModal}
        onClose={closeCompletionModal}
        title="Parabéns! 🎉"
        actions={[
          {
            label: 'Continuar Estudando',
            onClick: closeCompletionModal,
            variant: 'primary'
          }
        ]}
      >
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#AEC6FF] to-[#2D5BFF] rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-white" />
          </div>
          <div>
            <h3 className="text-[#1C1C1E] mb-2">
              {completedActivity ? `${completedActivity.title} concluído!` : 'Tema Concluído!'}
            </h3>
            <p className="text-[#9CA3AF]">
              {lastResultMessage || `Sua pontuação: ${completedScore}%`}
            </p>
          </div>
          <div className="bg-[#FEF3C7] rounded-2xl p-4">
            <p className="text-[#9CA3AF] mb-2">Você ganhou:</p>
            <div className="flex justify-center">
              <CoinsChip amount={earnedCoins || completedActivity?.coins || 0} size="large" />
            </div>
          </div>
          <div className="p-4 bg-[#F6F7F9] rounded-2xl">
            <p className="text-[#2D5BFF]">🔓 Próximo tema desbloqueado!</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
