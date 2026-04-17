# Como estender um componente shadcn

Este guia mostra como customizar ou estender componentes shadcn sem quebrar seu comportamento original.

---

## Antes de começar

Entenda a distinção fundamental:

- **Estilo é livre** — você pode mudar qualquer coisa visual
- **Comportamento é sagrado** — nunca remova props, eventos ou slots que o componente original suporta

---

## Passo 1: Identifique o que você precisa

| Necessidade                                 | Abordagem                                                   |
| ------------------------------------------- | ----------------------------------------------------------- |
| Mudar a aparência global do componente      | Edite o primitivo diretamente ou use variáveis CSS          |
| Adicionar comportamento extra (ex: loading) | Crie um novo componente que envolve o primitivo             |
| Ajuste visual pontual em um uso específico  | Passe classes via `class` — mas prefira ajustar o primitivo |

---

## Passo 2a: Tematizar globalmente

Se a mudança deve se aplicar a todos os usos do componente, edite o primitivo diretamente em `components/ui/` ou use variáveis CSS globais.

**Via variáveis CSS** (preferível para cores e raios):

```css
/* app/assets/css/main.css */
:root {
  --primary: oklch(0.5 0.2 250);
  --radius: 0.5rem;
}
```

**Via classes no primitivo** (preferível para tipografia e forma):

```vue
<!-- components/ui/button.vue -->
<template>
  <button class="rounded-full font-semibold tracking-wide ...">
    <slot />
  </button>
</template>
```

Ajuste o primitivo uma vez em vez de repetir classes em cada uso:

```vue
<!-- ⚠️ Evitar — repetição em cada uso -->
<Button class="rounded-full font-semibold" />
<Button class="rounded-full font-semibold" />
```

---

## Passo 2b: Adicionar comportamento via composição

Se precisar de comportamento extra que não existe no primitivo (ex: estado de loading, ícone fixo, lógica de confirmação), crie um novo componente em `components/app/` que envolve o primitivo.

```vue
<!-- components/app/AppLoadingButton.vue -->
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

O `v-bind="$attrs"` garante que todas as props e eventos do `Button` original continuam funcionando.

---

## Passo 3: Verifique que o contrato original está intacto

Antes de finalizar, confirme:

- [ ] Nenhuma prop existente foi removida
- [ ] Nenhum evento existente foi removido
- [ ] Nenhum slot existente foi removido
- [ ] O componente ainda aceita `class` para customização pontual pelo consumidor

```vue
<!-- ❌ Incorreto — removeu props do original -->
<script setup>
const props = defineProps<{ label: string }>()
// 'disabled', 'variant', 'size' sumiram
</script>

<!-- ✅ Correto — estende sem remover -->
<script setup>
const props = defineProps<{
  loading?: boolean  // adição própria
}>()
// props originais chegam via $attrs
</script>
```

---

## Referência rápida

| Situação                              | O que fazer                                    |
| ------------------------------------- | ---------------------------------------------- |
| Mudar cor ou raio globalmente         | Variável CSS em `main.css`                     |
| Mudar forma ou tipografia globalmente | Edite as classes em `components/ui/`           |
| Adicionar estado ou lógica extra      | Crie wrapper em `components/app/`              |
| Nunca fazer                           | Remover props, eventos ou slots do primitivo   |
| Nunca fazer                           | Editar `components/ui/` para casos específicos |
