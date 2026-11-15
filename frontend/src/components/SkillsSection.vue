<script setup>
import SectionHeading from '@/components/SectionHeading.vue'
import { perfil } from '@/data/perfil'
</script>

<template>
  <section id="skills" class="border-t border-slate-900 px-6 py-20 md:py-28">
    <div class="mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Skills"
        title="Las herramientas que uso"
        description="Un stack elegido por rendimiento y mantenibilidad, no por moda."
      />

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="grupo in perfil.skills"
          :key="grupo.categoria"
          class="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 transition-colors hover:border-slate-700"
        >
          <span class="text-2xl" aria-hidden="true">{{ grupo.icono }}</span>
          <h3 class="mt-3 mb-4 text-base font-bold text-white">{{ grupo.categoria }}</h3>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="skill in grupo.items"
              :key="skill"
              class="rounded-md border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-xs font-medium text-slate-300"
            >
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
