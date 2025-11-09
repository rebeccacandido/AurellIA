import React, { useState } from 'react';
import { Splash } from './components/pages/Splash';
import { Onboarding } from './components/pages/Onboarding';
import { Login } from './components/pages/Login';
import { BottomNav } from './components/EDU/BottomNav';

// Student Pages
import { StudentHome } from './components/pages/student/Home';
import { StudentJornada } from './components/pages/student/Jornada';
import { StudentMarketplace } from './components/pages/student/Marketplace';
import { StudentRanking } from './components/pages/student/Ranking';
import { StudentPerfil } from './components/pages/student/Perfil';

// Teacher Pages
import { TeacherIndicadores } from './components/pages/teacher/Indicadores';
import { TeacherRanking } from './components/pages/teacher/Ranking';
import { TeacherTurmas } from './components/pages/teacher/Turmas';
import { TeacherPerfil } from './components/pages/teacher/Perfil';
import { TeacherCriarQuiz } from './components/pages/teacher/CriarQuiz';

// Manager Pages
import { ManagerIndicadores } from './components/pages/manager/Indicadores';
import { ManagerRankingInstitucional } from './components/pages/manager/RankingInstitucional';
import { ManagerRelatoriosIA } from './components/pages/manager/RelatoriosIA';
import { ManagerPerfil } from './components/pages/manager/Perfil';

import { Home, Map, ShoppingBag, Trophy, BarChart3, Users, FileText, UserCircle } from 'lucide-react';

type AppFlow = 'splash' | 'onboarding' | 'login' | 'app';
type Role = 'student' | 'teacher' | 'manager' | null;

export default function App() {
  const [flow, setFlow] = useState<AppFlow>('splash');
  const [role, setRole] = useState<Role>(null);
  const [activePage, setActivePage] = useState<string>('home');

  // Navigation items por papel
  const studentNavItems = [
    { id: 'home', label: 'Início', icon: <Home size={24} /> },
    { id: 'jornada', label: 'Jornada', icon: <Map size={24} /> },
    { id: 'marketplace', label: 'Marketplace', icon: <ShoppingBag size={24} /> },
    { id: 'ranking', label: 'Ranking', icon: <Trophy size={24} /> },
    { id: 'perfil', label: 'Perfil', icon: <UserCircle size={24} /> }
  ];

  const teacherNavItems = [
    { id: 'indicadores', label: 'Indicadores', icon: <BarChart3 size={24} /> },
    { id: 'turmas', label: 'Turmas', icon: <Users size={24} /> },
    { id: 'ranking', label: 'Ranking', icon: <Trophy size={24} /> },
    { id: 'perfil', label: 'Perfil', icon: <UserCircle size={24} /> }
  ];

  const managerNavItems = [
    { id: 'indicadores', label: 'Indicadores', icon: <BarChart3 size={24} /> },
    { id: 'ranking', label: 'Ranking', icon: <Trophy size={24} /> },
    { id: 'relatorios', label: 'Relatórios IA', icon: <FileText size={24} /> },
    { id: 'perfil', label: 'Perfil', icon: <UserCircle size={24} /> }
  ];

  // Handlers de navegação
  const handleSplashComplete = () => {
    setFlow('onboarding');
  };

  const handleOnboardingComplete = () => {
    setFlow('login');
  };
  
  const handleBackToOnboarding = () => {
    setFlow('onboarding');
  };

  const handleLoginSuccess = (selectedRole: 'student' | 'teacher' | 'manager') => {
    setRole(selectedRole);
    setActivePage(selectedRole === 'student' ? 'home' : 'indicadores');
    setFlow('app');
  };
  
  const handleBackToLogin = () => {
    setFlow('login');
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  const handleBackToLogin2 = () => {
    setRole(null);
    setActivePage('home');
    setFlow('login');
  };

  // Renderiza a página atual baseada no papel e página ativa
  const renderActivePage = () => {
    if (role === 'student') {
      switch (activePage) {
        case 'home':
          return <StudentHome onNavigate={handleNavigate} />;
        case 'jornada':
          return <StudentJornada />;
        case 'marketplace':
          return <StudentMarketplace />;
        case 'ranking':
          return <StudentRanking />;
        case 'perfil':
          return <StudentPerfil onLogout={handleBackToLogin2} />;
        default:
          return <StudentHome onNavigate={handleNavigate} />;
      }
    }

    if (role === 'teacher') {
      switch (activePage) {
        case 'indicadores':
          return <TeacherIndicadores onNavigateToCriarQuiz={() => handleNavigate('criarQuiz')} />;
        case 'turmas':
          return <TeacherTurmas onNavigateToCriarQuiz={() => handleNavigate('criarQuiz')} />;
        case 'ranking':
          return <TeacherRanking />;
        case 'perfil':
          return <TeacherPerfil onLogout={handleBackToLogin2} />;
        case 'criarQuiz':
          return <TeacherCriarQuiz onBack={() => handleNavigate('indicadores')} />;
        default:
          return <TeacherIndicadores onNavigateToCriarQuiz={() => handleNavigate('criarQuiz')} />;
      }
    }

    if (role === 'manager') {
      switch (activePage) {
        case 'indicadores':
          return <ManagerIndicadores />;
        case 'ranking':
          return <ManagerRankingInstitucional />;
        case 'relatorios':
          return <ManagerRelatoriosIA />;
        case 'perfil':
          return <ManagerPerfil onLogout={handleBackToLogin2} />;
        default:
          return <ManagerIndicadores />;
      }
    }

    return null;
  };

  // Renderiza o fluxo atual
  if (flow === 'splash') {
    return (
      <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center">
        <Splash onComplete={handleSplashComplete} />
      </div>
    );
  }

  if (flow === 'onboarding') {
    return (
      <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center">
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  if (flow === 'login') {
    return (
      <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center">
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onBack={handleBackToOnboarding}
        />
      </div>
    );
  }

  // App principal com navegação por papel
  return (
    <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center">
      <div className="mobile-container relative">
        {/* Header com opção de trocar perfil */}
        <div className="absolute top-0 left-0 right-0 bg-white border-b border-[#E0E3E7] px-6 py-3 z-10">
          <div className="flex items-center justify-between">
            <div>
              <small className="text-[#9CA3AF]">Perfil ativo</small>
              <p className="text-[#1C1C1E]">
                {role === 'student' && '👨‍🎓 Aluno'}
                {role === 'teacher' && '👨‍🏫 Professor'}
                {role === 'manager' && '👔 Gestor'}
              </p>
            </div>
            <button
              onClick={handleBackToLogin2}
              className="px-3 py-2 bg-[#F6F7F9] rounded-xl hover:bg-[#E0E3E7] transition-colors"
            >
              <small className="text-[#2D5BFF]">Trocar</small>
            </button>
          </div>
        </div>

        {/* Conteúdo com scroll */}
        <div className="h-full overflow-y-auto pt-16">
          {renderActivePage()}
        </div>

        {/* Bottom Navigation */}
        <BottomNav
          items={
            role === 'student' ? studentNavItems :
            role === 'teacher' ? teacherNavItems :
            managerNavItems
          }
          active={activePage}
          onSelect={handleNavigate}
        />
      </div>
    </div>
  );
}