import { CoinsChip } from '../../EDU/CoinsChip';
import { ProgressBar } from '../../EDU/ProgressBar';
import { Badge } from '../../EDU/Badge';
import { Button } from '../../EDU/Button';
import { ArrowRight } from 'lucide-react';
import logo from 'figma:asset/09f7ee12a8c5086d31827a15c309403f49a5355c.png';

interface StudentHomeProps {
  onNavigate: (page: string) => void;
}

export function StudentHome({ onNavigate }: StudentHomeProps) {
  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1C1C1E]">Olá, Marina! 👋</h2>
          <p className="text-[#9CA3AF]">Pronta para aprender hoje?</p>
        </div>
        <img src={logo} alt="AurellIA" className="w-20" />
      </div>
      
      {/* Botão Iniciar Jornada */}
      <Button 
        variant="primary" 
        fullWidth 
        onClick={() => onNavigate('jornada')}
      >
        Iniciar Jornada
        <ArrowRight size={18} />
      </Button>
      
      {/* Saldo de Moedas */}
      <div className="bg-white rounded-3xl p-5 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#9CA3AF] mb-2">Saldo de Moedas</p>
            <CoinsChip amount={2450} size="large" />
          </div>
          <div className="text-6xl">💰</div>
        </div>
        <Button 
          variant="primary" 
          fullWidth 
          onClick={() => onNavigate('marketplace')}
        >
          Usar no Marketplace
          <ArrowRight size={18} />
        </Button>
      </div>
      
      {/* Quizzes Respondidos */}
      <div className="bg-white rounded-3xl p-5 card-shadow space-y-4">
        <h3 className="text-[#1C1C1E]">Quizzes Respondidos</h3>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[#2D5BFF]">12</h2>
            <p className="text-[#9CA3AF]">quizzes completos</p>
          </div>
          <div className="text-5xl">📝</div>
        </div>
      </div>
      
      {/* Posição */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#AEC6FF] to-[#2D5BFF] rounded-3xl p-5 text-white">
          <p className="mb-2 text-white/80">Escola</p>
          <h2 className="text-white">#12</h2>
          <small className="text-white/80">de 245 alunos</small>
        </div>
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl p-5 text-white">
          <p className="mb-2 text-white/80">Turma</p>
          <h2 className="text-white">#3</h2>
          <small className="text-white/80">de 32 alunos</small>
        </div>
      </div>
      
      {/* Conquistas */}
      <div className="bg-white rounded-3xl p-5 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1C1C1E]">Conquistas Recentes</h3>
          <button className="text-[#2D5BFF]">Ver todas</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          <Badge title="Explorador" icon="🗺️" />
          <Badge title="Matemático" icon="🔢" />
          <Badge title="Leitor" icon="📚" />
          <Badge title="Cientista" icon="🔬" unlocked={false} />
          <Badge title="Historiador" icon="📜" unlocked={false} />
        </div>
      </div>
      
      {/* Atalhos */}
      <div className="space-y-3">
        <Button 
          variant="secondary" 
          fullWidth 
          onClick={() => onNavigate('ranking')}
        >
          Ver Ranking
        </Button>
      </div>
    </div>
  );
}
