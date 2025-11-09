# AurellIA - Documentação Completa da Aplicação

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
3. [Sistema de Design](#sistema-de-design)
4. [Estrutura de Papéis](#estrutura-de-papéis)
5. [Fluxos de Navegação](#fluxos-de-navegação)
6. [Funcionalidades Detalhadas](#funcionalidades-detalhadas)
7. [Componentes Principais](#componentes-principais)
8. [Fluxos de UI/UX](#fluxos-de-uiux)

---

## 🎯 Visão Geral

**AurellIA** é uma plataforma educacional móvel desenvolvida em React Native + Expo, projetada especificamente para iPhone 13/14 (390×844px). A aplicação oferece experiências personalizadas para três tipos de usuários: **Alunos**, **Professores** e **Gestores**.

### Objetivo Principal
Transformar a experiência educacional através de:
- **Gamificação completa** para engajamento dos alunos
- **Análises com IA** para professores e gestores
- **Sistema de recompensas solidárias** para motivação
- **Jornadas de aprendizagem** personalizadas

### Características Técnicas
- **Plataforma**: React Native + Expo
- **Protótipo Web**: React + Tailwind CSS (simula experiência mobile)
- **Resolução alvo**: 390×844px (iPhone 13/14)
- **Tipografia**: Poppins (inglês) e Montaser Arabic (árabe)

---

## 🏗️ Arquitetura e Tecnologias

### Stack Tecnológica
```
React (Web Prototype)
├── Tailwind CSS v4.0
├── TypeScript/JavaScript
├── Lucide React (Ícones)
└── Componentes Shadcn/ui
```

### Estrutura de Diretórios
```
/
├── App.tsx                          # Componente principal e roteamento
├── components/
│   ├── EDU/                         # Componentes educacionais reutilizáveis
│   │   ├── BackButton.tsx
│   │   ├── Badge.tsx
│   │   ├── BottomNav.tsx
│   │   ├── Button.tsx
│   │   ├── CoinsChip.tsx
│   │   ├── LevelChip.tsx
│   │   ├── Modal.tsx
│   │   ├── PageHeader.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Quiz.tsx
│   │   ├── RankingList.tsx
│   │   ├── TextField.tsx
│   │   └── TopTabs.tsx
│   ├── pages/                       # Páginas da aplicação
│   │   ├── Splash.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Login.tsx
│   │   ├── RoleSelection.tsx
│   │   ├── student/                 # Páginas do Aluno
│   │   │   ├── Home.tsx
│   │   │   ├── Jornada.tsx
│   │   │   ├── Marketplace.tsx
│   │   │   ├── Ranking.tsx
│   │   │   ├── Perfil.tsx
│   │   │   └── AtividadeDetail.tsx
│   │   ├── teacher/                 # Páginas do Professor
│   │   │   ├── Indicadores.tsx
│   │   │   ├── Turmas.tsx
│   │   │   ├── TurmaDetail.tsx
│   │   │   ├── Ranking.tsx
│   │   │   └── Perfil.tsx
│   │   └── manager/                 # Páginas do Gestor
│   │       ├── Indicadores.tsx
│   │       ├── RelatoriosIA.tsx
│   │       ├── RankingInstitucional.tsx
│   │       ├── Perfil.tsx
│   │       └── InsightDetail.tsx
│   └── ui/                          # Componentes Shadcn/ui
└── styles/
    └── globals.css                  # Design tokens e estilos globais
```

---

## 🎨 Sistema de Design

### Design Tokens

#### Cores
```css
--primary: #2D5BFF           /* Azul principal */
--background: #F6F7F9        /* Fundo claro */
--text: #1C1C1E              /* Texto escuro */
--border: #E0E3E7            /* Bordas */
--accent: #AEC6FF            /* Azul claro (acento) */
--gradient-start: #AEC6FF    /* Início do gradiente */
--gradient-end: #2D5BFF      /* Fim do gradiente */
```

#### Cores Secundárias
- **Texto secundário**: `#9CA3AF` (cinza)
- **Branco**: `#FFFFFF`
- **Estados de erro**: (vermelho padrão do sistema)
- **Estados de sucesso**: (verde padrão do sistema)

### Tipografia

#### Família de Fontes
- **Principal**: Poppins (pesos: 400, 600, 700)
- **Árabe**: Montaser Arabic

#### Hierarquia Tipográfica
```css
h1: 32px / 700 / line-height: 1.2
h2: 24px / 700 / line-height: 1.3
h3: 20px / 600 / line-height: 1.4
h4: 16px / 600 / line-height: 1.5
p:  14px / 400 / line-height: 1.5
small: 12px / line-height: 1.4
```

### Espaçamento
```css
Padding interno: 24px (px-6 = 24px)
Gap entre elementos: 16px-24px
Margem entre seções: 24px (space-y-6)
```

### Componentes Visuais

#### Cards
- **Border radius**: 24px (`rounded-3xl`) ou 16px (`rounded-2xl`)
- **Shadow**: `card-shadow` (sombra suave)
- **Background**: Branco `#FFFFFF`

#### Botões
- **Primário**: Fundo `#2D5BFF`, texto branco
- **Secundário**: Fundo transparente, borda `#E0E3E7`
- **Border radius**: 12px (`rounded-xl`)
- **Padding**: `py-3` (12px vertical)

#### Badges
- **Border radius**: 16px (`rounded-2xl`)
- **Cores**: Variam por estado (conquistada/bloqueada)

---

## 👥 Estrutura de Papéis

### 1. Aluno (Student)

#### Características
- **Foco**: Gamificação e aprendizado
- **Elementos principais**:
  - Moedas (sistema de pontos)
  - Níveis (progressão a cada 5 quizzes)
  - Badges (conquistas)
  - Jornada de Aprendizagem
  - Marketplace de Recompensas

#### Navegação (5 abas)
1. **Início** - Dashboard com atividades e progresso
2. **Jornada** - Temas de aprendizagem e quizzes
3. **Marketplace** - Troca de moedas por recompensas
4. **Ranking** - Posição entre alunos e turmas
5. **Perfil** - Informações pessoais e badges

---

### 2. Professor (Teacher)

#### Características
- **Foco**: Acompanhamento de turma única (7º Ano A)
- **Elementos principais**:
  - Indicadores de desempenho
  - Insights com IA
  - Relatórios de turma
  - Ranking de alunos

#### Navegação (4 abas)
1. **Indicadores** - Métricas e insights da turma
2. **Turmas** - Detalhes da turma 7º Ano A
3. **Ranking** - Ranking de alunos e comparação de turmas
4. **Perfil** - Informações profissionais

#### Cadastro Específico
Campos obrigatórios:
- Nome
- Email
- Instituição de Ensino
- Disciplina

---

### 3. Gestor (Manager)

#### Características
- **Foco**: Visão institucional e análises estratégicas
- **Elementos principais**:
  - Indicadores institucionais
  - Relatórios com IA
  - Rankings globais
  - Insights estratégicos

#### Navegação (4 abas)
1. **Indicadores** - Métricas institucionais
2. **Ranking** - Top alunos e turmas (com filtros)
3. **Relatórios IA** - Insights e recomendações
4. **Perfil** - Informações administrativas

---

## 🗺️ Fluxos de Navegação

### Fluxo de Onboarding (Universal)

```
┌─────────────┐
│   Splash    │ (2s, logo cérebro+livro)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Onboarding  │ (3 telas com slides)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Login    │ (Email + Senha)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Seleção   │ (Escolha: Aluno/Professor/Gestor)
│  de Papel   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Dashboard  │ (Específico do papel)
└─────────────┘
```

---

### Fluxo do Aluno

#### 1. Início (Home)
```
Home
├── Header com logo wordmark
├── Chips: Moedas e Nível
├── Card "Continuar Aprendendo" → vai para Jornada
├── Lista de Atividades Recentes
│   └── Click → AtividadeDetail (modal)
└── Bottom Navigation
```

#### 2. Jornada
```
Jornada
├── Lista de Temas
│   ├── Tema Atual (desbloqueado)
│   │   ├── Imagem
│   │   ├── Título
│   │   ├── Descrição
│   │   ├── Progresso (X/5 perguntas)
│   │   └── Botão "Continuar" → Quiz
│   │
│   └── Próximos Temas (bloqueados)
│       └── Ícone de cadeado
│
└── Quiz (5 perguntas)
    ├── Pergunta com alternativas
    ├── Feedback imediato (correto/incorreto)
    ├── Progresso 1/5, 2/5...
    └── Resultado Final
        ├── Se ≥60% → +100 moedas + desbloqueia próximo tema
        └── Se <60% → Pode refazer
```

**Regras da Jornada**:
- Apenas 1 tema liberado por vez
- Próximo tema só libera após completar o atual com ≥60%
- Cada tema = 5 perguntas
- Recompensa: 100 moedas por tema aprovado

#### 3. Marketplace
```
Marketplace
├── Filtros (Todos/Materiais/Solidário)
├── Grid de Recompensas
│   └── Card Recompensa
│       ├── Imagem
│       ├── Título
│       ├── Descrição
│       ├── Custo em moedas
│       └── Botão "Resgatar"
│           └── Modal de Confirmação
│               ├── Detalhes da recompensa
│               ├── "Confirmar Resgate"
│               └── Gera código de 8 caracteres
│                   └── Apresentar na secretaria
```

**Sistema de Código**:
- Gerado aleatoriamente (8 caracteres alfanuméricos)
- Exemplo: `A7K9M2X5`
- Usado para validação presencial

#### 4. Ranking
```
Ranking
├── Tabs: [Alunos] [Turmas]
│
├── Tab Alunos
│   └── Lista com posição, nome, pontos
│       └── Destaque visual para usuário atual
│
└── Tab Turmas
    └── Lista com posição, nome da turma, pontos
        └── Destaque visual para turma do usuário
```

#### 5. Perfil
```
Perfil
├── Header com avatar e nome
├── Estatísticas
│   ├── Moedas totais
│   ├── Nível atual
│   └── "Faltam X quizzes para Nível Y"
│
├── Informações Pessoais
│   ├── Email
│   ├── Bio
│   ├── Turma
│   └── Série
│
├── Badges Conquistadas (Grid 3 colunas)
│   ├── Badge conquistada (colorida)
│   └── Badge bloqueada (cinza, opacidade 40%)
│
└── Modo Edição
    ├── Editar campos
    └── Salvar alterações
```

**Sistema de Níveis**:
- A cada 5 quizzes completados = +1 nível
- Exibição: "Faltam 3 quizzes para alcançar o Nível 4"

---

### Fluxo do Professor

#### 1. Indicadores
```
Indicadores
├── Cards de Métricas
│   ├── Total de Alunos
│   ├── Média da Turma
│   ├── Taxa de Conclusão
│   └── Atividades Pendentes
│
└── Insights com IA (Cards)
    ├── Título do insight
    ├── Descrição breve
    └── Tag de categoria
```

#### 2. Turmas
```
Turmas
├── Card Turma (7º Ano A)
│   ├── Nome da turma
│   ├── Número de alunos
│   ├── Média geral
│   └── Botão "Ver Detalhes"
│       └── TurmaDetail
│           ├── Informações gerais
│           ├── Lista de alunos
│           │   ├── Nome
│           │   ├── Desempenho
│           │   └── Status
│           └── Gráficos de desempenho
```

#### 3. Ranking
```
Ranking
├── Tabs: [Alunos da Turma] [Turmas]
│
├── Tab Alunos da Turma
│   └── Top 5 alunos da turma 7º Ano A
│
└── Tab Turmas
    └── Posição da turma 7º Ano A vs outras turmas
```

#### 4. Perfil
```
Perfil
├── Avatar e nome
├── Informações Profissionais
│   ├── Email
│   ├── Instituição
│   ├── Disciplina
│   └── Turma associada (7º Ano A)
│
└── Modo Edição
    └── Salvar alterações
```

---

### Fluxo do Gestor

#### 1. Indicadores
```
Indicadores
├── Cards de Métricas Institucionais
│   ├── Total de Alunos
│   ├── Total de Professores
│   ├── Total de Turmas
│   ├── Média Institucional
│   └── Taxa de Engajamento
│
└── Gráficos de Desempenho
    ├── Evolução temporal
    └── Comparações por série
```

#### 2. Ranking Institucional
```
Ranking Institucional
├── Tabs: [Top Alunos] [Top Turmas]
│
├── Filtros por Série
│   └── [Todas] [6º] [7º] [8º] [9º]
│
├── Tab Top Alunos
│   └── Top 10 alunos de toda instituição
│       └── Nome - Turma, Pontos
│
└── Tab Top Turmas
    └── Top 5 turmas da instituição
        └── Nome - Unidade, Pontos
```

#### 3. Relatórios IA
```
Relatórios IA
├── Lista de Insights
│   └── Card Insight
│       ├── Título
│       ├── Categoria
│       ├── Data
│       └── Click → InsightDetail
│           ├── Título completo
│           ├── Descrição detalhada
│           ├── Métricas relacionadas
│           └── Recomendações da IA
```

#### 4. Perfil
```
Perfil
├── Avatar e nome
├── Informações Administrativas
│   ├── Email
│   ├── Cargo
│   └── Instituição
│
└── Modo Edição
    └── Salvar alterações
```

---

## ⚙️ Funcionalidades Detalhadas

### Sistema de Gamificação (Alunos)

#### 1. Moedas
- **Ganho**: 100 moedas por quiz aprovado (≥60%)
- **Uso**: Troca por recompensas no Marketplace
- **Exibição**: Chip no topo das páginas principais

#### 2. Níveis
- **Progressão**: A cada 5 quizzes completados = +1 nível
- **Cálculo**: 
  ```
  Nível = Math.floor(quizzes_completados / 5) + 1
  Próximo nível em = 5 - (quizzes_completados % 5) quizzes
  ```
- **Exibição**: Chip no topo + Informação no perfil

#### 3. Badges
- **Tipos**: 
  - Primeira Conquista
  - Mestre dos Quizzes
  - Explorador
  - Aprendiz Dedicado
  - Colaborador
  - Campeão do Ranking
  - Solidário
  - Persistente

- **Estados**:
  - Conquistada: Colorida, borda azul
  - Bloqueada: Cinza, opacidade 40%

#### 4. Sistema de Quiz

**Estrutura**:
```javascript
{
  tema: "Álgebra Básica",
  perguntas: [
    {
      pergunta: "Quanto é 2 + 2?",
      alternativas: ["3", "4", "5", "6"],
      respostaCorreta: 1, // índice da resposta
      explicacao: "2 + 2 = 4"
    },
    // ... 4 perguntas adicionais
  ]
}
```

**Fluxo de Quiz**:
1. Usuário clica em "Continuar" no tema
2. Modal abre com primeira pergunta
3. Usuário seleciona alternativa
4. Feedback imediato (verde/vermelho)
5. Exibe explicação
6. Botão "Próxima"
7. Repete até 5/5 perguntas
8. Mostra resultado final com porcentagem
9. Se ≥60%: +100 moedas, desbloqueia próximo tema
10. Se <60%: Pode refazer o quiz

**Validação**:
```javascript
acertos >= 3 // 60% de 5 perguntas
```

#### 5. Marketplace de Recompensas

**Categorias**:
- **Materiais Escolares**: Cadernos, canetas, mochilas
- **Solidário**: Doações para instituições

**Sistema de Resgate**:
1. Aluno escolhe item
2. Modal de confirmação
3. Confirma → Desconta moedas
4. Gera código aleatório de 8 caracteres
5. Código deve ser apresentado na secretaria

**Código de Resgate**:
```javascript
function gerarCodigo() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < 8; i++) {
    codigo += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return codigo;
}
```

---

### Sistema de Ranking

#### Ranking de Alunos
```javascript
{
  position: 1,
  name: "Pedro Silva",
  points: 3850,
  isCurrentUser: false
}
```

**Ordenação**: Decrescente por pontos  
**Destaque**: Usuário atual com fundo azul claro

#### Ranking de Turmas
```javascript
{
  position: 1,
  name: "Turma 8º A",
  points: 45280,
  isCurrentUser: false
}
```

**Cálculo de pontos da turma**: Soma de todos os pontos dos alunos

---

### Sistema de Insights com IA (Professor e Gestor)

#### Estrutura de Insight
```javascript
{
  titulo: "Melhoria no desempenho de Matemática",
  categoria: "Desempenho",
  descricao: "A turma 7º A apresentou crescimento...",
  data: "2025-11-09",
  metricas: {
    antes: 6.5,
    depois: 7.8,
    crescimento: "+20%"
  },
  recomendacoes: [
    "Manter metodologia atual",
    "Expandir exercícios práticos"
  ]
}
```

---

## 🧩 Componentes Principais

### Componentes EDU (Reutilizáveis)

#### 1. BottomNav
```typescript
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

<BottomNav 
  items={navItems}
  activePage={activePage}
  onNavigate={(id) => setActivePage(id)}
/>
```

#### 2. CoinsChip
```typescript
<CoinsChip coins={2850} />
// Exibe: "💰 2850"
```

#### 3. LevelChip
```typescript
<LevelChip level={5} />
// Exibe: "🏆 Nível 5"
```

#### 4. Quiz
```typescript
interface QuizData {
  tema: string;
  perguntas: Pergunta[];
}

<Quiz 
  quizData={quizData}
  onComplete={(acertos, total) => handleComplete(acertos, total)}
/>
```

#### 5. RankingList
```typescript
interface RankingItem {
  position: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
}

<RankingList items={rankingItems} />
```

#### 6. ProgressBar
```typescript
<ProgressBar 
  current={3}
  total={5}
  showLabel={true}
/>
// Exibe: Barra + "3/5"
```

#### 7. Modal
```typescript
<Modal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Título"
>
  {children}
</Modal>
```

#### 8. PageHeader
```typescript
<PageHeader 
  title="Jornada de Aprendizagem"
  showBack={true}
  onBack={() => navigate('home')}
/>
```

---

## 🎯 Fluxos de UI/UX

### Padrões de Interação

#### 1. Navegação por Tabs
**Comportamento**:
- Tab ativa: Fundo azul `#2D5BFF`, texto branco
- Tab inativa: Texto cinza `#9CA3AF`
- Transição suave ao trocar tabs
- Texto centralizado

**Implementação**:
```jsx
<div className="flex gap-2 bg-white rounded-2xl p-1 card-shadow">
  <button className={`flex-1 py-2 rounded-xl transition-all text-center ${
    active ? 'bg-[#2D5BFF] text-white' : 'text-[#9CA3AF]'
  }`}>
    Label
  </button>
</div>
```

#### 2. Cards Clicáveis
**Comportamento**:
- Hover: Leve elevação (shadow mais pronunciada)
- Click: Feedback visual (escala 98%)
- Transição: 200ms ease

**Implementação**:
```jsx
<div className="bg-white rounded-3xl p-6 card-shadow transition-all hover:shadow-lg active:scale-98">
  {content}
</div>
```

#### 3. Modais
**Comportamento**:
- Abertura: Fade in + slide up
- Fundo: Overlay escuro com blur
- Fechamento: Click fora, botão X, ou ação completada
- Mobile-first: Ocupa 90% da altura

#### 4. Feedback de Ações

**Quiz - Resposta Correta**:
- Alternativa fica verde
- Ícone de check ✓
- Vibração (se suportado)

**Quiz - Resposta Incorreta**:
- Alternativa fica vermelha
- Mostra resposta correta em verde
- Ícone de X ✗

**Resgate no Marketplace**:
1. Click em "Resgatar"
2. Modal de confirmação
3. Desconta moedas
4. Mostra código grande e centralizado
5. Confete/celebração (visual)

#### 5. Estados de Loading
- Skeleton screens para listas
- Spinner para ações assíncronas
- Desabilita botão durante processamento

#### 6. Empty States
**Quando não há dados**:
```jsx
<EmptyState 
  icon={<Icon />}
  title="Nenhuma atividade ainda"
  description="Complete quizzes para ver suas atividades"
/>
```

---

### Jornadas de Usuário Completas

#### Jornada 1: Aluno Completa Primeiro Quiz

```
1. Login → Seleção de Papel (Aluno)
   └─ 📍 Entra na Home

2. Home
   └─ Vê card "Continuar Aprendendo"
   └─ Click → 📍 Vai para Jornada

3. Jornada
   └─ Vê primeiro tema (Álgebra Básica) desbloqueado
   └─ Progresso: 0/5 perguntas
   └─ Click "Continuar" → 📍 Abre Quiz (modal)

4. Quiz
   └─ Pergunta 1/5
   └─ Seleciona alternativa
   └─ Feedback imediato (verde/vermelho)
   └─ "Próxima" → Pergunta 2/5
   └─ ... repete até 5/5
   
5. Resultado
   └─ "Parabéns! 4/5 corretas (80%)"
   └─ "+100 moedas"
   └─ "Próximo tema desbloqueado!"
   └─ 📍 Fecha modal

6. Jornada (atualizada)
   └─ Tema 1: Completo ✓
   └─ Tema 2: Agora desbloqueado
   
7. Home (se navegar)
   └─ Chip de moedas: 100 (antes era 0)
   └─ Chip de nível: Nível 1 (faltam 4 quizzes)
```

---

#### Jornada 2: Aluno Resgata Recompensa

```
1. Aluno acumula 500 moedas (5 quizzes completos)
   
2. Navega para Marketplace
   └─ Vê grid de recompensas
   
3. Escolhe "Caderno Personalizado" (300 moedas)
   └─ Click "Resgatar"
   └─ 📍 Abre modal de confirmação
   
4. Modal de Confirmação
   └─ Imagem do caderno
   └─ "Caderno Personalizado - 300 moedas"
   └─ "Saldo atual: 500"
   └─ "Saldo após resgate: 200"
   └─ [Cancelar] [Confirmar Resgate]
   
5. Click "Confirmar Resgate"
   └─ Desconta 300 moedas (500 → 200)
   └─ Gera código: "K7M2N9P5"
   └─ 📍 Mostra modal de sucesso
   
6. Modal de Código
   └─ "✓ Resgate realizado!"
   └─ "Seu código: K7M2N9P5"
   └─ "Apresente este código na secretaria"
   └─ [Copiar Código] [Fechar]
   
7. Marketplace (atualizado)
   └─ Chip de moedas: 200
   └─ Item "Caderno" não disponível (saldo insuficiente)
```

---

#### Jornada 3: Professor Visualiza Desempenho

```
1. Login → Seleção de Papel (Professor)
   └─ 📍 Entra em Indicadores

2. Indicadores
   └─ Card: "24 Alunos"
   └─ Card: "Média 7.5"
   └─ Card: "85% Conclusão"
   └─ Insight IA: "Melhoria em Matemática"
   
3. Navega para Turmas
   └─ Card "7º Ano A"
   └─ Click "Ver Detalhes"
   └─ 📍 Abre TurmaDetail

4. TurmaDetail
   └─ Header: "7º Ano A"
   └─ "24 alunos · Média 7.5"
   └─ Lista de alunos
       ├─ Pedro Silva - 8.5 - ✓ Em dia
       ├─ Ana Costa - 7.2 - ⚠ Atenção
       └─ ...
   └─ Gráfico de evolução
   
5. Navega para Ranking
   └─ Tab "Alunos da Turma"
   └─ 1º Pedro Silva - 3850 pontos
   └─ 2º Ana Costa - 3420 pontos
   └─ ...
   
6. Troca para tab "Turmas"
   └─ 1º Turma 8º A - 45280
   └─ 2º Turma 9º B - 42150
   └─ 3º Turma 7º A - 38920 (sua turma destacada)
```

---

#### Jornada 4: Gestor Analisa Indicadores Institucionais

```
1. Login → Seleção de Papel (Gestor)
   └─ 📍 Entra em Indicadores

2. Indicadores Institucionais
   └─ Card: "1.248 Alunos"
   └─ Card: "52 Professores"
   └─ Card: "24 Turmas"
   └─ Card: "Média 7.8"
   └─ Card: "89% Engajamento"
   └─ Gráficos de evolução
   
3. Navega para Relatórios IA
   └─ Lista de insights
   └─ Click em "Taxa de conclusão aumentou 15%"
   └─ 📍 Abre InsightDetail

4. InsightDetail
   └─ "Taxa de conclusão aumentou 15%"
   └─ Categoria: Engajamento
   └─ Data: 09/11/2025
   └─ Descrição detalhada
   └─ Métricas:
       ├─ Antes: 74%
       ├─ Depois: 89%
       └─ Crescimento: +15%
   └─ Recomendações IA:
       ├─ Manter estratégias atuais
       ├─ Investir em gamificação
       └─ Expandir para outras séries
   
5. Volta e navega para Ranking Institucional
   └─ Filtro: "Todas as séries"
   └─ Tab "Top Alunos"
   └─ 1º Pedro Silva - 8º A - 3850
   └─ ...
   
6. Troca para tab "Top Turmas"
   └─ 1º Turma 8º A - Unidade Centro - 45280
   └─ ...
   
7. Aplica filtro: "7º Ano"
   └─ Mostra apenas alunos/turmas do 7º ano
```

---

### Microinterações

#### 1. Animação de Moedas
Quando ganha moedas no quiz:
```
+100 💰 (aparece com scale de 0 → 1.2 → 1)
Duração: 500ms
Easing: ease-out
```

#### 2. Desbloqueio de Tema
Quando libera próximo tema:
```
Ícone de cadeado 🔒 → ✓
Opacidade: 40% → 100%
Escala: 0.95 → 1
Duração: 300ms
```

#### 3. Confete no Resgate
Quando resgata recompensa:
```
Partículas coloridas caem do topo
Duração: 2s
Quantidade: 50 partículas
```

#### 4. Shake em Erro
Quando responde errado:
```
Transform: translateX(-10px) → 10px → 0
Repetições: 2
Duração: 200ms
```

---

## 📊 Regras de Negócio

### Alunos

1. **Progressão de Temas**
   - Apenas 1 tema ativo por vez
   - Próximo tema só libera com ≥60% no atual
   - Não pode pular temas

2. **Sistema de Moedas**
   - Ganho: 100 moedas/quiz aprovado
   - Gasto: Apenas no Marketplace
   - Saldo não pode ficar negativo

3. **Níveis**
   - Progressão: 5 quizzes = +1 nível
   - Não há nível máximo definido
   - Níveis não regridem

4. **Marketplace**
   - Só pode resgatar com saldo suficiente
   - Código de 8 caracteres gerado
   - Código único por resgate

### Professores

1. **Turma Única**
   - Cada professor associado a 1 turma
   - Exemplo: 7º Ano A
   - Não pode trocar de turma (apenas admin)

2. **Visualização**
   - Vê apenas dados da sua turma
   - No ranking de turmas, vê todas (comparação)

### Gestores

1. **Visão Global**
   - Acesso a todas as turmas
   - Todos os alunos
   - Todos os professores

2. **Filtros**
   - Por série (6º, 7º, 8º, 9º)
   - Por unidade (se aplicável)
   - Por período

---

## 🔐 Autenticação e Segurança

### Fluxo de Login
```
1. Email + Senha
2. Validação backend (simulada)
3. Retorna papel do usuário
4. Redireciona para dashboard específico
```

### Persistência
```javascript
// Simples state management no App.tsx
const [role, setRole] = useState<Role>(null);
const [activePage, setActivePage] = useState('home');

// Em produção: usar Context API ou Redux
```

---

## 🎓 Dados de Exemplo

### Temas de Aprendizagem (Alunos)
```javascript
[
  {
    id: 1,
    titulo: "Álgebra Básica",
    descricao: "Aprenda equações de 1º grau",
    imagem: "/algebra.jpg",
    status: "desbloqueado",
    progresso: 0
  },
  {
    id: 2,
    titulo: "Geometria",
    descricao: "Formas e ângulos",
    imagem: "/geometria.jpg",
    status: "bloqueado",
    progresso: 0
  }
]
```

### Recompensas (Marketplace)
```javascript
[
  {
    id: 1,
    titulo: "Caderno Personalizado",
    descricao: "Caderno com logo da escola",
    imagem: "/caderno.jpg",
    custo: 300,
    categoria: "materiais"
  },
  {
    id: 2,
    titulo: "Doação - Instituto ABC",
    descricao: "Contribua com educação",
    imagem: "/doacao.jpg",
    custo: 500,
    categoria: "solidario"
  }
]
```

### Badges
```javascript
[
  {
    id: 1,
    nome: "Primeira Conquista",
    icon: "🎯",
    conquistada: true
  },
  {
    id: 2,
    nome: "Mestre dos Quizzes",
    icon: "🏆",
    conquistada: false
  }
]
```

---

## 🚀 Melhorias Futuras

### Fase 2
- [ ] Notificações push
- [ ] Chat entre alunos
- [ ] Desafios semanais
- [ ] Sistema de amizades

### Fase 3
- [ ] Integração com LMS externo
- [ ] Vídeo-aulas integradas
- [ ] Sistema de certificados
- [ ] Leaderboards por período

### Fase 4
- [ ] IA para recomendação de conteúdo
- [ ] Adaptive learning
- [ ] Gamificação avançada (clãs, guerras)
- [ ] Marketplace físico integrado

---

## 📱 Responsividade

### Resolução Alvo
- **Primária**: 390×844px (iPhone 13/14)
- **Container**: `.mobile-container` (centralizado)

### Breakpoints (Futuro)
```css
/* Apenas se expandir para tablets */
sm: 640px   /* Não usado no escopo atual */
md: 768px   /* Não usado no escopo atual */
lg: 1024px  /* Desktop preview */
```

---

## 🎨 Assets Visuais

### Logos
1. **Logo Ícone** (cérebro+livro)
   - Uso: Splash screen, favicon
   - Formato: SVG ou PNG

2. **Logo Wordmark** (azul/gradiente)
   - Uso: Headers, login
   - Variantes: Azul sólido, gradiente

### Ícones
- **Biblioteca**: Lucide React
- **Tamanho padrão**: 24px
- **Cor**: `#2D5BFF` (principal) ou `#9CA3AF` (secundário)

### Imagens
- **Temas**: Ilustrações coloridas
- **Recompensas**: Fotos realistas
- **Avatar**: Placeholder circular

---

## 🧪 Testes e Validação

### Checklist de Funcionalidades

#### Aluno
- [x] Login e seleção de papel
- [x] Visualização de moedas e nível
- [x] Completar quiz (aprovado)
- [x] Completar quiz (reprovado)
- [x] Desbloqueio de próximo tema
- [x] Resgate de recompensa
- [x] Geração de código
- [x] Visualização de ranking
- [x] Edição de perfil
- [x] Visualização de badges

#### Professor
- [x] Visualização de indicadores
- [x] Acesso a turma única
- [x] Visualização de ranking
- [x] Edição de perfil

#### Gestor
- [x] Indicadores institucionais
- [x] Relatórios com IA
- [x] Ranking global
- [x] Filtros por série
- [x] Edição de perfil

---

## 📞 Suporte e Documentação Adicional

### Arquivos Relacionados
- `NAVIGATION.md` - Detalhes de navegação
- `NAVIGATION_FLOW.md` - Fluxos específicos
- `QUICK_START_NAVIGATION.md` - Guia rápido
- `guidelines/Guidelines.md` - Diretrizes de design

### Contato
Para dúvidas sobre a aplicação, consulte os arquivos acima ou entre em contato com a equipe de desenvolvimento.

---

**Versão**: 1.0  
**Última atualização**: Novembro 2025  
**Desenvolvido para**: AurellIA Educational Platform
