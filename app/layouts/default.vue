<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b px-6 py-4">
      <nav class="max-w-7xl mx-auto flex items-center justify-between">
        <NuxtLink to="/" class="font-semibold text-lg">App</NuxtLink>
      </nav>
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
      <slot />
    </main>

    <footer class="border-t px-6 py-4 text-sm text-muted-foreground text-center">
      &copy; {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>
