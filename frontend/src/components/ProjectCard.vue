<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  proyecto: { type: Object, required: true },
})

const tarjeta = ref(null)
const inclinando = ref(false)

// Las rutas del JSON son absolutas (/proyectos/x.jpg); hay que prefijarlas con
// la base de Vite para que funcionen en GitHub Pages (/mi-portfolio/).
const imagen = computed(() => {
  const ruta = props.proyecto.imagen
  if (!ruta) return ''
  if (/^(https?:)?\/\//.test(ruta)) return ruta
  return `${import.meta.env.BASE_URL}${ruta.replace(/^\/+/, '')}`
})

function puedeInclinar() {
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function alMover(evento) {
  if (!puedeInclinar()) return

  const el = tarjeta.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const x = (evento.clientX - rect.left) / rect.width
  const y = (evento.clientY - rect.top) / rect.height

  el.style.setProperty('--giro-x', `${(0.5 - y) * 8}deg`)
  el.style.setProperty('--giro-y', `${(x - 0.5) * 8}deg`)
  el.style.setProperty('--brillo-x', `${x * 100}%`)
  el.style.setProperty('--brillo-y', `${y * 100}%`)
  inclinando.value = true
}

function alSalir() {
  const el = tarjeta.value
  if (!el) return

  el.style.setProperty('--giro-x', '0deg')
  el.style.setProperty('--giro-y', '0deg')
  inclinando.value = false
}
</script>

<template>
  <article
    ref="tarjeta"
    class="tilt-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5"
    :class="{ 'is-tilting': inclinando }"
    @pointermove="alMover"
    @pointerleave="alSalir"
    @pointercancel="alSalir"
    @blur="alSalir"
  >
    <div
      class="tilt-glare pointer-events-none absolute inset-0 z-10 rounded-2xl"
      aria-hidden="true"
    ></div>

    <div v-if="imagen" class="relative border-b border-slate-800/70">
      <img
        :src="imagen"
        :alt="`Captura del proyecto ${proyecto.nombre}`"
        loading="lazy"
        class="aspect-[16/10] w-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-105"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"
        aria-hidden="true"
      ></div>
    </div>

    <div class="relative flex flex-1 flex-col justify-between p-6">
      <div>
        <div class="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"></div>
        <h3 class="mb-2 text-xl font-bold text-white">{{ proyecto.nombre }}</h3>
        <p class="mb-4 text-sm leading-relaxed text-slate-400">{{ proyecto.descripcion }}</p>
      </div>

      <div class="mt-2 flex flex-col gap-4">
        <ul class="flex flex-wrap gap-2" aria-label="Tecnologías usadas">
          <li
            v-for="tag in proyecto.tecnologias"
            :key="tag"
            class="rounded-md border border-cyan-500/10 bg-slate-950 px-2.5 py-1 text-xs font-medium text-cyan-400"
          >
            {{ tag }}
          </li>
        </ul>

        <div class="flex flex-wrap gap-2">
          <a
            v-if="proyecto.url_proyecto"
            :href="proyecto.url_proyecto"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 rounded-xl bg-cyan-500 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
          >
            Ver demo ↗
          </a>
          <a
            v-if="proyecto.url_git"
            :href="proyecto.url_git"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 rounded-xl bg-slate-800 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Código ↗
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.tilt-card {
  transform: perspective(900px) rotateX(var(--giro-x, 0deg)) rotateY(var(--giro-y, 0deg));
  transform-style: preserve-3d;
  transition:
    transform 450ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 300ms,
    box-shadow 300ms;
}

.tilt-card.is-tilting {
  transform: translateY(-4px) perspective(900px) rotateX(var(--giro-x, 0deg))
    rotateY(var(--giro-y, 0deg));
  transition:
    transform 120ms ease-out,
    border-color 300ms,
    box-shadow 300ms;
}

.tilt-glare {
  background: radial-gradient(
    420px circle at var(--brillo-x, 50%) var(--brillo-y, 50%),
    rgb(34 211 238 / 0.12),
    transparent 65%
  );
  opacity: 0;
  transition: opacity 300ms;
}

.tilt-card.is-tilting .tilt-glare {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .tilt-card,
  .tilt-card.is-tilting {
    transform: none !important;
  }

  .tilt-glare {
    display: none;
  }
}
</style>
