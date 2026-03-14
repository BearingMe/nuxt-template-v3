# Vue 3 Reference

## Script Setup Order

Organize by "authority level" — start with what defines the component's contract.

```vue
<script setup lang="ts">
// 1. Macros (contract definition)
const props = defineProps<{
  userId: string
  label?: string
}>()

const model = defineModel<string>()
const emit = defineEmits(['save'])

// 2. State & Hooks (reactivity)
const usersStore = useUsers()
const isLoading = ref(false)
const upperLabel = computed(() => props.label?.toUpperCase())

// 3. Lifecycle & Side Effects
onMounted(() => { ... })

// 4. Handlers
function handleSave() {
  emit('save', model.value)
}
</script>
```

## Reactivity

Use `ref` by default for consistency — it's always identifiable by `.value` in the script.
Use `reactive` only for dense, inseparable form objects.

```ts
// ✅ Default
const name = ref('John')
const age = ref(30)

// ✅ Exception: tightly grouped form data
const form = reactive({ email: '', password: '' })
```

## Component Naming

Name components after their parent folder to prevent scope conflicts.
Folders are always lowercase kebab-case. Never PascalCase or camelCase.

```
components/
└── user/
    ├── UserCard.vue
    └── UserAvatar.vue

// ❌ Wrong
components/
└── User/       // PascalCase — never
└── userCard/   // camelCase — never
```

## Template Conventions

- Vue components in PascalCase
- Components without slots must be self-closing
- Native HTML elements always use explicit closing tags

```vue
<template>
  <UserCard :id="123" />
  <div></div>
</template>
```
