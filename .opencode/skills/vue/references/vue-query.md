# Vue Query Reference

## File Organization

All query hooks live under `app/api/<resource>/`, split into two files:

```
app/api/
└── orders/
    ├── queries.ts    # Read operations (useQuery)
    └── mutations.ts  # Write operations (useMutation)
```

## Queries

```ts
// app/api/orders/queries.ts
import { useQuery } from '@tanstack/vue-query'
import type { Order } from '~/types/entities'

// Complex response types live here — not in entities
export interface OrdersResponse {
  data: Order[]
  meta: { total: number; currentPage: number }
}

export const useOrders = (page: number) => {
  return useQuery({
    queryKey: ['orders', page],
    queryFn: (): Promise<OrdersResponse> => $fetch('/api/orders', { query: { page } })
  })
}
```

## Mutations

```ts
// app/api/users/mutations.ts
import { useMutation } from '@tanstack/vue-query'
import type { User } from '~/types/entities'

// DTOs live in the mutation file, named after the hook
export interface CreateUser {
  name: string
  email: string
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: CreateUser): Promise<User> =>
      $fetch('/api/users', { method: 'POST', body: data })
  })
}
```

## Type Management

| Type | Where it lives | Rule |
|---|---|---|
| **Entity** | `app/types/entities` | Anything with a `uuid` from the API |
| **DTO** | Same file as its mutation | Named after the hook (`useCreateUser` → `CreateUser`) |
| **Complex response** | Same file as its query | Listagem responses, composite types |

## Naming Convention (Apollo pattern)

- `useUser` — single entity query
- `useUsers` — list query
- `useCreateUser` — create mutation
- `useUpdateOrder` — update mutation
- `useDeleteProduct` — delete mutation

Always use `$fetch` inside `queryFn` and `mutationFn`.
