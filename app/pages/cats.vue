<script setup lang="ts">
import { useCats } from "@/api/cats/queries";

definePageMeta({ layout: "default" });

const { data: cats, isPending, isError, refetch } = useCats(12);
</script>

<template>
  <div class="py-8">
    <!-- Header -->
    <div class="mb-8 flex items-start justify-between">
      <div>
        <p class="text-accent mb-1 text-xs tracking-widest uppercase">// NEURAL CAT FEED v2.077</p>
        <h1 class="neon-glow-yellow text-primary text-4xl font-bold tracking-widest uppercase">
          CAT_FEED.EXE
        </h1>
        <p class="text-muted-foreground mt-1 text-sm tracking-wide">
          Scanning Night City for optimal feline specimens...
        </p>
      </div>
      <button
        class="neon-border-yellow border-primary text-primary hover:bg-primary hover:text-primary-foreground border px-4 py-2 text-xs tracking-widest uppercase transition-all"
        @click="refetch"
      >
        [ RESCAN ]
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isPending" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="n in 6"
        :key="n"
        class="border-border bg-card relative h-64 w-full animate-pulse overflow-hidden border"
      >
        <div
          class="text-primary absolute top-2 left-2 text-xs tracking-widest uppercase opacity-60"
        >
          // LOADING SPECIMEN {{ n }}...
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="py-24 text-center">
      <p class="neon-glow-pink text-secondary text-2xl font-bold tracking-widest uppercase">
        // SIGNAL LOST
      </p>
      <p class="text-muted-foreground mt-2 text-sm tracking-wide">
        Connection to feline database severed. Try again, choom.
      </p>
    </div>

    <!-- Feed -->
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(cat, i) in cats"
        :key="cat.id"
        class="neon-border-yellow group border-border bg-card hover:border-primary relative overflow-hidden border transition-all"
      >
        <!-- Index tag -->
        <div
          class="bg-background/80 text-primary absolute top-3 left-3 z-10 px-2 py-0.5 text-xs tracking-widest uppercase backdrop-blur-sm"
        >
          #{{ String(i + 1).padStart(3, "0") }}
        </div>

        <!-- Image -->
        <div class="relative overflow-hidden">
          <img
            :src="cat.url"
            :alt="cat.breeds?.[0]?.name ?? 'Unknown specimen'"
            class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <!-- Image overlay -->
          <div
            class="from-card absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          ></div>
        </div>

        <!-- Info -->
        <div v-if="cat.breeds?.length" class="p-5">
          <div class="mb-3 flex items-center justify-between">
            <h2 class="neon-glow-yellow text-primary text-lg font-bold tracking-widest uppercase">
              {{ cat.breeds[0].name }}
            </h2>
            <span
              class="border-accent text-accent border px-2 py-0.5 text-xs tracking-widest uppercase"
            >
              {{ cat.breeds[0].origin }}
            </span>
          </div>

          <p class="neon-glow-pink text-secondary mb-3 text-xs tracking-widest uppercase">
            // {{ cat.breeds[0].temperament }}
          </p>

          <p class="text-muted-foreground text-sm leading-relaxed">
            {{ cat.breeds[0].description }}
          </p>
        </div>

        <div v-else class="p-5">
          <p class="text-muted-foreground text-xs tracking-widest uppercase">
            // IDENTITY UNKNOWN — ROGUE SPECIMEN
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
