<template>
  <div class="relative flex min-h-screen flex-col">
    <!-- Scanline overlay -->
    <div class="scanlines pointer-events-none fixed inset-0 z-50 opacity-30"></div>

    <header class="border-border bg-background/90 border-b px-6 py-3 backdrop-blur-sm">
      <nav class="mx-auto flex max-w-7xl items-center justify-between">
        <NuxtLink
          to="/"
          class="neon-glow-yellow text-primary text-xl font-bold tracking-widest uppercase"
        >
          NETCAT//
        </NuxtLink>
        <div class="flex items-center gap-6 text-sm tracking-widest uppercase">
          <NuxtLink
            to="/cats"
            class="text-muted-foreground hover:text-accent hover:neon-glow-cyan transition-colors"
          >
            [ FEED ]
          </NuxtLink>
          <NuxtLink
            to="/adopt"
            class="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground hover:neon-border-pink border px-3 py-1 transition-all"
          >
            ADOPT.EXE
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
      <slot />
    </main>

    <footer
      class="border-border text-muted-foreground border-t px-6 py-3 text-center text-xs tracking-widest uppercase"
    >
      &copy; {{ new Date().getFullYear() }} NETCAT CORP // ALL RIGHTS RESERVED // NIGHT CITY
    </footer>
  </div>
</template>
