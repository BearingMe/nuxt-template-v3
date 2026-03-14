<script setup>
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
  <VueQueryDevtools />
</template>
