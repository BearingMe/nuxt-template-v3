import { useQuery } from "@tanstack/vue-query";
import type { Cat } from "~/types/entities";

export const useCats = (limit = 10) => {
  const { $api } = useNuxtApp();

  return useQuery({
    queryKey: ["cats", limit],
    queryFn: async (): Promise<Cat[]> => {
      const res = await $api.get("/images/search", { params: { limit, has_breeds: 1 } });
      return res.data;
    },
  });
};
