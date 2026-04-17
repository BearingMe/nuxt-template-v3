# Como criar uma query

Este guia mostra como criar uma query de busca de dados usando Vue Query neste projeto.

---

## Antes de começar

Você precisa saber:

- Qual recurso da API você vai buscar (ex: `orders`, `users`)
- Se a busca retorna uma entidade única ou uma listagem
- Se a resposta tem campos além da entidade em si (ex: paginação)

---

## Passo 1: Crie o arquivo de queries

Crie o arquivo em `app/api/<recurso>/queries.ts`. Se o diretório do recurso ainda não existir, crie-o.

```
app/
  api/
    orders/
      queries.ts   ← crie aqui
```

---

## Passo 2: Defina o tipo de resposta (se necessário)

Se a resposta da API for uma listagem ou contiver campos além da entidade (como metadados de paginação), defina um tipo de resposta **dentro do próprio arquivo de queries**. Não coloque esse tipo em `app/types/entities`.

```ts
// app/api/orders/queries.ts
import type { Order } from "~/types/entities";

export interface OrdersResponse {
  data: Order[];
  meta: {
    total: number;
    currentPage: number;
  };
}
```

Se a resposta for apenas a entidade diretamente (sem wrapper), pule este passo e use o tipo da entidade diretamente.

---

## Passo 3: Escreva a query

Importe `useQuery` do `@tanstack/vue-query` e exporte a função com o nome correto.

**Regra de nomenclatura:**

- Entidade única: `useUser`, `useOrder`
- Listagem: `useUsers`, `useOrders`

```ts
// app/api/orders/queries.ts
import { useQuery } from "@tanstack/vue-query";
import type { Order } from "~/types/entities";

export interface OrdersResponse {
  data: Order[];
  meta: {
    total: number;
    currentPage: number;
  };
}

export const useOrders = (page: number) => {
  return useQuery({
    queryKey: ["orders", page],
    queryFn: (): Promise<OrdersResponse> => $fetch("/api/orders", { query: { page } }),
  });
};
```

---

## Passo 4: Monte a `queryKey`

A `queryKey` identifica e cacheia a query. Siga este padrão:

- Sem parâmetros: `["orders"]`
- Com parâmetros: `["orders", page]`, `["orders", id]`

Inclua na key todos os valores que, quando mudam, devem refazer a busca.

---

## Passo 5: Use a query no componente

Importe e chame a query dentro do `<script setup>` do componente.

```vue
<script setup lang="ts">
import { useOrders } from "~/api/orders/queries";

const { data, isPending, isError } = useOrders(1);
</script>
```

---

## Referência rápida

| Situação                          | O que fazer                                  |
| --------------------------------- | -------------------------------------------- |
| Resposta é só a entidade          | Use o tipo de `~/types/entities` diretamente |
| Resposta tem paginação ou wrapper | Defina `XxxResponse` no arquivo de queries   |
| Busca entidade única              | Nome: `useRecurso` (singular)                |
| Busca listagem                    | Nome: `useRecursos` (plural)                 |
| Query tem parâmetros              | Inclua todos na `queryKey`                   |
