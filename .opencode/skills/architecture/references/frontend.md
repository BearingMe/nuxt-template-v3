# Frontend Architecture Cheat Sheet

## 1. Hierarchy Rule

Page → Component → Primitive

- **Page**: owns all business logic, orchestrates state and API calls
- **Component**: renders primitives, may have minor derived state, horizontal composition
- **Primitive**: stateless, pure render (Button, Input, Text, third-party UI)

Never exceed 3 levels. If tempted for a 4th, check: is it logic (goes to page/hook) or structure (flatten, reuse primitives).

**Counting levels:** Hierarchy depth is measured from the consumer's perspective. Internal composition within a primitive is encapsulation, not a new level. If `FormText` uses `Input` internally, that's an implementation detail — `FormText` is still a primitive to whoever imports it. Only the levels visible to the consumer count.

Example:

```
Login (page)
└── LoginForm (component)
    ├── FormText (primitive)      ← uses Input internally — doesn't count as a 4th level
    └── FormPassword (primitive)  ← same: internal Input is encapsulated
```

Three consumer-facing levels. The nesting inside `FormText` is its own business.

**Why this matters:** If internal composition counted, every primitive that uses another primitive would break the 3-level rule. A `Select` uses `Popover` uses `Portal` — three levels of primitives alone. But from the consumer's perspective, it's just `Select`.

---

## 2. Line Count Thresholds

| Type      | LOC Threshold | Action                                                        |
| --------- | ------------- | ------------------------------------------------------------- |
| Page      | > 200 LOC     | Split into screen-specific components. Logic stays in page    |
| Component | > 100 LOC     | Consider creating compound components (sub-components inside) |
| Primitive | < 50 LOC      | Keep flat. Stateless render                                   |

These thresholds are signals, not hard rules. Clarity and consistency matter more.

---

## 3. Logic Ownership

- **Page first**: all API calls, validation, state management, orchestration
- **Component**: receives props and callbacks; minor derived state allowed
- **Hooks / Composables / Equivalents**: for logic shared across multiple pages, OR when a page's logic is dense enough that extracting a cohesive unit of behavior improves readability — even if used only once. The test: does the extracted piece represent a single, nameable responsibility? If so, extract it. If it's just "the top half of the page moved elsewhere," leave it inline.
- **Primitive**: no logic, just render

---

## 4. Props vs Composition

- **Props**: simple variations, one-off cases
- **Compound Components / Slots**: when a component has 3+ named sections that are always used together, or when the same structural pattern repeats across instances

Default: prefer props unless structure repeats or has 3+ co-dependent sections.

---

## 5. Folder Organization

> **Note:** The structure below is an example, not a prescription. Adapt it to your framework's conventions first — your framework's opinions always take priority. Next.js, Nuxt, SvelteKit, Remix, Astro, and others each dictate their own routing and file layout. Use this as a mental model for _separation of concerns_, then map it onto whatever your framework expects.

Example (generic SPA):

```
components/ui/          → primitives (Button, Input, Text, Icon)
components/common/      → shared components used across multiple pages
components/<screen>/    → page-specific components (FormSection, CardSection)
pages/<screen>.tsx      → page-level orchestrator
hooks/                  → shared logic (or composables/, utils/, etc.)
```

The principle behind the structure:

- Pages orchestrate, components render, primitives purely render
- Shared logic lives in a dedicated directory (hooks, composables, helpers — whatever the ecosystem calls them)
- Page-specific extractions stay colocated with their page or screen

---

## 6. Consistency Rules

- Consistency beats cleverness
- Naming, folder structure, prop patterns, hook usage → predictable
- Reuse only when logic or structure is repeated and stable

---

## TL;DR

1. **Hierarchy**: Page → Component → Primitive (max 3 consumer-facing levels; internal primitive composition is encapsulation, not a new level)
2. **LOC thresholds**: Page > 200 → extract components; Component > 100 → compound; Primitive < 50
3. **Props vs composition**: small variations = props; 3+ co-dependent sections or repeated structure = compound
4. **Logic ownership**: page owns, components render, primitives pure, hooks/composables for shared logic or cohesive single-use extraction
5. **Folders**: follow your framework first, then separate by concern — primitives, shared, screen-specific
6. **Consistency**: predictable over clever; community standards above personal preference
