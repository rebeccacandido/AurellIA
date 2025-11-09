# 🚀 Guia Rápido: Adicionar Navegação com Voltar

## Para Páginas Públicas (Login, RoleSelection, etc)

### 1. Adicione a prop `onBack` na interface

```tsx
interface MinhaTelaProps {
  // suas outras props...
  onBack?: () => void;  // ← Adicione isso
}
```

### 2. Use o componente BackButton

```tsx
import { BackButton } from '../EDU/BackButton';

export function MinhaTela({ onBack }: MinhaTelaProps) {
  return (
    <div className="mobile-container">
      {onBack && (
        <div className="pt-8 pb-4">
          <BackButton onClick={onBack} label="Voltar" />
        </div>
      )}
      {/* seu conteúdo aqui */}
    </div>
  );
}
```

### 3. Passe a função no App.tsx

```tsx
// Em App.tsx, adicione o handler:
const handleBackToAlgumaCoisa = () => {
  setFlow('algum-fluxo-anterior');
};

// E passe para o componente:
<MinhaTela onBack={handleBackToAlgumaCoisa} />
```

---

## Para Páginas Internas (Detalhes, Formulários, etc)

### 1. Use o componente PageHeader

```tsx
import { PageHeader } from '../../EDU/PageHeader';

interface DetalheProps {
  onBack: () => void;  // obrigatório para páginas de detalhe
}

export function DetalhePage({ onBack }: DetalheProps) {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <PageHeader 
        title="Título da Página"
        subtitle="Subtítulo (opcional)"
        onBack={onBack}
        rightElement={
          <button>Ação</button>  // opcional
        }
      />
      
      <div className="px-6 pt-6 pb-20 space-y-6">
        {/* seu conteúdo aqui */}
      </div>
    </div>
  );
}
```

### 2. Gerencie a navegação no componente pai

```tsx
export function ComponentePai() {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedItem(null);
  };

  if (showDetail) {
    return <DetalhePage item={selectedItem} onBack={handleBackToList} />;
  }

  return <ListaPage onItemClick={handleItemClick} />;
}
```

---

## Checklist Rápido ✅

Quando adicionar navegação com voltar:

- [ ] Defini a interface com `onBack?: () => void`
- [ ] Importei o componente correto (`BackButton` ou `PageHeader`)
- [ ] Implementei o componente na UI
- [ ] Criei o handler no componente pai
- [ ] Passei a prop `onBack` corretamente
- [ ] Testei a navegação ida e volta

---

## Padrões de Nomenclatura

### Handlers de Navegação

```tsx
// ✅ BOM - Descreve a ação e destino
handleBackToLogin()
handleBackToJornada()
handleBackToListagem()

// ❌ EVITAR - Genérico demais
handleBack()
goBack()
```

### Props de Navegação

```tsx
// ✅ BOM - Clara e consistente
onBack?: () => void

// ❌ EVITAR - Inconsistente
onGoBack?: () => void
onReturn?: () => void
backHandler?: () => void
```

---

## Exemplos Completos

### Exemplo 1: Página Pública Simples

```tsx
// components/pages/MinhaPagina.tsx
import React from 'react';
import { BackButton } from '../EDU/BackButton';

interface MinhaPaginaProps {
  onNext: () => void;
  onBack?: () => void;
}

export function MinhaPagina({ onNext, onBack }: MinhaPaginaProps) {
  return (
    <div className="mobile-container flex flex-col bg-[#F6F7F9] px-6">
      {onBack && (
        <div className="pt-8 pb-4">
          <BackButton onClick={onBack} />
        </div>
      )}
      
      <div className="flex-1 flex flex-col justify-center">
        <h1>Minha Página</h1>
        {/* conteúdo */}
      </div>
      
      <div className="pb-8">
        <button onClick={onNext}>Próximo</button>
      </div>
    </div>
  );
}
```

```tsx
// App.tsx - Uso
<MinhaPagina 
  onNext={handleNext}
  onBack={handleBackToPreviousPage}
/>
```

### Exemplo 2: Página de Detalhe com Header

```tsx
// components/pages/student/AtividadeDetail.tsx
import React from 'react';
import { PageHeader } from '../../EDU/PageHeader';
import { Button } from '../../EDU/Button';
import { CoinsChip } from '../../EDU/CoinsChip';

interface AtividadeDetailProps {
  atividade: Atividade;
  onBack: () => void;
}

export function AtividadeDetail({ atividade, onBack }: AtividadeDetailProps) {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <PageHeader 
        title={atividade.title}
        subtitle={atividade.disciplina}
        onBack={onBack}
        rightElement={<CoinsChip amount={atividade.coins} />}
      />
      
      <div className="px-6 pt-6 pb-20 space-y-6">
        <div className="bg-white rounded-3xl p-5 card-shadow">
          <h3>Descrição</h3>
          <p>{atividade.description}</p>
        </div>
        
        <Button variant="primary" fullWidth>
          Iniciar Atividade
        </Button>
      </div>
    </div>
  );
}
```

```tsx
// components/pages/student/Jornada.tsx - Uso
import { AtividadeDetail } from './AtividadeDetail';

export function StudentJornada() {
  const [selectedAtividade, setSelectedAtividade] = useState(null);

  if (selectedAtividade) {
    return (
      <AtividadeDetail 
        atividade={selectedAtividade}
        onBack={() => setSelectedAtividade(null)}
      />
    );
  }

  return (
    <div>
      {/* lista de atividades */}
    </div>
  );
}
```

---

## Troubleshooting 🔧

### Problema: Botão de voltar não aparece

**Causa**: A prop `onBack` não está sendo passada ou é `undefined`

**Solução**:
```tsx
// ✅ Sempre verifique se onBack existe antes de usar
{onBack && <BackButton onClick={onBack} />}
```

### Problema: Ao clicar em voltar nada acontece

**Causa**: O handler no componente pai não está atualizando o estado

**Solução**:
```tsx
// ✅ Certifique-se de atualizar o estado
const handleBack = () => {
  setShowDetail(false);  // ou setFlow('previous-flow')
};
```

### Problema: PageHeader não está sticky

**Causa**: Falta estrutura correta da página

**Solução**:
```tsx
// ✅ Use esta estrutura:
<div className="min-h-screen bg-[#F6F7F9]">
  <PageHeader ... />  {/* sticky por padrão */}
  <div className="px-6 pt-6 pb-20">
    {/* conteúdo com espaçamento */}
  </div>
</div>
```

---

## Recursos Adicionais

- 📖 Documentação completa: [`/NAVIGATION.md`](/NAVIGATION.md)
- 🎨 Componentes: [`/components/EDU/BackButton.tsx`](/components/EDU/BackButton.tsx), [`/components/EDU/PageHeader.tsx`](/components/EDU/PageHeader.tsx)
- 💡 Exemplos práticos: Veja as páginas em `/components/pages/*/Detail.tsx`
