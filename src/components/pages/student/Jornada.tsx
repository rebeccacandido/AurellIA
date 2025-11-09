import React, { useState } from 'react';
import { TopTabs } from '../../EDU/TopTabs';
import { AtividadeCard } from '../../EDU/Card/Atividade';
import { Modal } from '../../EDU/Modal';
import { Quiz } from '../../EDU/Quiz';
import { CoinsChip } from '../../EDU/CoinsChip';
import { Lock, CheckCircle } from 'lucide-react';

const disciplinas = [
  { id: 'portugues', label: 'Português' },
  { id: 'matematica', label: 'Matemática' },
  { id: 'ciencias', label: 'Ciências' },
  { id: 'historia', label: 'História' },
  { id: 'geografia', label: 'Geografia' }
];

// Perguntas para cada tema
const quizData: Record<string, any> = {
  portugues: {
    1: [
      { id: 1, question: 'Qual é a função do sujeito na oração?', options: ['Praticar a ação', 'Receber a ação', 'Modificar o verbo', 'Indicar tempo'], correctAnswer: 0 },
      { id: 2, question: 'O que é uma metáfora?', options: ['Comparação sem "como"', 'Exagero intencional', 'Repetição de sons', 'Inversão de termos'], correctAnswer: 0 },
      { id: 3, question: 'Qual é o plural de "cidadão"?', options: ['Cidadões', 'Cidadãos', 'Cidadães', 'Cidadans'], correctAnswer: 1 },
      { id: 4, question: 'O que é um adjetivo?', options: ['Palavra que indica ação', 'Palavra que qualifica o substantivo', 'Palavra que liga orações', 'Palavra que indica lugar'], correctAnswer: 1 },
      { id: 5, question: 'Qual é a função da vírgula?', options: ['Indicar pausa', 'Finalizar frase', 'Indicar pergunta', 'Indicar exclamação'], correctAnswer: 0 }
    ],
    2: [
      { id: 1, question: 'O que é uma metonímia?', options: ['Substituição de um termo por outro', 'Comparação direta', 'Repetição de palavras', 'Exagero'], correctAnswer: 0 },
      { id: 2, question: 'Qual figura de linguagem está em "Ele tem um coração de pedra"?', options: ['Metáfora', 'Metonímia', 'Hipérbole', 'Eufemismo'], correctAnswer: 0 },
      { id: 3, question: 'O que é uma onomatopeia?', options: ['Imitação de sons', 'Comparação', 'Repetição', 'Contradição'], correctAnswer: 0 },
      { id: 4, question: 'Em "O Brasil venceu a copa", qual figura foi usada?', options: ['Metonímia', 'Metáfora', 'Hipérbole', 'Ironia'], correctAnswer: 0 },
      { id: 5, question: 'O que é uma hipérbole?', options: ['Exagero intencional', 'Suavização', 'Comparação', 'Repetição'], correctAnswer: 0 }
    ],
    3: [
      { id: 1, question: 'O que é o predicado?', options: ['O que se diz sobre o sujeito', 'Quem pratica a ação', 'Palavra que modifica o verbo', 'Complemento do verbo'], correctAnswer: 0 },
      { id: 2, question: 'Qual é o objeto direto em "Maria comprou um livro"?', options: ['Maria', 'Comprou', 'Um livro', 'Não há'], correctAnswer: 2 },
      { id: 3, question: 'O que é um adjunto adverbial?', options: ['Termo que modifica o verbo', 'Termo que complementa o verbo', 'Termo que qualifica o substantivo', 'Termo que liga orações'], correctAnswer: 0 },
      { id: 4, question: 'Em "João deu flores a Maria", qual é o objeto indireto?', options: ['João', 'Flores', 'A Maria', 'Deu'], correctAnswer: 2 },
      { id: 5, question: 'O que é um aposto?', options: ['Termo que explica outro termo', 'Termo que complementa o verbo', 'Termo que modifica o verbo', 'Termo que liga orações'], correctAnswer: 0 }
    ]
  },
  matematica: {
    4: [
      { id: 1, question: 'Resolva: 2x + 5 = 15', options: ['x = 5', 'x = 10', 'x = 7', 'x = 3'], correctAnswer: 0 },
      { id: 2, question: 'Qual é o valor de x em: 3x - 6 = 12?', options: ['x = 4', 'x = 6', 'x = 8', 'x = 2'], correctAnswer: 1 },
      { id: 3, question: 'Resolva: x/2 = 8', options: ['x = 4', 'x = 16', 'x = 12', 'x = 8'], correctAnswer: 1 },
      { id: 4, question: 'Em 5x = 25, qual o valor de x?', options: ['x = 3', 'x = 5', 'x = 7', 'x = 20'], correctAnswer: 1 },
      { id: 5, question: 'Resolva: 4x + 8 = 32', options: ['x = 4', 'x = 6', 'x = 8', 'x = 10'], correctAnswer: 1 }
    ],
    5: [
      { id: 1, question: 'Qual a área de um quadrado de lado 5 cm?', options: ['10 cm²', '20 cm²', '25 cm²', '30 cm²'], correctAnswer: 2 },
      { id: 2, question: 'O perímetro de um retângulo 4x6 cm é:', options: ['20 cm', '24 cm', '10 cm', '16 cm'], correctAnswer: 0 },
      { id: 3, question: 'A área de um triângulo (base 6, altura 4) é:', options: ['10 cm²', '12 cm²', '24 cm²', '8 cm²'], correctAnswer: 1 },
      { id: 4, question: 'Qual o perímetro de um quadrado de lado 7 cm?', options: ['14 cm', '21 cm', '28 cm', '49 cm'], correctAnswer: 2 },
      { id: 5, question: 'A área de um círculo de raio 3 (π≈3) é aproximadamente:', options: ['9', '18', '27', '36'], correctAnswer: 2 }
    ],
    6: [
      { id: 1, question: 'Quanto é 1/2 + 1/4?', options: ['2/6', '3/4', '1/3', '2/4'], correctAnswer: 1 },
      { id: 2, question: 'Quanto é 2/3 × 3/2?', options: ['1', '6/6', '5/5', 'Todas corretas'], correctAnswer: 3 },
      { id: 3, question: 'Simplifique 4/8:', options: ['1/2', '2/4', '2/3', '3/6'], correctAnswer: 0 },
      { id: 4, question: 'Quanto é 3/5 - 1/5?', options: ['2/5', '4/10', '2/10', '4/5'], correctAnswer: 0 },
      { id: 5, question: 'Quanto é 1/3 de 12?', options: ['3', '4', '6', '9'], correctAnswer: 1 }
    ]
  },
  ciencias: {
    7: [
      { id: 1, question: 'Quantos planetas tem o Sistema Solar?', options: ['7', '8', '9', '10'], correctAnswer: 1 },
      { id: 2, question: 'Qual é o planeta mais próximo do Sol?', options: ['Vênus', 'Terra', 'Mercúrio', 'Marte'], correctAnswer: 2 },
      { id: 3, question: 'Qual é o maior planeta?', options: ['Saturno', 'Júpiter', 'Netuno', 'Urano'], correctAnswer: 1 },
      { id: 4, question: 'Qual planeta tem anéis visíveis?', options: ['Júpiter', 'Saturno', 'Urano', 'Netuno'], correctAnswer: 1 },
      { id: 5, question: 'Qual é o planeta vermelho?', options: ['Vênus', 'Júpiter', 'Marte', 'Mercúrio'], correctAnswer: 2 }
    ],
    8: [
      { id: 1, question: 'O que as plantas produzem na fotossíntese?', options: ['CO2', 'Oxigênio', 'Nitrogênio', 'Hidrogênio'], correctAnswer: 1 },
      { id: 2, question: 'Qual gás as plantas absorvem?', options: ['Oxigênio', 'CO2', 'Nitrogênio', 'Hélio'], correctAnswer: 1 },
      { id: 3, question: 'O que é necessário para fotossíntese?', options: ['Luz solar', 'Água', 'CO2', 'Todas'], correctAnswer: 3 },
      { id: 4, question: 'Onde ocorre a fotossíntese?', options: ['Raiz', 'Caule', 'Folhas', 'Flores'], correctAnswer: 2 },
      { id: 5, question: 'Qual pigmento capta a luz solar?', options: ['Clorofila', 'Caroteno', 'Xantofila', 'Melanina'], correctAnswer: 0 }
    ]
  },
  historia: {
    9: [
      { id: 1, question: 'Em que ano o Brasil foi descoberto?', options: ['1492', '1500', '1498', '1502'], correctAnswer: 1 },
      { id: 2, question: 'Quem descobriu o Brasil?', options: ['Colombo', 'Cabral', 'Vespúcio', 'Magalhães'], correctAnswer: 1 },
      { id: 3, question: 'Qual foi o primeiro produto explorado?', options: ['Ouro', 'Café', 'Pau-brasil', 'Açúcar'], correctAnswer: 2 },
      { id: 4, question: 'Que país colonizou o Brasil?', options: ['Espanha', 'Inglaterra', 'Portugal', 'França'], correctAnswer: 2 },
      { id: 5, question: 'Qual o ciclo econômico após o pau-brasil?', options: ['Café', 'Ouro', 'Açúcar', 'Borracha'], correctAnswer: 2 }
    ],
    10: [
      { id: 1, question: 'Onde começou a Revolução Industrial?', options: ['França', 'Alemanha', 'Inglaterra', 'EUA'], correctAnswer: 2 },
      { id: 2, question: 'Qual século ocorreu a Revolução Industrial?', options: ['XVII', 'XVIII', 'XIX', 'XX'], correctAnswer: 1 },
      { id: 3, question: 'Qual foi a primeira máquina importante?', options: ['Motor a vapor', 'Tear mecânico', 'Locomotiva', 'Telégrafo'], correctAnswer: 0 },
      { id: 4, question: 'O que caracteriza a Revolução Industrial?', options: ['Agricultura', 'Mecanização', 'Feudalismo', 'Escravidão'], correctAnswer: 1 },
      { id: 5, question: 'Qual foi o impacto social principal?', options: ['Êxodo rural', 'Nobreza', 'Feudalismo', 'Escravidão'], correctAnswer: 0 }
    ]
  },
  geografia: {
    11: [
      { id: 1, question: 'Qual clima é quente e úmido?', options: ['Árido', 'Tropical', 'Temperado', 'Polar'], correctAnswer: 1 },
      { id: 2, question: 'Qual bioma predomina no Norte do Brasil?', options: ['Cerrado', 'Caatinga', 'Amazônia', 'Pampa'], correctAnswer: 2 },
      { id: 3, question: 'Qual vegetação tem no semiárido?', options: ['Floresta', 'Caatinga', 'Mangue', 'Tundra'], correctAnswer: 1 },
      { id: 4, question: 'O que caracteriza clima equatorial?', options: ['Frio e seco', 'Quente e chuvoso', 'Temperado', 'Desértico'], correctAnswer: 1 },
      { id: 5, question: 'Qual bioma tem maior biodiversidade?', options: ['Cerrado', 'Pampa', 'Amazônia', 'Caatinga'], correctAnswer: 2 }
    ],
    12: [
      { id: 1, question: 'O que é um planalto?', options: ['Terreno elevado e plano', 'Terreno baixo', 'Montanha', 'Vale'], correctAnswer: 0 },
      { id: 2, question: 'Qual a forma de relevo mais baixa?', options: ['Montanha', 'Planície', 'Planalto', 'Serra'], correctAnswer: 1 },
      { id: 3, question: 'O que é uma depressão?', options: ['Terreno elevado', 'Terreno rebaixado', 'Montanha', 'Vale'], correctAnswer: 1 },
      { id: 4, question: 'Qual relevo predomina no litoral?', options: ['Montanha', 'Planalto', 'Planície', 'Serra'], correctAnswer: 2 },
      { id: 5, question: 'O que são as serras?', options: ['Montanhas em cadeia', 'Planícies', 'Vales', 'Depressões'], correctAnswer: 0 }
    ]
  }
};

