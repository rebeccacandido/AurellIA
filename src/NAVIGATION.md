# Sistema de Navegação do AurellIA

## Visão Geral

O app AurellIA implementa um sistema completo de navegação que permite aos usuários navegar facilmente entre as telas e voltar quando necessário.

## Fluxo de Navegação Principal

```
Splash → Onboarding → Login → Seleção de Perfil → App (com Bottom Tabs)
  ↓           ↑          ↑            ↑
  └───────────┴──────────┴────────────┘
     (navegação reversa ativada)
```

### Telas Públicas

1. **Splash** (`/components/pages/Splash.tsx`)
   - Tela inicial com logo e animação
   - Avança automaticamente para Onboarding

2. **Onboarding** (`/components/pages/Onboarding.tsx`)
   - 3 slides explicativos sobre o app
   - Botões: "Próximo", "Pular", "Começar"
   - Avança para Login

3. **Login** (`/components/pages/Login.tsx`)
   - Formulário de e-mail e senha
   - **Botão Voltar**: Retorna ao Onboarding
   - Avança para Seleção de Perfil

4. **Seleção de Perfil** (`/components/pages/RoleSelection.tsx`)
   - Escolha entre Aluno, Professor ou Gestor
   - **Botão "Sair"**: Retorna ao Login
   - Avança para o App com o perfil selecionado

### App Principal

Após a seleção de perfil, o usuário entra no app principal com:

- **Header Superior**: Mostra o perfil ativo e botão "Trocar" para voltar à Seleção de Perfil
- **Conteúdo**: Páginas específicas de cada perfil
- **Bottom Navigation**: Navegação entre seções principais

## Componentes de Navegação

### BackButton (`/components/EDU/BackButton.tsx`)

Componente simples de botão de voltar com ícone de seta.

```tsx
<BackButton 
  onClick={() => handleBack()} 
  label="Voltar" // opcional, padrão é "Voltar"
/>
```

**Props:**
- `onClick`: Função chamada ao clicar
- `label`: Texto do botão (opcional, padrão: "Voltar")

### PageHeader (`/components/EDU/PageHeader.tsx`)

Cabeçalho reutilizável para páginas internas com botão de voltar opcional.

```tsx
<PageHeader 
  title="Título da Página"
  subtitle="Subtítulo opcional"
  onBack={() => handleBack()}
  rightElement={<CustomButton />} // opcional
/>
```

**Props:**
- `title`: Título da página (obrigatório)
- `subtitle`: Subtítulo (opcional)
- `onBack`: Função para voltar (opcional, se presente mostra botão)
- `rightElement`: Elemento customizado no lado direito (opcional)

## Implementação em Páginas

### Exemplo 1: Login com Voltar

```tsx
interface LoginProps {
  onLoginSuccess: () => void;
  onBack?: () => void; // opcional
}

export function Login({ onLoginSuccess, onBack }: LoginProps) {
  return (
    <div className="mobile-container">
      {onBack && (
        <div className="pt-8 pb-4">
          <BackButton onClick={onBack} />
        </div>
      )}
      {/* resto do conteúdo */}
    </div>
  );
}
```

### Exemplo 2: Usando PageHeader

```tsx
export function MinhaPage({ onBack }: { onBack?: () => void }) {
  return (
    <div>
      <PageHeader 
        title="Minha Página"
        subtitle="Descrição da página"
        onBack={onBack}
      />
      {/* conteúdo */}
    </div>
  );
}
```

## Estrutura de Perfis

### Aluno (Student)
- **Home** → Dashboard principal
- **Jornada** → Atividades por disciplina
- **Marketplace** → Recompensas solidárias
- **Ranking** → Posição em rankings

### Professor (Teacher)
- **Indicadores** → Dashboard de métricas
- **Turmas** → Gestão de turmas e metodologias
- **Ranking** → Ranking dos alunos

### Gestor (Manager)
- **Indicadores** → Dashboard institucional
- **Ranking** → Ranking institucional
- **Relatórios IA** → Insights e relatórios

## Exemplos Práticos

### Páginas de Detalhe Criadas

Para demonstrar o uso adequado da navegação com botão voltar, foram criadas páginas de exemplo que mostram navegação vertical (de lista para detalhe):

#### 1. Aluno - Detalhes de Atividade
**Arquivo**: `/components/pages/student/AtividadeDetail.tsx`

Mostra detalhes completos de uma atividade com:
- Progresso das questões
- Objetivos de aprendizagem
- Informações de tempo e nível
- Recompensa ao concluir
- Botão de voltar para a página de Jornada

```tsx
import { AtividadeDetail } from './components/pages/student/AtividadeDetail';

// No componente pai:
<AtividadeDetail onBack={() => handleBackToJornada()} />
```

#### 2. Professor - Detalhes de Turma
**Arquivo**: `/components/pages/teacher/TurmaDetail.tsx`

Visão detalhada de uma turma com:
- Toggle entre visão geral e lista de alunos
- Métricas de progresso e engajamento
- Alunos que precisam de atenção
- Desempenho por conteúdo
- Metodologia aplicada
- Botão de voltar para a página de Turmas

```tsx
import { TurmaDetail } from './components/pages/teacher/TurmaDetail';

// No componente pai:
<TurmaDetail onBack={() => handleBackToTurmas()} />
```

#### 3. Gestor - Detalhes de Insight
**Arquivo**: `/components/pages/manager/InsightDetail.tsx`

Relatório detalhado de IA com:
- Resumo executivo
- Gráficos de evolução
- Detalhamento por área
- Recomendações da IA
- Opções de exportar e compartilhar
- Botão de voltar para Relatórios IA

```tsx
import { InsightDetail } from './components/pages/manager/InsightDetail';

// No componente pai:
<InsightDetail onBack={() => handleBackToRelatorios()} />
```

## Dicas de Implementação

1. **Sempre passe a prop `onBack` quando houver navegação reversa lógica**
   - Login deve voltar para Onboarding
   - RoleSelection deve voltar para Login
   - Páginas de detalhe devem voltar para a listagem

2. **Use PageHeader para consistência visual**
   - Mantém o padrão visual em todas as páginas
   - Facilita manutenção futura

3. **Bottom Tabs vs BackButton**
   - Bottom Tabs: Para navegação principal horizontal
   - BackButton: Para navegação vertical (detalhes → lista)

4. **Estado de navegação no App.tsx**
   - Todo o controle de fluxo está centralizado em `/App.tsx`
   - Facilita debug e manutenção
   - Permite adicionar analytics de navegação facilmente

## Melhorias Futuras

- [ ] Animações de transição entre telas
- [ ] Histórico de navegação (breadcrumbs)
- [ ] Gestos de swipe para voltar (mobile)
- [ ] Deep linking para páginas específicas
- [ ] Persistência de estado de navegação