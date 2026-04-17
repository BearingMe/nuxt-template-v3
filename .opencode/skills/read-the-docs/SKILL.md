---
name: read-the-docs
description: >
  Project documentation router. Use when the user asks how to build, structure, or follow
  conventions for anything in this codebase — components, pages, queries, mutations,
  shadcn extensions, routing, architecture, file naming, or hierarchy. Triggers on
  phrasings like "how do I", "where should this go", "what's the convention for",
  "how should I structure", or any reference to project-specific patterns. Do NOT trigger
  for generic programming questions unrelated to this project's conventions.
---

# How to use this skill

Do NOT read `docs/index.md` — the current index is inlined below. Use it to pick the
ONE (or few) docs that actually answer the user's question, then read only those files
from `/<root>/docs/`.

If nothing in the index matches, say so rather than guessing or reading docs
speculatively. Only read a doc when you're confident it answers the question at hand.

# Document index

## Guides (task-oriented: "how do I do X")

- `guides/how-to-create-a-component.md` — building a new component from scratch
- `guides/how-to-create-a-page.md` — adding a new page / route
- `guides/how-to-create-mutations.md` — writing mutations
- `guides/how-to-create-queries.md` — writing queries
- `guides/how-to-extend-a-shadcn-component.md` — customizing or wrapping shadcn primitives

## References (conceptual: "what is the rule / shape")

- `references/architecture.md` — overall architecture and layering
- `references/hierarchy.md` — folder and module hierarchy
- `references/styleguide_components.md` — component conventions
- `references/styleguide_files.md` — file naming and organization
- `references/styleguide_queries.md` — query conventions
- `references/styleguide_shadcn.md` — shadcn usage rules

# Routing rules

- "How do I create/build/add X" → read the matching `guides/how-to-*.md`.
- "What's the convention / style / rule for X" → read the matching `references/styleguide_*.md`.
- "How is the project structured / where does X live" → read `references/architecture.md`
  and/or `references/hierarchy.md`.
- A guide often references a styleguide. If the guide cites one, read that styleguide too.
- Prefer reading 1–2 targeted docs over skimming many. If uncertain which applies, ask
  the user before reading more than two.

# Keeping this skill current

If `docs/index.md` is edited (new files added, renames, removals), update the inlined
index above so this skill stays the single source of truth at skill-load time.