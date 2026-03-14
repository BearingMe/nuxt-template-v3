<script setup lang="ts">
import { Button } from "@/components/ui/button";

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 py-32 text-center">
    <p class="text-accent text-xs tracking-widest uppercase">// NETCAT CORP TERMINAL v2.077</p>

    <h1 class="neon-glow-yellow text-primary text-6xl font-bold tracking-widest uppercase">
      WAKE UP,<br />SAMURAI.
    </h1>

    <p class="text-muted-foreground max-w-md text-sm tracking-wide">
      We have cats to browse. Night City's finest feline specimens are waiting for your neural link.
    </p>

    <div class="flex gap-4">
      <Button as-child class="tracking-widest uppercase">
        <NuxtLink to="/cats">[ ACCESS FEED ]</NuxtLink>
      </Button>
      <Button as-child variant="outline" class="tracking-widest uppercase">
        <NuxtLink to="/adopt">ADOPT.EXE</NuxtLink>
      </Button>
    </div>
  </div>
</template>
