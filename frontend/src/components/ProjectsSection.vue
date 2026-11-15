<script setup>
import Empaquetadora3D from './Empaquetadora3D.vue'
import { computed, ref, watch } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { useProyectos } from '@/composables/useProyectos'

const { proyectos, cargando, error, recargar } = useProyectos()

const filtro = ref('Todas')

const tecnologias = computed(() => {
  const conjunto = new Set()
  proyectos.value.forEach((proyecto) => {
    ;(proyecto.tecnologias ?? []).forEach((tecnologia) => conjunto.add(tecnologia))
  })
  return [...conjunto].sort((a, b) => a.localeCompare(b))
})

const proyectosFiltrados = computed(() =>
  filtro.value === 'Todas'
    ? proyectos.value
    : proyectos.value.filter((proyecto) => (proyecto.tecnologias ?? []).includes(filtro.value)),
)

// Si el proyecto que define el filtro desaparece del JSON, volvemos a "Todas".
watch(tecnologias, (lista) => {
  if (filtro.value !== 'Todas' && !lista.includes(filtro.value)) filtro.value = 'Todas'
})
</script>

<template>
  <section id="proyectos" class="border-t border-slate-900 px-6 py-20 md:py-28">
    <div class="mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Proyectos"
        title="Cosas que he construido"
        description="Datos cargados desde Rust compilado a WebAssembly. Filtra por tecnología para explorar."
      />

      <div v-if="cargando" class="grid grid-cols-1 gap-6 md:grid-cols-2" aria-live="polite">
        <span class="sr-only">Cargando proyectos…</span>
        <div
          v-for="n in 4"
          :key="n"
          class="animate-pulse rounded-2xl border border-slate-800/60 bg-slate-900/30 p-6"
        >
          <div class="mb-4 h-1 w-12 rounded-full bg-slate-800"></div>
          <div class="mb-3 h-5 w-2/3 rounded bg-slate-800"></div>
          <div class="mb-2 h-3 w-full rounded bg-slate-800/70"></div>
          <div class="mb-6 h-3 w-4/5 rounded bg-slate-800/70"></div>
          <div class="flex gap-2">
            <div class="h-6 w-16 rounded bg-slate-800/70"></div>
            <div class="h-6 w-20 rounded bg-slate-800/70"></div>
          </div>
        </div>
      </div>

      <div
        v-else-if="error"
        class="rounded-2xl border border-rose-500/30 bg-rose-500/5 px-6 py-8 text-center"
        role="alert"
      >
        <p class="font-semibold text-rose-200">{{ error }}</p>
        <button
          type="button"
          class="mt-4 rounded-xl border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-200 transition-colors hover:bg-rose-500/10"
          @click="recargar"
        >
          Reintentar
        </button>
      </div>

      <template v-else>
        <div
          class="mb-8 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filtrar proyectos"
        >
          <button
            type="button"
            class="rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
            :class="
              filtro === 'Todas'
                ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-300'
                : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            "
            :aria-pressed="filtro === 'Todas'"
            @click="filtro = 'Todas'"
          >
            Todas
          </button>
          <button
            v-for="tecnologia in tecnologias"
            :key="tecnologia"
            type="button"
            class="rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
            :class="
              filtro === tecnologia
                ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-300'
                : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            "
            :aria-pressed="filtro === tecnologia"
            @click="filtro = tecnologia"
          >
            {{ tecnologia }}
          </button>
        </div>

        <p class="mb-4 text-xs text-slate-500" aria-live="polite">
          {{ proyectosFiltrados.length }}
          {{ proyectosFiltrados.length === 1 ? 'proyecto' : 'proyectos' }}
        </p>

                <div v-if="proyectosFiltrados.length" class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            v-for="(proyecto, indice) in proyectosFiltrados"
            :key="proyecto.id"
            v-reveal="indice * 80"
            class="h-full"
          >
            <!-- 👇 SI ES LA EMPAQUETADORA, MUESTRA EL 3D 👇 -->
            <Empaquetadora3D 
              v-if="proyecto.titulo?.includes('Empaquetadora') || proyecto.id === 'empaquetadora'"
            />
            
            <!-- 👇 SI NO, MUESTRA LA TARJETA NORMAL 👇 -->
            <ProjectCard v-else :proyecto="proyecto" />
          </div>
        </div>

        <p
          v-else
          class="rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 px-6 py-12 text-center text-sm text-slate-400"
        >
          No hay proyectos con la tecnología «{{ filtro }}».
        </p>
      </template>
    </div>
  </section>
</template>
