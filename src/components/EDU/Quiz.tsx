import React, { useState } from 'react';
import { Button } from './Button';
import { CoinsChip } from './CoinsChip';
import { CheckCircle, ChevronRight, Loader2, XCircle } from 'lucide-react';
import { QuizAnswerPayload, QuizQuestion, QuizSubmissionResponse } from '../../lib/api';

interface QuizProps {
  questions: QuizQuestion[];
  coins: number;
  onCancel: () => void;
  onSubmitAnswers: (answers: QuizAnswerPayload[]) => Promise<QuizSubmissionResponse>;
  onComplete: (result: QuizSubmissionResponse) => void;
}

export function Quiz({ questions, coins, onCancel, onSubmitAnswers, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<number | null>(null);
  const [selectedAlternativeIndex, setSelectedAlternativeIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuizAnswerPayload[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<QuizSubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!questions.length) {
    return (
      <div className="text-center text-[#9CA3AF] py-6">
        Quiz ainda não disponível.
      </div>
    );
  }

  const question = questions[currentQuestion];
  const alternatives = question.alternatives ?? [];
  const progressPercent = Math.round((currentQuestion / questions.length) * 100);
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSelectAnswer = (alternativeId: number, index: number) => {
    setSelectedAlternativeId(alternativeId);
    setSelectedAlternativeIndex(index);
    setError(null);
  };

  const submitAnswers = async (finalAnswers: QuizAnswerPayload[]) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await onSubmitAnswers(finalAnswers);
      setResult(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível enviar o quiz.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (selectedAlternativeId === null || isSubmitting) return;

    const currentAnswer: QuizAnswerPayload = {
      question_id: question.id,
      alternative_id: selectedAlternativeId,
    };

    const updatedAnswers = [...answers, currentAnswer];

    if (isLastQuestion) {
      await submitAnswers(updatedAnswers);
      return;
    }

    setAnswers(updatedAnswers);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAlternativeId(null);
    setSelectedAlternativeIndex(null);
  };

  if (result) {
    const passed = result.score_percent >= 60;

    return (
      <div className="space-y-6 text-center">
        <div
          className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
            passed
              ? 'bg-gradient-to-br from-green-400 to-green-600'
              : 'bg-gradient-to-br from-red-400 to-red-600'
          }`}
        >
          {passed ? (
            <CheckCircle size={48} className="text-white" />
          ) : (
            <XCircle size={48} className="text-white" />
          )}
        </div>

        <div>
          <h3 className="text-[#1C1C1E] mb-2">
            {passed ? 'Parabéns! 🎉' : 'Continue praticando! 💪'}
          </h3>
          <p className="text-[#9CA3AF]">{result.message}</p>
        </div>

        <div className="bg-[#F6F7F9] rounded-2xl p-6">
          <div className="text-6xl mb-2">{result.score_percent}%</div>
          <p className="text-[#9CA3AF]">
            Você acertou {result.correct_answers} de {result.total_questions} questões
          </p>
        </div>

        {result.coins_earned > 0 && (
          <div className="bg-[#FEF3C7] rounded-2xl p-4">
            <p className="text-[#9CA3AF] mb-2">Você ganhou:</p>
            <div className="flex justify-center">
              <CoinsChip amount={result.coins_earned || coins} size="large" />
            </div>
          </div>
        )}

        <Button variant="primary" fullWidth onClick={() => onComplete(result)}>
          Continuar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#9CA3AF]">
            Questão {currentQuestion + 1} de {questions.length}
          </span>
          <span className="text-[#2D5BFF]">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-[#E0E3E7] rounded-full overflow-hidden">
          <div
            className="h-full gradient-bg rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="bg-[#F6F7F9] rounded-2xl p-6">
        <h3 className="text-[#1C1C1E]">{question.content}</h3>
      </div>

      <div className="space-y-3">
        {alternatives.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleSelectAnswer(option.id, index)}
            className={`w-full p-4 rounded-2xl text-left transition-all ${
              selectedAlternativeIndex === index
                ? 'bg-[#2D5BFF] text-white'
                : 'bg-white text-[#1C1C1E] hover:bg-[#F6F7F9]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAlternativeIndex === index
                    ? 'border-white bg-white'
                    : 'border-[#E0E3E7]'
                }`}
              >
                {selectedAlternativeIndex === index && (
                  <div className="w-3 h-3 rounded-full bg-[#2D5BFF]" />
                )}
              </div>
              <span>{option.content}</span>
            </div>
          </button>
        ))}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 text-red-600 text-center border border-red-100">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          className="flex-1"
          state={selectedAlternativeId === null || isSubmitting ? 'disabled' : 'default'}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Enviando...
            </>
          ) : (
            <>
              {isLastQuestion ? 'Enviar' : 'Próxima'}
              <ChevronRight size={18} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
