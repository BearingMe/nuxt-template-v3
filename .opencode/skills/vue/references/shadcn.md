# Shadcn Reference

## Core Rule

Shadcn components are **UI primitives**. Styling is free. Behavior is sacred.

You can change any visual aspect — inside or outside the component. You must never remove props, events, or slots that the original component exposes.

## Styling

Theme changes are welcome and even recommended directly inside the primitive. Prefer adjusting the primitive once over applying classes locally at every usage site.

```css
/* ✅ Via global CSS variables */
:root {
  --primary: oklch(0.5 0.2 250);
  --radius: 0.5rem;
}
```

```vue
<!-- ✅ Also fine: adjust classes directly in the primitive -->
<!-- components/ui/button.vue -->
<template>
  <button class="rounded-full font-semibold tracking-wide ...">
    <slot />
  </button>
</template>
```

```vue
<!-- ⚠️ Avoid: repeating style overrides at every usage -->
<Button class="rounded-full font-semibold" />
<Button class="rounded-full font-semibold" />
```

## Extending Behavior

For behavior extensions, wrap the primitive in a new component. Never edit the primitive directly for a specific use case.

```vue
<!-- components/App/AppLoadingButton.vue -->
<script setup lang="ts">
import { Button } from '~/components/ui/button'

const props = defineProps<{ loading?: boolean }>()
</script>

<template>
  <Button v-bind="$attrs" :disabled="loading">
    <span v-if="loading">Loading...</span>
    <slot v-else />
  </Button>
</template>
```

## Extending Props

When adding new props to a primitive, always keep the originals intact.

```vue
<!-- ❌ Wrong: removed existing props -->
<script setup>
const props = defineProps<{ label: string }>()
</script>

<!-- ✅ Correct: extended without breaking -->
<script setup>
const props = defineProps<{
  label: string
  loading?: boolean  // added
}>()
</script>
```

## File Structure

```
components/
├── ui/     # Shadcn primitives — managed by the CLI
│   ├── button.vue
│   └── input.vue
└── App/    # Product components that wrap primitives
    └── AppLoadingButton.vue
```

> **Note:** `components/ui/` does not follow Vue's naming convention (files would normally be `UiButton.vue`, `UiInput.vue`, etc.). This is intentional — it's the shadcn convention and should be respected. Do **not** replicate this flat naming pattern anywhere else in the project.
