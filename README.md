# nuxt-template-v3

Template de projeto Nuxt 4 com as principais bibliotecas já configuradas e prontas para uso.

## Instalação

```bash
bun install
```

Copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

Inicie o servidor de desenvolvimento:

```bash
bun run dev
```

Para fazer as builds:

```bash
bun run build
bun run preview
```

## Scripts

| Comando             | Descrição                                   |
| ------------------- | ------------------------------------------- |
| `bun run dev`       | Inicia o servidor de desenvolvimento        |
| `bun run build`     | Gera o build de produção                    |
| `bun run preview`   | Visualiza o build de produção localmente    |
| `bun run lint`      | Executa o ESLint com correção automática    |
| `bun run format`    | Formata os arquivos com Prettier            |
| `bun run typecheck` | Verifica erros de tipo com `nuxt typecheck` |
| `bun run test`      | Executa os testes com Vitest                |

## Bibliotecas

| Biblioteca                                                                                           | Descrição                                 |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [Nuxt 4](https://nuxt.com)                                                                           | Framework principal                       |
| [Tailwind CSS v4](https://tailwindcss.com)                                                           | Estilização utilitária                    |
| [shadcn-nuxt](https://www.shadcn-vue.com)                                                            | Componentes de UI acessíveis (primitivos) |
| [Pinia](https://pinia.vuejs.org)                                                                     | Gerenciamento de estado global            |
| [TanStack Vue Query](https://tanstack.com/query)                                                     | Busca e cache de dados assíncronos        |
| [Axios](https://axios-http.com)                                                                      | Cliente HTTP                              |
| [vee-validate](https://vee-validate.logaretm.com)                                                    | Validação de formulários                  |
| [Zod](https://zod.dev)                                                                               | Definição e validação de schemas          |
| [VueUse](https://vueuse.org)                                                                         | Coleção de composables utilitários        |
| [Maska](https://beholdr.github.io/maska)                                                             | Máscara de inputs                         |
| [date-fns](https://date-fns.org)                                                                     | Utilitários de data                       |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Mesclagem condicional de classes (`cn()`) |
| [class-variance-authority](https://cva.style)                                                        | Variantes de componentes com tipagem      |
| [@nuxt/icon](https://github.com/nuxt/icon)                                                           | Ícones via Lucide e outros                |
| [@nuxt/fonts](https://fonts.nuxt.com)                                                                | Otimização de fontes                      |

## Skills (IA)

Este projeto inclui skills pré-instaladas para uso com assistentes de IA compatíveis (ex: Claude Code):

| Skill                     | Descrição                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `vue`                     | Padrões e convenções do projeto para Vue 3, Nuxt 4, Vue Query e shadcn                     |
| `architecture-philosophy` | Princípios de arquitetura de software (Simple vs Complex vs Complicated, YAGNI, KISS, DRY) |
| `skill-creator`           | Criação, melhoria e avaliação de novas skills                                              |

## Documentação

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Estrutura do projeto e convenções
- [STYLEGUIDE_VUE.md](./STYLEGUIDE_VUE.md) — Convenções de componentes Vue 3
- [STYLEGUIDE_NUXT.md](./STYLEGUIDE_NUXT.md) — Convenções de estrutura e roteamento Nuxt 4
- [STYLEGUIDE_VUE_QUERY.md](./STYLEGUIDE_VUE_QUERY.md) — Convenções de queries e mutations com TanStack Vue Query
- [STYLEGUIDE_SHADCN.md](./STYLEGUIDE_SHADCN.md) — Convenções de uso e extensão dos primitivos shadcn
- [CONTRIBUTING.md](./CONTRIBUTING.md) — Guia de contribuição e fluxo de trabalho
