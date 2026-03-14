<template>
  <div class="flex min-h-screen flex-col">
    <header class="border-b px-6 py-4">
      <nav class="mx-auto flex max-w-7xl items-center justify-between">
        <NuxtLink to="/" class="text-lg font-semibold">App</NuxtLink>
        <div class="flex items-center gap-4 text-sm">
          <NuxtLink to="/cats" class="text-muted-foreground hover:text-foreground transition-colors"
            >Cats</NuxtLink
          >
          <NuxtLink
            to="/adopt"
            class="text-muted-foreground hover:text-foreground transition-colors"
            >Adopt</NuxtLink
          >
        </div>
      </nav>
    </header>

    <main class="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
      <slot />
    </main>

    <footer class="text-muted-foreground border-t px-6 py-4 text-center text-sm">
      &copy; {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>
