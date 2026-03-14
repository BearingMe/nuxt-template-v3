---
name: vue
description: Coding standards and conventions for this Vue 3 / Nuxt 4 project. Use this skill whenever writing or reviewing Vue components, Nuxt pages, composables, layouts, plugins, query hooks, mutations, or shadcn UI primitives. Trigger on any task involving component structure, script setup ordering, reactivity, file placement, routing, data fetching with Vue Query, or shadcn theming and extension. Always consult this skill before generating any Vue, Nuxt, or UI code.
---

# Vue Skill

This skill defines the coding standards for this project. It covers four domains, each with a dedicated reference file. Always read the relevant reference before writing code in that domain.

## References

| Domain | File | When to read |
|---|---|---|
| Vue 3 | `references/vue.md` | Writing any component — script setup order, reactivity, naming, templates |
| Nuxt 4 | `references/nuxt.md` | Pages, composables, layouts, plugins, routing, auto-imports |
| Vue Query | `references/vue-query.md` | Data fetching, mutations, type management, file structure under `app/api/` |
| Shadcn | `references/shadcn.md` | Working with `components/ui/` primitives — theming, extending, wrapping |

## When multiple references apply

Read all relevant ones. A page that fetches data and renders a shadcn component touches Nuxt, Vue Query, Vue, and Shadcn. Read all four.

## Non-negotiables

These apply everywhere, no exceptions:

- `<script setup lang="ts">` always
- No manual imports of Vue or Nuxt primitives — rely on auto-imports
- Behavior of shadcn primitives is never broken
- Query hooks live in `app/api/<resource>/queries.ts` or `mutations.ts` only
