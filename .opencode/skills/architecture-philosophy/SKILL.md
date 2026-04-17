---
name: architecture-philosophy
description: Guiding principles for software architecture decisions. Use this skill whenever proposing code structure, folder organization, abstractions, design patterns, or architectural decisions of any kind. Also trigger when the user asks "how should I structure this?", "is this over-engineered?", "should I abstract this?", or when the agent is about to suggest a pattern, layer, or abstraction. This skill defines what Simple, Complex, and Complicated mean and enforces a strict priority system for architectural choices. Always consult this before recommending any architectural approach.
---

# Architecture Philosophy

This skill defines the architectural mindset for every solution proposed. Read it. Internalize it. Apply it to every structural decision.

## Core Definitions

### Simple

A solution is **simple** when:

- It has few moving parts, each with a clear, single responsibility.
- The flow of data and control is obvious to someone reading the code for the first time.
- There is no indirection without a concrete reason. You can trace a request from entry to exit without jumping through layers that exist "just in case."
- It follows the conventions of the framework or library in use — not fighting the tool, but leaning into it.

Simple does not mean easy. A well-organized, convention-following codebase can be simple and still require effort to understand because the domain itself is hard. That's fine. The architecture should not be the source of difficulty — the problem should be.

### Complex

A solution is **complex** when:

- It has multiple interacting parts, but each part exists because the problem genuinely demands it.
- The interactions between components are necessary, not speculative.
- Removing any piece would leave a real, present requirement unmet.

Complexity is acceptable when the problem is inherently complex. A payment system with fraud detection, retry logic, and webhook handling is complex because payments are complex. The architecture mirrors the problem — no more, no less.

### Complicated

A solution is **complicated** when:

- It has layers, abstractions, or indirections that do not map to a real, current requirement.
- Someone must understand the "architecture" before they can understand the "feature."
- Patterns are applied because they might be useful someday, not because they solve a problem today.
- The codebase fights the framework instead of embracing its conventions.

Complicated is the enemy. It is complexity that serves the architect, not the problem.

## The Rule

**Simple is better than Complex. Complex is better than Complicated.**

Always aim for simple first. Accept complexity only when the problem forces it. Never accept complicated.

## Priority System

When making any architectural decision, follow these priorities in strict order:

### 1. Community Patterns (Severity: Critical)

The conventions established by the framework or library community are the highest authority. These patterns exist because thousands of developers have already solved the same problems and converged on what works.

- **Follow the framework's way of doing things.** If Next.js expects file-based routing, use file-based routing. If Django expects apps with models/views/urls, structure your code that way. If NestJS expects modules/controllers/services, use that structure.
- **Do not invent your own patterns** when the community already has established ones.
- **Recognize that communities often have multiple valid patterns.** Rails has both concerns and service objects. React has both Redux and Zustand. Express has both controller-based and route-based organization. Be open to discussing which pattern fits the specific situation, and be receptive when the user prefers one over another.
- **When multiple patterns exist**, prefer the one that is simpler for the current scale of the project, unless the user has a stated preference or a concrete reason to choose otherwise.

### 2. YAGNI — You Aren't Gonna Need It (Severity: High)

This is the mantra. No speculative architecture.

- Do not add abstraction layers for "future flexibility."
- Do not create interfaces or protocols for components that have only one implementation.
- Do not build plugin systems, event buses, or strategy patterns unless there is a present, concrete need.
- If the user says "we might need X later," the answer is: "We'll add it when we need it. Right now, we keep it simple."

The cost of adding something later when you actually need it is almost always lower than the cost of maintaining speculative architecture you might never use.

### 3. KISS — Keep It Simple (Severity: Medium)

Simplicity is the goal, not the constraint. Pursue the simplest solution that correctly solves the present problem within community patterns.

- Prefer flat structures over nested ones.
- Prefer explicit code over clever abstractions.
- Prefer fewer files doing clear things over many files doing vague things.
- If a junior developer can't follow the code path within a few minutes, it's probably not simple enough.

Remember: simple is not the same as easy. A simple architecture may be hard to build. That's OK. The goal is that it's easy to understand and maintain once built.

### 4. DRY — Don't Repeat Yourself (Severity: Low)

Not all repetition is a problem. Premature abstraction causes more damage than a bit of duplication.

**When to abstract:**

- A block of code is repeated **three or more times** (the Rule of Three).
- A **large block** of code (roughly 10+ lines doing the same logical operation) is repeated even twice.
- The repeated code is a clear **utility or helper** — formatting, validation, data transformation — that has a stable interface.

**When NOT to abstract:**

- Two pieces of code look similar but serve different domains or have different reasons to change.
- The abstraction would require passing many parameters or configuration options to handle all cases — this is a sign the cases aren't actually the same.
- You don't yet understand the system well enough to know if the similarity is coincidental or structural.

**The test:** Before abstracting, ask: "If one of these changes, should the other change too?" If the answer is "not necessarily," they are not duplicates — they are coincidences.

## How to Apply This

When proposing any solution:

1. **Check community patterns first.** What does the framework/library ecosystem recommend? Start there.
2. **Strip away anything speculative.** Does every component, layer, and file exist because of a present requirement? If not, remove it.
3. **Simplify.** Can the remaining structure be flattened, reduced, or made more explicit without losing correctness?
4. **Tolerate duplication.** Only abstract when the repetition is proven and the abstraction is stable.

When reviewing or refactoring existing code:

- Do not add layers. Ask "what can I remove?" before "what should I add?"
- If the current structure works and follows community patterns, it's fine. Don't refactor for aesthetics.
- If the user asks for a "clean architecture" or "proper structure," clarify what problem they're solving. Often the answer is "organize by feature" or "follow the framework conventions," not "add six layers of abstraction."

## Examples

**User asks:** "Should I create a repository pattern for my Express app?"
**Think:** Express community doesn't prescribe repositories. The app has one database. There's no plan to swap databases. → YAGNI. Query the database directly from your route handlers or a thin service layer if logic is shared.

**User asks:** "I have the same validation logic in three endpoints."
**Think:** Three repetitions, clear utility function candidate. → Extract a validation helper. This is a good DRY application.

**User asks:** "Should I set up a dependency injection container?"
**Think:** Does the framework use DI natively (like NestJS)? If yes → follow the community pattern. If no (like Express or Fastify) → YAGNI. Pass dependencies explicitly or use simple module imports.

**User asks:** "I have two functions that both format dates but for different contexts."
**Think:** They look similar but serve different purposes and may diverge. → Tolerate the duplication for now. If they stay identical after the system matures, then consider extracting.

