# Arquitetura

## Stack

| Camada                    | Tecnologia                                      |
| ------------------------- | ----------------------------------------------- |
| Framework                 | Nuxt 4                                          |
| UI                        | Vue 3 + shadcn-nuxt (reka-ui) + Tailwind CSS v4 |
| Estado / Busca de dados   | TanStack Vue Query + Axios                      |
| Formulários               | vee-validate + Zod                              |
| Estado global             | Pinia                                           |
| Utilitários de estilo     | clsx + tailwind-merge (`cn()`)                  |
| Ícones                    | @nuxt/icon (Lucide)                             |
| Fontes                    | @nuxt/fonts                                     |
| Máscara de input          | Maska                                           |
| Utilitários de data       | date-fns                                        |
| Utilitários de composable | VueUse                                          |

## Estrutura do Projeto

```
app/
├── api/                  # Hooks TanStack Query (leitura: queries.ts, escrita: mutations.ts)
│   └── <recurso>/
│       ├── queries.ts
│       └── mutations.ts
├── assets/
│   └── css/
│       └── main.css      # Entrada do Tailwind + variáveis CSS do tema
├── components/
│   ├── form/             # Primitivos de formulário integrados ao vee-validate
│   │   ├── FormInput.vue
│   │   ├── FormSelect.vue
│   │   ├── FormTextarea.vue
│   │   └── FormCheckbox.vue
│   └── ui/               # Primitivos shadcn — gerenciados pelo CLI, não manualmente
│       └── button/
├── composables/          # Lógica reutilizável com estado (useX.ts)
├── constants/            # Constantes globais da aplicação
├── layouts/              # Layouts (default.vue, etc.)
├── lib/                  # Integrações com terceiros e helpers de baixo nível
├── middleware/           # Guards de rota
├── pages/                # Apenas rotas — orquestração, sem lógica de negócio
├── plugins/              # Plugins da aplicação (axios.ts, vue-query.ts)
├── schemas/              # Schemas Zod + toTypedSchema (um arquivo por recurso)
├── types/                # Tipos TypeScript
│   └── entities.ts       # Entidades (qualquer coisa com uuid vinda da API)
└── utils/
    └── css.ts            # Helper cn() (clsx + tailwind-merge)
```

## Convenções

### Busca de Dados

- Todos os hooks de query ficam em `app/api/<recurso>/queries.ts`
- Todos os hooks de mutation ficam em `app/api/<recurso>/mutations.ts`
- Chamadas HTTP passam pelo `$api` (instância axios fornecida por `app/plugins/axios.ts`)
- A URL base é configurada via `NUXT_PUBLIC_API_BASE_URL` no `.env`

### Tipos

- **Entidades** — objetos com `uuid` vindos da API → `app/types/entities.ts`
- **DTOs** — payloads de requisição para mutations → mesmo arquivo da mutation
- **Tipos de resposta complexos** — respostas de listagem ou compostas → mesmo arquivo da query

### Formulários

- Schema definido em `app/schemas/<recurso>.ts` com Zod + `toTypedSchema`
- Componentes de formulário em `app/components/form/` conectados diretamente ao vee-validate via `useField`
- Sem wrapper `FormField` — cada componente é responsável pelo próprio label e mensagem de erro

### Componentes

- `app/components/ui/` — primitivos shadcn, gerenciados pelo CLI do shadcn
- `app/components/<feature>/` — componentes de produto, nomeados conforme a pasta (ex: `FormInput`)
- Nomes de pastas sempre em kebab-case e lowercase

### Estilo

- O tema é definido inteiramente via variáveis CSS em `app/assets/css/main.css`
- Primitivos shadcn podem ser tematizados diretamente — preferível a sobrescritas locais
- `cn()` de `app/utils/css.ts` é usado para mesclagem condicional de classes

## Arquivos de Configuração

| Arquivo                  | Propósito                                                     |
| ------------------------ | ------------------------------------------------------------- |
| `nuxt.config.ts`         | Módulos Nuxt, runtime config, plugins Vite                    |
| `prettier.config.mjs`    | Regras do Prettier + plugin tailwindcss                       |
| `eslint.config.mjs`      | ESLint flat config (Nuxt + compatibilidade com prettier)      |
| `lint-staged.config.mjs` | Regras do lint-staged (eslint + prettier nos arquivos staged) |
| `commitlint.config.mjs`  | Validação de commits convencionais                            |
| `vitest.config.ts`       | Projetos de teste unitário e Nuxt                             |
| `components.json`        | Configuração do CLI shadcn-nuxt                               |
| `.env` / `.env.example`  | Variáveis de ambiente                                         |

## Git Hooks (Husky)

| Hook         | O que executa                                         |
| ------------ | ----------------------------------------------------- |
| `pre-commit` | `lint-staged` (eslint + prettier nos arquivos staged) |
| `commit-msg` | `commitlint` (commits convencionais)                  |
| `pre-push`   | `nuxt typecheck`                                      |
