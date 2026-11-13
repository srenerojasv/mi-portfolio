<script setup>
import SectionHeading from '@/components/SectionHeading.vue'
import { perfil } from '@/data/perfil'
</script>

<template>
  <section id="sobre-mi" class="border-t border-slate-900 px-6 py-20 md:py-28">
    <div class="mx-auto max-w-5xl">
      <SectionHeading eyebrow="Sobre mí" title="Interfaces rápidas, código claro" />

      <div class="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div class="space-y-5">
          <p
            v-for="(parrafo, indice) in perfil.sobreMi"
            :key="indice"
            class="leading-relaxed text-slate-400"
          >
            {{ parrafo }}
          </p>
        </div>

        <div class="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6">
          <h3 class="mb-4 text-sm font-semibold tracking-wide text-slate-200 uppercase">
            En qué me enfoco
          </h3>
          <ul class="space-y-3">
            <li
              v-for="punto in perfil.enfoque"
              :key="punto"
              class="flex gap-3 text-sm leading-relaxed text-slate-400"
            >
              <svg
                class="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.5l5 5 10-11" />
              </svg>
              <span>{{ punto }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
