import React, { useEffect, useMemo, useState } from 'react';
import { TopTabs } from '../../EDU/TopTabs';
import { AtividadeCard } from '../../EDU/Card/Atividade';
import { Modal } from '../../EDU/Modal';
import { Quiz } from '../../EDU/Quiz';
import { CoinsChip } from '../../EDU/CoinsChip';
import { Button } from '../../EDU/Button';
import { CheckCircle } from 'lucide-react';
import { api, Discipline, QuizAnswerPayload, QuizQuestion, QuizSubmissionResponse, QuizSummary } from '../../../lib/api';
import { appConfig } from '../../../lib/config';

type QuizActivity = QuizSummary & { coins: number };

export function StudentJornada() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [selectedQuiz, setSelectedQuiz] = useState<QuizActivity | null>(null);
  const [selectedDisciplina, setSelectedDisciplina] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [isLoadingDisciplines, setIsLoadingDisciplines] = useState(true);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [quizzesByDiscipline, setQuizzesByDiscipline] = useState<Record<string, QuizSummary[]>>({});
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedScore, setCompletedScore] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [lastResultMessage, setLastResultMessage] = useState('');
  const [completedActivities, setCompletedActivities] = useState<Record<string, number[]>>({});

  const studentId = appConfig.defaultStudentId;

  const tabs = useMemo(
    () => disciplines.map((discipline) => ({ id: String(discipline.id), label: discipline.name })),
    [disciplines]
  );

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const data = await api.listDisciplines();
        setDisciplines(data);
        if (data.length > 0) {
          const firstId = String(data[0].id);
          setActiveTab(firstId);
          await fetchQuizzesForDiscipline(firstId);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Não foi possível carregar as disciplinas.';
        setLoadError(message);
      } finally {
        setIsLoadingDisciplines(false);
      }
    };

    fetchDisciplines();
  }, []);

  const fetchQuizzesForDiscipline = async (disciplineId: string) => {
    setIsLoadingQuizzes(true);
    setLoadError(null);
    try {
      const quizzes = await api.listQuizzes({ disciplineId: Number(disciplineId) });
      setQuizzesByDiscipline((prev) => ({
        ...prev,
        [disciplineId]: quizzes,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível carregar os quizzes.';
      setLoadError(message);
    } finally {
      setIsLoadingQuizzes(false);
    }
  };

  const handleTabChange = async (tabId: string) => {
    setActiveTab(tabId);
    if (!quizzesByDiscipline[tabId]) {
      await fetchQuizzesForDiscipline(tabId);
    }
  };

  const startQuiz = async (quizSummary: QuizSummary, coinsReward: number) => {
    setSelectedDisciplina(String(quizSummary.discipline_id));
    setSelectedQuiz({ ...quizSummary, coins: coinsReward });
    setShowQuiz(true);
    setQuizQuestions([]);
    setQuizError(null);
    setIsQuizLoading(true);

    try {
      const quiz = await api.getQuiz(quizSummary.id);
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

  const handleSelectQuiz = (quiz: QuizSummary) => {
    const coinsReward = Math.max(quiz.questions_count, 1) * 20;
    startQuiz(quiz, coinsReward);
  };
  
  const handleQuizComplete = (result: QuizSubmissionResponse) => {
    setCompletedScore(result.score_percent);
    setEarnedCoins(result.coins_earned);
    setLastResultMessage(result.message);
    setShowQuiz(false);
    setQuizQuestions([]);
    setQuizError(null);
    const disciplineKey = selectedDisciplina ?? activeTab;
    setCompletedActivities((prev) => ({
      ...prev,
      [disciplineKey]: [...(prev[disciplineKey] || []), result.quiz_id],
    }));

    if (selectedDisciplina && result.score_percent >= 60) {
      setShowCompletionModal(true);
    } else {
      setSelectedQuiz(null);
      setSelectedDisciplina(null);
    }
  };
  
  const handleQuizCancel = () => {
    setShowQuiz(false);
    setSelectedQuiz(null);
    setSelectedDisciplina(null);
    setQuizQuestions([]);
    setQuizError(null);
  };

  const handleQuizSubmit = (answers: QuizAnswerPayload[]) => {
    if (!selectedQuiz) {
      return Promise.reject(new Error('Nenhum quiz selecionado.'));
    }

    return api.submitQuiz({
      student_id: studentId,
      quiz_id: selectedQuiz.id,
      answers,
    });
  };

  const closeCompletionModal = () => {
    setShowCompletionModal(false);
    setSelectedQuiz(null);
    setSelectedDisciplina(null);
  };
  
  const activities = useMemo(() => {
    if (!activeTab) return [];
    const quizzes = quizzesByDiscipline[activeTab] || [];
    return quizzes.map((quiz) => ({
      ...quiz,
      coins: Math.max(quiz.questions_count, 1) * 20,
    }));
  }, [activeTab, quizzesByDiscipline]);
  
  const isActivityCompleted = (quizId: number, disciplineId: string) => {
    return (completedActivities[disciplineId] || []).includes(quizId);
  };
  
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div>
        <h2 className="text-[#1C1C1E] mb-2">Jornada de Aprendizagem</h2>
        <p className="text-[#9CA3AF]">Complete os temas em sequência</p>
      </div>
      
      {isLoadingDisciplines ? (
        <div className="text-center text-[#9CA3AF] py-12">Carregando disciplinas...</div>
      ) : disciplines.length === 0 ? (
        <div className="text-center text-[#9CA3AF] py-12">
          Nenhuma disciplina disponível no momento.
        </div>
      ) : (
        <>
          <TopTabs 
            tabs={tabs} 
            active={activeTab} 
            onSelect={handleTabChange} 
          />
          
          {loadError && (
            <div className="p-4 bg-red-50 rounded-2xl text-red-600 border border-red-100">
              {loadError}
            </div>
          )}
      
          <div className="space-y-4">
            {isLoadingQuizzes ? (
              <div className="text-center text-[#9CA3AF] py-12">
                Carregando quizzes desta disciplina...
              </div>
            ) : activities.length === 0 ? (
              <div className="text-center text-[#9CA3AF] py-12">
                Nenhum quiz disponível para esta disciplina ainda.
              </div>
            ) : (
              activities.map((atividade) => {
                const isCompleted = isActivityCompleted(atividade.id, activeTab);
                
                return (
                  <div key={atividade.id} className="relative">
                    <AtividadeCard
                      title={atividade.title}
                      description={atividade.description}
                      coins={atividade.coins}
                      onClick={() => handleSelectQuiz(atividade)}
                    />
                    {isCompleted && (
                      <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2">
                        <CheckCircle size={20} className="text-white" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
      
      {/* Modal de Quiz */}
      <Modal
        isOpen={showQuiz && !!selectedQuiz}
        onClose={handleQuizCancel}
        title={selectedQuiz?.title || ''}
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

        {!isQuizLoading && !quizError && selectedQuiz && quizQuestions.length > 0 && (
          <Quiz
            questions={quizQuestions}
            onComplete={handleQuizComplete}
            onCancel={handleQuizCancel}
            onSubmitAnswers={handleQuizSubmit}
            coins={selectedQuiz.coins}
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
              {selectedQuiz ? `${selectedQuiz.title} concluído!` : 'Tema Concluído!'}
            </h3>
            <p className="text-[#9CA3AF]">
              {lastResultMessage || `Sua pontuação: ${completedScore}%`}
            </p>
          </div>
          <div className="bg-[#FEF3C7] rounded-2xl p-4">
            <p className="text-[#9CA3AF] mb-2">Você ganhou:</p>
            <div className="flex justify-center">
              <CoinsChip amount={earnedCoins || selectedQuiz?.coins || 0} size="large" />
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
