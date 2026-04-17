# Como criar uma página

Este guia mostra como criar uma página Nuxt neste projeto, seguindo as convenções de roteamento, auto-imports e separação de responsabilidades.

---

## Antes de começar

Tenha em mente:

- Páginas orquestram — elas detêm chamadas de API, validação de negócio e gerenciamento de estado
- Páginas não contêm lógica de renderização detalhada — isso é responsabilidade dos componentes
- Nunca importe `ref`, `computed` ou funções do Vue/Nuxt manualmente — são auto-importados

---

## Passo 1: Crie o arquivo na pasta correta

Páginas vivem em `app/pages/`. Siga o padrão REST para nomear os arquivos:

```
pages/
└── products/
    ├── index.vue        # Listagem
    ├── create.vue       # Formulário de criação
    └── [id]/
        ├── view.vue     # Detalhes
        └── update.vue   # Edição
```

O nome do arquivo vira a rota automaticamente. `products/index.vue` → `/products`, `products/create.vue` → `/products/create`.

---

## Passo 2: Defina o layout

Envolva o template com o layout correto usando `<NuxtLayout>`.

```vue
<template>
  <NuxtLayout name="default">
    <!-- conteúdo da página -->
  </NuxtLayout>
</template>
```

---

## Passo 3: Busque os dados necessários

Chame as queries diretamente na página. Não delegue chamadas de API para componentes filhos (a menos que o componente seja condicional ou lazy — veja o guia de queries).

```vue
<script setup lang="ts">
const route = useRoute();
const orderId = route.params.id as string;

const { data: order } = await useOrder(orderId);
</script>
```

Use `await` para queries que a página precisa antes de renderizar. Para dados secundários, omita o `await`.

---

## Passo 4: Defina os handlers

Handlers são funções que respondem a eventos dos componentes filhos. Eles ficam na página porque é aqui que vive a lógica de negócio.

```vue
<script setup lang="ts">
const route = useRoute();
const orderId = route.params.id as string;

const { data: order } = await useOrder(orderId);
const { mutate: updateOrder } = useUpdateOrder();

async function handleUpdate(payload: UpdateOrder) {
  updateOrder({ id: orderId, ...payload });
}
</script>
```

---

## Passo 5: Monte o template

Passe dados e handlers para os componentes filhos via props e eventos. A página não deve ter marcação detalhada — delegue para componentes.

```vue
<template>
  <NuxtLayout name="default">
    <OrderForm :initial-data="order" @submit="handleUpdate" />
  </NuxtLayout>
</template>
```

---

## Exemplo completo

```vue
<!-- pages/orders/[id]/update.vue -->
<script setup lang="ts">
const route = useRoute();
const orderId = route.params.id as string;

const { data: order } = await useOrder(orderId);
const { mutate: updateOrder } = useUpdateOrder();

async function handleUpdate(payload: UpdateOrder) {
  updateOrder({ id: orderId, ...payload });
}
</script>

<template>
  <NuxtLayout name="default">
    <OrderForm :initial-data="order" @submit="handleUpdate" />
  </NuxtLayout>
</template>
```

---

## Referência rápida

| Situação                              | O que fazer                       |
| ------------------------------------- | --------------------------------- |
| Listagem de recursos                  | `pages/<recurso>/index.vue`       |
| Formulário de criação                 | `pages/<recurso>/create.vue`      |
| Detalhes de um item                   | `pages/<recurso>/[id]/view.vue`   |
| Edição de um item                     | `pages/<recurso>/[id]/update.vue` |
| Dados necessários antes de renderizar | Use `await` na query              |
| Dados secundários                     | Omita o `await`                   |
| Lógica de negócio                     | Fica na página, não no componente |
| Importar `ref`, `useRoute`, etc.      | Não importe — são auto-importados |
