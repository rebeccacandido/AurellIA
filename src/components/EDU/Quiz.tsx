import React, { useState } from 'react';
import { Button } from './Button';
import { CoinsChip } from './CoinsChip';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onCancel: () => void;
  coins: number;
}

export function Quiz({ questions, onComplete, onCancel, coins }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleSelectAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz finalizado
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    // Adiciona a última resposta
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      correct++;
    }
    return Math.round((correct / questions.length) * 100);
  };

  const handleFinish = () => {
    const score = calculateScore();
    onComplete(score);
  };

  if (showResult) {
    const score = calculateScore();
    const passed = score >= 60;

    return (
      <div className="space-y-6 text-center">
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
          passed ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-red-400 to-red-600'
        }`}>
          {passed ? (
            <CheckCircle size={48} className="text-white" />
          ) : (
            <XCircle size={48} className="text-white" />
          )}
        </div>
        
        <div>
          <h3 className="text-[#1C1C1E] mb-2">
            {passed ? 'Parabéns! 🎉' : 'Quase lá! 💪'}
          </h3>
          <p className="text-[#9CA3AF]">
            Você acertou {answers.filter((ans, idx) => ans === questions[idx].correctAnswer).length + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)} de {questions.length} questões
          </p>
        </div>

        <div className="bg-[#F6F7F9] rounded-2xl p-6">
          <div className="text-6xl mb-2">{score}%</div>
          <p className="text-[#9CA3AF]">Pontuação final</p>
        </div>

        {passed && (
          <div className="bg-[#FEF3C7] rounded-2xl p-4">
            <p className="text-[#9CA3AF] mb-2">Você ganhou:</p>
            <div className="flex justify-center">
              <CoinsChip amount={coins} size="large" />
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button variant="primary" fullWidth onClick={handleFinish}>
            {passed ? 'Continuar' : 'Voltar'}
          </Button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#9CA3AF]">Questão {currentQuestion + 1} de {questions.length}</span>
          <span className="text-[#2D5BFF]">{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-[#E0E3E7] rounded-full overflow-hidden">
          <div 
            className="h-full gradient-bg rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-[#F6F7F9] rounded-2xl p-6">
        <h3 className="text-[#1C1C1E]">{question.question}</h3>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(index)}
            className={`w-full p-4 rounded-2xl text-left transition-all ${
              selectedAnswer === index
                ? 'bg-[#2D5BFF] text-white'
                : 'bg-white text-[#1C1C1E] hover:bg-[#F6F7F9]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === index
                  ? 'border-white bg-white'
                  : 'border-[#E0E3E7]'
              }`}>
                {selectedAnswer === index && (
                  <div className="w-3 h-3 rounded-full bg-[#2D5BFF]" />
                )}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="ghost" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="flex-1"
        >
          {currentQuestion < questions.length - 1 ? 'Próxima' : 'Finalizar'}
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}