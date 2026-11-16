<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Vite expone la base configurada (ej: "/mi-portfolio/") en esta variable.
const srcSim = `${import.meta.env.BASE_URL}simulacion-servilletas.html`

// La página embebida avisa de su altura real para que el iframe se ajuste sin scroll interno.
const alto = ref(760)

function alRecibir(evento) {
  const datos = evento.data
  if (!datos || datos.tipo !== 'pf-alto') return
  const valor = Number(datos.alto)
  if (!Number.isFinite(valor) || valor < 320) return
  alto.value = Math.min(Math.round(valor), 2600)
}

onMounted(() => window.addEventListener('message', alRecibir))
onBeforeUnmount(() => window.removeEventListener('message', alRecibir))
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 shadow-2xl">
    <!-- En móvil la simulación es demasiado densa: se ofrece abrirla a pantalla completa. -->
    <div class="flex flex-col items-start gap-4 p-6 md:hidden">
      <div class="flex items-center gap-3">
        <span
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <path d="M8 20h8M12 16v4" />
            <path d="M7 10h3l2-3 2 5 2-2h2" />
          </svg>
        </span>
        <div>
          <p class="text-sm font-semibold text-slate-100">Simulación de la empaquetadora</p>
          <p class="text-xs text-slate-400">Canvas 2D · GRAFCET · E/S del autómata</p>
        </div>
      </div>
      <a
        :href="srcSim"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Abrir simulación
        <span aria-hidden="true">↗</span>
      </a>
    </div>

    <div class="hidden md:block">
      <iframe
        :src="srcSim"
        :style="{ height: `${alto}px` }"
        class="block w-full border-0 bg-slate-950"
        title="Simulación interactiva de la empaquetadora de servilletas NS-400"
        loading="lazy"
        allow="autoplay; fullscreen"
      ></iframe>
    </div>

    <div
      class="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 bg-slate-900/60 px-4 py-2 text-[11px] text-slate-400"
    >
      <span>Simulación 2D interactiva · no es vídeo</span>
      <a
        :href="srcSim"
        target="_blank"
        rel="noopener noreferrer"
        class="font-semibold text-cyan-400 transition hover:text-cyan-300"
      >
        Abrir a pantalla completa ↗
      </a>
    </div>
  </div>
</template>
