<script setup lang="ts">
import { useCats } from "@/api/cats/queries";

definePageMeta({ layout: "default" });

const { data: cats, isPending, isError, refetch } = useCats(12);
</script>

<template>
  <div class="py-8">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Cat Timeline</h1>
        <p class="text-muted-foreground mt-1">A curated feed of the internet's finest cats.</p>
      </div>
      <button
        class="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors"
        @click="refetch"
      >
        Refresh
      </button>
    </div>

    <div v-if="isPending" class="flex flex-col gap-6">
      <div v-for="n in 4" :key="n" class="bg-muted h-64 w-full animate-pulse rounded-xl"></div>
    </div>

    <div v-else-if="isError" class="text-muted-foreground py-24 text-center">
      Failed to load cats. The cats are unavailable.
    </div>

    <div v-else class="flex flex-col gap-6">
      <article
        v-for="cat in cats"
        :key="cat.id"
        class="border-border bg-card overflow-hidden rounded-xl border"
      >
        <img
          :src="cat.url"
          :alt="cat.breeds?.[0]?.name ?? 'A cat'"
          class="max-h-96 w-full object-cover"
        />

        <div v-if="cat.breeds?.length" class="p-4">
          <h2 class="text-lg font-semibold">{{ cat.breeds[0].name }}</h2>
          <p class="text-muted-foreground mt-0.5 text-sm">
            {{ cat.breeds[0].origin }} · {{ cat.breeds[0].temperament }}
          </p>
          <p class="mt-2 text-sm">{{ cat.breeds[0].description }}</p>
        </div>
      </article>
    </div>
  </div>
</template>
