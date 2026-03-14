<script setup lang="ts">
import { Button } from "@/components/ui/button";

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-24">
    <h1 class="text-4xl font-bold">Hello World</h1>
    <p class="text-muted-foreground">
      Get started by editing <code class="font-mono">app/pages/index.vue</code>
    </p>
    <Button as-child>
      <NuxtLink to="/adopt">Adopt a cat</NuxtLink>
    </Button>
  </div>
</template>
