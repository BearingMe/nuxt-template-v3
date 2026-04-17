# Como criar uma mutation

Este guia mostra como criar uma mutation de escrita de dados usando Vue Query neste projeto.

---

## Antes de começar

Você precisa saber:

- Qual recurso da API você vai modificar (ex: `users`, `orders`)
- Qual ação será executada (ex: criar, atualizar, deletar)
- Quais campos o endpoint espera receber no corpo da requisição

---

## Passo 1: Crie o arquivo de mutations

Crie o arquivo em `app/api/<recurso>/mutations.ts`. Se o diretório do recurso ainda não existir, crie-o.

```
app/
  api/
    users/
      mutations.ts   ← crie aqui
```

---

## Passo 2: Defina o DTO

O DTO representa os dados enviados para a API. Ele deve viver **no mesmo arquivo da mutation** e seguir o nome da função sem o prefixo `use`.

```ts
// app/api/users/mutations.ts

export interface CreateUser {
  name: string;
  email: string;
}
```

| Função           | DTO           |
| ---------------- | ------------- |
| `useCreateUser`  | `CreateUser`  |
| `useUpdateOrder` | `UpdateOrder` |
| `useDeleteRoom`  | `DeleteRoom`  |

---

## Passo 3: Escreva a mutation

Importe `useMutation` do `@tanstack/vue-query` e exporte a função com o nome correto.

**Regra de nomenclatura:** `useAcaoRecurso` — ação em inglês, recurso em inglês, PascalCase.

```ts
// app/api/users/mutations.ts
import type { User } from "~/types/entities";
import { useMutation } from "@tanstack/vue-query";

export interface CreateUser {
  name: string;
  email: string;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: CreateUser): Promise<User> =>
      $fetch("/api/users", { method: "POST", body: data }),
  });
};
```

---

## Passo 4: Use a mutation no componente

Importe e chame a mutation dentro do `<script setup>`. Use `mutate` ou `mutateAsync` para disparar a ação.

```vue
<script setup lang="ts">
import { useCreateUser } from "~/api/users/mutations";

const { mutate, isPending } = useCreateUser();

function handleSubmit(form: { name: string; email: string }) {
  mutate(form);
}
</script>
```

---

## Referência rápida

| Situação                     | O que fazer                          |
| ---------------------------- | ------------------------------------ |
| Ação cria um recurso         | Nome: `useCreateRecurso`             |
| Ação atualiza um recurso     | Nome: `useUpdateRecurso`             |
| Ação deleta um recurso       | Nome: `useDeleteRecurso`             |
| Dados enviados ao endpoint   | Defina um DTO no mesmo arquivo       |
| Resposta é uma entidade      | Use o tipo de `~/types/entities`     |
| Precisa aguardar o resultado | Use `mutateAsync` em vez de `mutate` |
