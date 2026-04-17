# Shadcn Style Guide

Componentes do shadcn são **primitivos de UI**. Eles formam a base do design system. O comportamento padrão é sagrado e nunca deve ser quebrado — estilo é livre, comportamento não.

### 1. Comportamento é sagrado

Nunca remova props, eventos ou slots que já existem no componente original. Extensões são permitidas, remoções não.

```vue
<!-- ❌ INCORRETO: removendo comportamento padrão -->
<script setup>
// Removeu o 'disabled' que o componente original suportava
const props = defineProps<{ label: string }>()
</script>

<!-- ✅ CORRETO: estendendo sem quebrar -->
<script setup>
const props = defineProps<{
  label: string
  loading?: boolean // extensão própria
}>()
</script>
```

### 2. Estilo é livre — tema direto no primitivo é recomendado

Você pode alterar o visual como quiser: via variáveis CSS globais, ou diretamente nas classes do componente primitivo. Tematizar o próprio primitivo é até preferível a aplicar estilos localmente em cada uso.

```css
/* ✅ Via variáveis globais */
:root {
  --primary: oklch(0.5 0.2 250);
  --radius: 0.5rem;
}
```

```vue
<!-- ✅ Também correto: ajustar classes diretamente no primitivo -->
<!-- components/ui/button.vue -->
<template>
  <button class="rounded-full font-semibold tracking-wide ...">
    <slot />
  </button>
</template>
```

```vue
<!-- ⚠️ Evitar: tematizar localmente em cada uso -->
<!-- Prefira ajustar o primitivo uma vez a repetir classes em todo lugar -->
<Button class="rounded-full font-semibold" />
<Button class="rounded-full font-semibold" />
<Button class="rounded-full font-semibold" />
```

### 3. Extensão via composição

Se precisar de um comportamento extra, crie um novo componente que envolve o primitivo. Não edite o primitivo diretamente para casos específicos.

```vue
<!-- components/App/AppLoadingButton.vue -->
<script setup lang="ts">
import { Button } from "~/components/ui/button";

const props = defineProps<{
  loading?: boolean;
}>();
</script>

<template>
  <Button v-bind="$attrs" :disabled="loading">
    <span v-if="loading">Carregando...</span>
    <slot v-else />
  </Button>
</template>
```

### 4. Localização dos primitivos

Componentes gerados pelo shadcn vivem em `components/ui/`. Essa pasta é gerenciada pelo CLI do shadcn.

```sh
components/
└── ui/          # Primitivos shadcn — gerenciado pelo CLI
    ├── button.vue
    ├── input.vue
    └── ...
└── App/         # Componentes de produto que estendem os primitivos
    └── AppLoadingButton.vue
```

> **Nota:** A pasta `components/ui/` não segue a convenção de nomenclatura do Vue (onde arquivos deveriam se chamar `UiButton.vue`, `UiInput.vue`, etc.). Isso é intencional — é a convenção do shadcn e deve ser respeitada. **Não replique esse padrão de nomenclatura em nenhuma outra pasta do projeto.**
