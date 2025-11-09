import React, { useState } from 'react';
import { RecompensaCard } from '../../EDU/Card/Recompensa';
import { CoinsChip } from '../../EDU/CoinsChip';
import { Modal } from '../../EDU/Modal';
import { CheckCircle } from 'lucide-react';

const recompensasPorCategoria = {
  alimenticio: [
    {
      id: 2,
      title: 'Cesta Básica Solidária',
      description: 'Troque por uma cesta básica completa para sua família',
      price: 2000,
      icon: '🛒'
    },
    {
      id: 3,
      title: 'Cesta Pedagógica',
      description: 'Alimentos + livro infantil e materiais escolares',
      price: 2500,
      icon: '📚'
    }
  ],
  higiene: [
    {
      id: 4,
      title: 'Kit de Higiene',
      description: 'Kit completo de produtos de higiene pessoal',
      price: 1200,
      icon: '🧴'
    }
  ],
  educacao: [
    {
      id: 9,
      title: 'Kit de Estudos Avançado',
      description: 'Materiais premium: calculadora científica, livros e cadernos',
      price: 3000,
      icon: '🎒'
    },
    {
      id: 8,
      title: 'Certificado de Mérito',
      description: 'Certificado oficial de reconhecimento acadêmico',
      price: 1500,
      icon: '📜'
    }
  ],
  reconhecimento: [
    {
      id: 5,
      title: 'Medalha Simbólica: Explorador',
      description: 'Medalha física comemorativa do nível Explorador',
      price: 800,
      icon: '🏅'
    },
    {
      id: 6,
      title: 'Medalha: Guardião da Matemática',
      description: 'Reconhecimento especial em Matemática',
      price: 1000,
      icon: '🔢'
    },
    {
      id: 7,
      title: 'Avatar Digital Exclusivo',
      description: 'Desbloqueie avatares e temas especiais para seu perfil',
      price: 600,
      icon: '👤'
    }
  ],
  doacao: [
    {
      id: 1,
      title: 'Doação Solidária Reversa',
      description: 'Doe suas moedas para formar cestas básicas para famílias necessitadas',
      price: 500,
      icon: '🤝'
    }
  ]
};

const categoriaLabels = {
  alimenticio: 'Alimentício',
  higiene: 'Higiene',
  educacao: 'Educação',
  reconhecimento: 'Reconhecimento',
  doacao: 'Doação Solidária'
};

export function StudentMarketplace() {
  const [selectedRecompensa, setSelectedRecompensa] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [saldoAtual, setSaldoAtual] = useState(2450);
  const [codigoResgate, setCodigoResgate] = useState('');
  
  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };
  
  const handleTrocar = () => {
    if (selectedRecompensa && saldoAtual >= selectedRecompensa.price) {
      setSaldoAtual(saldoAtual - selectedRecompensa.price);
      setCodigoResgate(generateCode());
      setSelectedRecompensa(null);
      setShowConfirmation(true);
    }
  };
  
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1C1C1E] mb-2">Marketplace</h2>
          <p className="text-[#9CA3AF]">Troque suas moedas por recompensas</p>
        </div>
        <CoinsChip amount={saldoAtual} size="large" />
      </div>
      
      <div className="space-y-6">
        {Object.keys(recompensasPorCategoria).map((categoria) => (
          <div key={categoria}>
            <h3 className="text-[#1C1C1E] mb-3">{categoriaLabels[categoria]}</h3>
            <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
              <div className="flex gap-4 pb-2">
                {recompensasPorCategoria[categoria].map((recompensa) => (
                  <div key={recompensa.id} className="flex-shrink-0 w-[280px]">
                    <RecompensaCard
                      title={recompensa.title}
                      description={recompensa.description}
                      price={recompensa.price}
                      icon={<div className="text-6xl">{recompensa.icon}</div>}
                      onClick={() => setSelectedRecompensa(recompensa)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal de Detalhes */}
      <Modal
        isOpen={!!selectedRecompensa}
        onClose={() => setSelectedRecompensa(null)}
        title={selectedRecompensa?.title || ''}
        actions={[
          {
            label: 'Cancelar',
            onClick: () => setSelectedRecompensa(null),
            variant: 'ghost'
          },
          {
            label: 'Trocar Agora',
            onClick: handleTrocar,
            variant: 'primary'
          }
        ]}
      >
        {selectedRecompensa && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-8xl mb-4">{selectedRecompensa.icon}</div>
              <p className="text-[#9CA3AF] mb-4">{selectedRecompensa.description}</p>
            </div>
            
            <div className="bg-[#F6F7F9] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span>Preço</span>
                <CoinsChip amount={selectedRecompensa.price} />
              </div>
              <div className="flex items-center justify-between">
                <span>Saldo após troca</span>
                <CoinsChip amount={saldoAtual - selectedRecompensa.price} />
              </div>
            </div>
            
            {saldoAtual < selectedRecompensa.price && (
              <div className="p-4 bg-red-50 rounded-2xl text-red-600 text-center">
                Você não tem moedas suficientes para esta recompensa
              </div>
            )}
          </div>
        )}
      </Modal>
      
      {/* Modal de Confirmação */}
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Troca Realizada! 🎉"
        actions={[
          {
            label: 'Continuar Explorando',
            onClick: () => setShowConfirmation(false),
            variant: 'primary'
          }
        ]}
      >
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h3 className="text-[#1C1C1E]">Sucesso!</h3>
          <p className="text-[#9CA3AF]">Apresente o código abaixo na secretaria para resgatar sua recompensa.</p>
          
          {/* Código de Resgate em Destaque */}
          <div className="p-6 bg-gradient-to-br from-[#2D5BFF] to-[#1E40AF] rounded-2xl">
            <small className="text-white/80 block mb-2">Código de Resgate</small>
            <p className="text-white text-3xl tracking-widest mb-2">{codigoResgate}</p>
            <small className="text-white/80">Anote ou tire um print desta tela</small>
          </div>
          
          <div className="p-4 bg-[#F6F7F9] rounded-2xl">
            <div className="flex items-center justify-between">
              <span>Novo saldo</span>
              <CoinsChip amount={saldoAtual} size="large" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
