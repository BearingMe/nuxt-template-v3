# Nuxt 4 Reference

## Auto-imports

Never manually import Vue or Nuxt primitives. If you see an import from `vue` or `#app` for basic functions, remove it.

```ts
// ❌ Wrong
import { ref, computed } from 'vue'
import { useRoute } from '#app'

// ✅ Correct — use them directly
const route = useRoute()
const count = ref(0)
```

## Directory Structure

Each file has its place. Don't invent new locations.

```
app/
├── components/   # Pure UI components
├── composables/  # Reusable state and business logic
├── pages/        # Route definitions and layout orchestration only
├── middleware/   # Route guards
├── layouts/      # Layout wrappers
├── plugins/      # App-level plugins
└── utils/        # Stateless helper functions
```

- `/pages` — routing and layout orchestration only, no business logic
- `/composables` — all reusable state or business logic
- `/components` — pure UI, no direct API calls

## Composable Naming

The filename dictates the auto-import name. Always match them.

```
composables/useUser.ts → export const useUser = ...
composables/useOrders.ts → export const useOrders = ...
```

Don't put composable logic in `services/` or `utils/` folders.

## REST-style Page Routing

Pages should reflect explicit actions on resources to keep URLs predictable.

```
pages/
└── products/
    ├── index.vue        # List
    ├── create.vue       # Create form
    └── [id]/
        ├── view.vue     # Detail
        └── update.vue   # Edit form
```

## Example Page

```vue
<script setup lang="ts">
const route = useRoute()
const { updateOrder } = useOrders()

const orderId = route.params.uuid as string
const { data: order } = await useFetchOrder(orderId)

async function handleUpdate(payload: UpdateOrderDto) {
  await updateOrder(orderId, payload)
}
</script>

<template>
  <OrderForm :initial-data="order" @submit="handleUpdate" />
</template>
```
