# AurellIA Web

Frontend em React + Vite que reproduz a experiência mobile da plataforma educacional AurellIA: onboarding gamificado para alunos, analytics para professores e gestores, marketplace solidário e relatórios com IA.

## ✨ Recursos principais

- **Fluxo multi‑perfil** – splash, onboarding, login e seleção de papel (aluno, professor, gestor) em uma única SPA.
- **Jornada do aluno conectada** – disciplinas e quizzes reais consultados via API (`/api/v1/discipline`, `/api/v1/quizzes`), envio de respostas e saldo de moedas sincronizado com o backend.
- **Marketplace solidário** – consome `/products` e `/products/buy`, mostrando saldo real, modal de confirmação e código de resgate.
- **Painel do professor** – relatórios de turma com métricas e geração de novos quizzes diretamente do frontend.
- **Painel do gestor** – relatórios com IA, downloads de PDFs e gatilhos para análises narrativas via API.

## 🧱 Stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/) (JS habilitado)
- [Tailwind utilities](https://tailwindcss.com/) + componentes próprios
- [Lucide Icons](https://lucide.dev/), Radix UI helpers e misc. libs (ver `package.json`)

## ✅ Pré‑requisitos

- Node.js 18+ (recomendado 20)
- npm 9+ ou yarn 1.x
- API AurellIA rodando (veja `/hackathon-impacto`)

## ⚙️ Variáveis `.env`

Crie um arquivo `/.env` ou use `VITE_*` direto no shell:

| Variável | Descrição | Default |
| --- | --- | --- |
| `VITE_API_BASE_URL` | URL da API (incluindo `/api/v1`) | `http://localhost:8000/api/v1` |
| `VITE_STUDENT_ID` | ID do aluno usado para login fake/jornadas | `1` |
| `VITE_GROUP_ID` | ID do grupo escolar para relatórios | `1` |
| `VITE_STUDENT_COINS` | Fallback do saldo quando a API ainda não carregou | `0` |

## 🚀 Como rodar

```bash
# instalar dependências
npm install          # ou yarn

# modo desenvolvimento com HMR
npm run dev          # abre em http://localhost:3000

# build de produção
npm run build

# preview do build (após build)
npm run preview
```

## 📁 Estrutura

```
src/
├── App.tsx                    # Router simples por fluxo/papel
├── main.tsx                   # Bootstrap + contextos globais
├── context/StudentContext.tsx # Estado compartilhado do aluno/saldo
├── lib/                       # api.ts (clients), config.ts (env)
├── components/
│   ├── pages/                 # Telas (student/teacher/manager)
│   ├── EDU/                   # Design system AurellIA (Cards, Modal, etc.)
│   └── ui/                    # Wrappers Radix/Shadcn importados
└── styles/                    # tokens globais
```

## 🧪 Scripts disponíveis

| Script | Descrição |
| --- | --- |
| `npm run dev` | Vite em modo desenvolvimento |
| `npm run build` | Bundle de produção (`dist/`) |
| `npm run preview` | Servidor para validar o build |

## 🔗 Integração com backend

- Todas as chamadas estão centralizadas em `src/lib/api.ts`. Ajuste `VITE_API_BASE_URL` para apontar ao backend Laravel.  
- Recursos usados: disciplinas, perguntas, quizzes, students, products, relatórios de grupos e IA.
- CORS deve estar liberado via `FRONTEND_URL` no backend (`hackathon-impacto`).

## 🤝 Contribuindo

1. Crie uma branch feature: `git checkout -b feature/nova-tela`
2. Rode `npm run dev` e mantenha o lint manual (ESLint/Prettier) se adicionar
3. Abra PR descrevendo comportamento e endpoints tocados

## 📄 Licença

Projeto distribuído sob **MIT** – mesmo modelo do backend. Veja também a licença dos pacotes de UI (Lucide, Radix, etc.).
