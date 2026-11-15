<script setup>
import { computed } from 'vue'
import { perfil } from '@/data/perfil'

const anio = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="border-t border-slate-900 px-6 pt-10 pb-32 sm:pb-16">
    <div
      class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row sm:pr-24"
    >
      <p>© {{ anio }} {{ perfil.nombre }}. Todos los derechos reservados.</p>

      <div class="flex items-center gap-4">
        <p class="hidden sm:block">
          Hecho con <span class="text-slate-300">Vue 3</span> +
          <span class="text-slate-300">Tailwind</span> +
          <span class="text-orange-300">Rust</span>
        </p>
        <a
          href="#inicio"
          class="rounded-lg border border-slate-800 px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
        >
          Volver arriba ↑
        </a>
      </div>
    </div>
  </footer>
</template>
