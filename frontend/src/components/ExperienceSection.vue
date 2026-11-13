<script setup>
import SectionHeading from '@/components/SectionHeading.vue'
import { perfil } from '@/data/perfil'
</script>

<template>
  <section id="experiencia" class="border-t border-slate-900 px-6 py-20 md:py-28">
    <div class="mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Trayectoria"
        title="Experiencia"
        description="Proyectos donde he aplicado este stack de punta a punta."
      />

      <ol class="relative space-y-8 border-l border-slate-800 pl-6 md:pl-8">
        <li v-for="item in perfil.experiencia" :key="item.puesto" class="relative">
          <span
            class="absolute top-1.5 -left-[1.9rem] h-3 w-3 rounded-full border-2 border-slate-950 bg-cyan-400 md:-left-[2.4rem]"
            aria-hidden="true"
          ></span>

          <div
            class="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 transition-colors hover:border-slate-700"
          >
            <div class="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 class="text-base font-bold text-white">{{ item.puesto }}</h3>
                <p class="mt-1 text-sm text-slate-400">{{ item.empresa }}</p>
              </div>
              <span
                class="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 font-mono text-xs text-slate-400"
              >
                {{ item.periodo }}
              </span>
            </div>

            <p class="mt-3 text-sm leading-relaxed text-slate-400">{{ item.descripcion }}</p>

            <ul v-if="item.logros?.length" class="mt-4 space-y-2">
              <li
                v-for="logro in item.logros"
                :key="logro"
                class="flex gap-2 text-sm leading-relaxed text-slate-400"
              >
                <span
                  class="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400"
                  aria-hidden="true"
                ></span>
                <span>{{ logro }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
