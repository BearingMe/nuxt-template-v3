# Como criar um componente

Este guia mostra como criar um componente Vue neste projeto, do arquivo à estrutura interna.

---

## Antes de começar

Responda estas perguntas antes de criar o arquivo:

1. **Qual nível é este componente?** Página, componente ou primitivo?
2. **Quem detém a lógica?** Chamadas de API e validação de negócio pertencem à página, não ao componente.
3. **Já existe algo parecido?** Verifique `components/ui/` e `components/app/` antes de criar.

---

## Passo 1: Escolha onde criar o arquivo

A localização depende do nível e do escopo do componente:

| Tipo                                                         | Onde criar              |
| ------------------------------------------------------------ | ----------------------- |
| Primitivo (Button, Input, Text)                              | `components/ui/`        |
| Componente sem domínio claro, ou domínio com 1–2 componentes | `components/app/`       |
| Domínio com 3+ componentes sempre usados juntos              | `components/<domínio>/` |

Uma pasta de domínio só se justifica quando há 3 ou mais componentes que pertencem ao mesmo contexto de negócio (ex: `user/`, `billing/`). Antes disso, `components/app/` é o lugar certo.

O nome do arquivo deve usar o nome da pasta pai como prefixo, em PascalCase. A pasta sempre em kebab-case e lowercase.

```
components/
  user/
    UserCard.vue       ✅
    UserAvatar.vue     ✅
  User/                ❌ PascalCase em pasta — não usar
  userCard/            ❌ camelCase em pasta — não usar
```

---

## Passo 2: Estruture o script setup

Organize o `<script setup>` em três blocos, nesta ordem:

**1. Contrato do componente (macros)**

```ts
const props = defineProps<{
  userId: string;
  label?: string;
}>();

const model = defineModel<string>();
const emit = defineEmits(["save"]);
```

**2. Estado e lógica (reatividade)**

```ts
const isLoading = ref(false);
const upperLabel = computed(() => props.label?.toUpperCase());
```

Use `ref` por padrão. Use `reactive` apenas para agrupamentos densos de formulário.

**3. Handlers e efeitos colaterais**

```ts
function handleSave() {
  emit("save", model.value);
}

onMounted(() => {
  // inicialização
});
```

---

## Passo 3: Escreva o template

- Componentes Vue em PascalCase
- Componentes sem slot devem ser self-closing
- Elementos HTML sempre com fechamento explícito

```vue
<template>
  <div class="user-input-group">
    <label>{{ upperLabel }}</label>
    <input v-model="model" type="text" />
    <VoltButton :loading="isLoading" @click="handleSave" />
  </div>
</template>
```

---

## Passo 4: Verifique a hierarquia

Antes de finalizar, confirme que o componente está no nível correto:

- **Primitivo**: sem estado, sem chamadas de API, renderização pura
- **Componente**: recebe props e callbacks; estado derivado simples é permitido; chamadas de API ficam na página
- **Página**: orquestra tudo — API, estado, validação de negócio

A hierarquia máxima é **3 níveis visíveis ao consumidor**: Página → Componente → Primitivo. Se sentir necessidade de um 4º nível, mova a lógica para a página ou para um composable.

**Exceção de query no componente:** se o componente não é sempre renderizado (está sob `v-if` ou é lazy loaded), ele pode conter sua própria query. Se é sempre visível, a query pertence à página.

---

## Exemplo completo

```vue
<!-- components/user/UserInputGroup.vue -->
<script setup lang="ts">
// 1. Contrato
const props = defineProps<{
  userId: string;
  label?: string;
}>();

const model = defineModel<string>();
const emit = defineEmits(["save"]);

// 2. Estado e lógica
const isLoading = ref(false);
const upperLabel = computed(() => props.label?.toUpperCase());

// 3. Handlers
function handleSave() {
  emit("save", model.value);
}
</script>

<template>
  <div class="user-input-group">
    <label>{{ upperLabel }}</label>
    <input v-model="model" type="text" />
    <VoltButton :loading="isLoading" @click="handleSave" />
  </div>
</template>
```

---

## Referência rápida

| Situação                                 | O que fazer                                             |
| ---------------------------------------- | ------------------------------------------------------- |
| Componente sem domínio claro             | Coloque em `components/app/`                            |
| Domínio com 3+ componentes               | Crie `components/<domínio>/`                            |
| Precisa de chamada de API                | Mova a query para a página (ou use composable)          |
| Componente sob `v-if` ou lazy            | Pode ter query própria                                  |
| Mais de 5–6 props                        | Sinal de responsabilidade demais — considere composição |
| Template com seções claramente separadas | Considere extrair componentes filhos                    |