const atividadesData = {
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
  const [activeTab, setActiveTab] = useState('portugues');
  const [selectedAtividade, setSelectedAtividade] = useState<any>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedScore, setCompletedScore] = useState(0);
  
  // Estado para controlar quais atividades foram concluídas (começar com a primeira desbloqueada)
  const [completedActivities, setCompletedActivities] = useState<Record<string, number[]>>({
    portugues: [],
    matematica: [],
    ciencias: [],
    historia: [],
    geografia: []
  });
  
  const handleAtividadeClick = (atividade: any, disciplina: string) => {
    // Verificar se a atividade está desbloqueada
    const atividades = atividadesData[disciplina as keyof typeof atividadesData];
    const atividadeIndex = atividades.findIndex(a => a.id === atividade.id);
    
    // Primeira atividade sempre desbloqueada
    if (atividadeIndex === 0) {
      setSelectedAtividade(atividade);
      setShowQuiz(true);
      return;
    }
    
    // Verificar se a atividade anterior foi concluída
    const previousActivityId = atividades[atividadeIndex - 1].id;
    if (completedActivities[disciplina].includes(previousActivityId)) {
      setSelectedAtividade(atividade);
      setShowQuiz(true);
    }
  };
  
  const handleQuizComplete = (score: number) => {
    setCompletedScore(score);
    setShowQuiz(false);
    
    if (score >= 60) {
      // Marcar atividade como concluída
      setCompletedActivities(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], selectedAtividade.id]
      }));
      setShowCompletionModal(true);
    } else {
      // Se não passou, pode tentar novamente
      setSelectedAtividade(null);
    }
  };
  
  const handleQuizCancel = () => {
    setShowQuiz(false);
    setSelectedAtividade(null);
  };
  
  const isActivityLocked = (atividade: any, disciplina: string) => {
    const atividades = atividadesData[disciplina as keyof typeof atividadesData];
    const atividadeIndex = atividades.findIndex(a => a.id === atividade.id);
    
    // Primeira atividade sempre desbloqueada
    if (atividadeIndex === 0) return false;
    
    // Verificar se a atividade anterior foi concluída
    const previousActivityId = atividades[atividadeIndex - 1].id;
    return !completedActivities[disciplina].includes(previousActivityId);
  };
  
  const isActivityCompleted = (atividadeId: number, disciplina: string) => {
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
        {selectedAtividade && (
          <Quiz
            questions={quizData[activeTab][selectedAtividade.id] || []}
            onComplete={handleQuizComplete}
            onCancel={handleQuizCancel}
            coins={selectedAtividade.coins}
          />
        )}
      </Modal>
      
      {/* Modal de Conclusão */}
      <Modal
        isOpen={showCompletionModal}
        onClose={() => {
          setShowCompletionModal(false);
          setSelectedAtividade(null);
        }}
        title="Parabéns! 🎉"
        actions={[
          {
            label: 'Continuar Estudando',
            onClick: () => {
              setShowCompletionModal(false);
              setSelectedAtividade(null);
            },
            variant: 'primary'
          }
        ]}
      >
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#AEC6FF] to-[#2D5BFF] rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-white" />
          </div>
          <div>
            <h3 className="text-[#1C1C1E] mb-2">Tema Concluído!</h3>
            <p className="text-[#9CA3AF]">Sua pontuação: {completedScore}%</p>
          </div>
          <div className="bg-[#FEF3C7] rounded-2xl p-4">
            <p className="text-[#9CA3AF] mb-2">Você ganhou:</p>
            <div className="flex justify-center">
              <CoinsChip amount={selectedAtividade?.coins || 0} size="large" />
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
