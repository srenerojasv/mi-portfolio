<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import logo from '@/assets/logo-samuel.png'
import { perfil } from '@/data/perfil'

const secciones = [
  { id: 'sobre-mi', etiqueta: 'Sobre mí' },
  { id: 'proyectos', etiqueta: 'Proyectos' },
  { id: 'skills', etiqueta: 'Skills' },
  { id: 'experiencia', etiqueta: 'Experiencia' },
  { id: 'contacto', etiqueta: 'Contacto' },
]

const menuAbierto = ref(false)
const seccionActiva = ref('')
const conSombra = ref(false)

const nombreVisible = computed(() => perfil.nombreCorto || perfil.nombre)

function alDesplazar() {
  conSombra.value = window.scrollY > 8
}

let observador

onMounted(() => {
  window.addEventListener('scroll', alDesplazar, { passive: true })
  alDesplazar()

  observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) seccionActiva.value = entrada.target.id
      })
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )

  secciones.forEach(({ id }) => {
    const elemento = document.getElementById(id)
    if (elemento) observador.observe(elemento)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', alDesplazar)
  observador?.disconnect()
})
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-colors duration-300"
    :class="
      conSombra
        ? 'border-slate-800/80 bg-slate-950/85 backdrop-blur-lg'
        : 'border-transparent bg-slate-950/40 backdrop-blur-sm'
    "
  >
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
      <a
        href="#inicio"
        class="group flex items-center gap-3"
        aria-label="Ir al inicio"
        @click="menuAbierto = false"
      >
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center transition-transform group-hover:scale-105"
        >
          <img
            :src="logo"
            alt=""
            class="h-full w-full object-contain [filter:drop-shadow(0_0_10px_rgba(176,139,27,0.55))_drop-shadow(0_2px_4px_rgba(0,0,0,0.6))]"
            width="250"
            height="276"
          />
        </span>
        <span class="hidden text-sm font-semibold text-slate-200 sm:block">{{
          nombreVisible
        }}</span>
      </a>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Secciones del portafolio">
        <a
          v-for="seccion in secciones"
          :key="seccion.id"
          :href="`#${seccion.id}`"
          class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          :class="
            seccionActiva === seccion.id
              ? 'text-cyan-400'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
          "
        >
          {{ seccion.etiqueta }}
        </a>
      </nav>

      <a
        href="#contacto"
        class="hidden rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 md:inline-flex"
      >
        Hablemos
      </a>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 text-slate-300 transition-colors hover:bg-slate-900 md:hidden"
        :aria-expanded="menuAbierto"
        aria-controls="menu-movil"
        aria-label="Abrir menú de navegación"
        @click="menuAbierto = !menuAbierto"
      >
        <svg
          v-if="!menuAbierto"
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg
          v-else
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <nav
      v-show="menuAbierto"
      id="menu-movil"
      class="border-t border-slate-800 bg-slate-950/95 px-6 py-4 backdrop-blur-lg md:hidden"
      aria-label="Secciones del portafolio (móvil)"
    >
      <ul class="flex flex-col gap-1">
        <li v-for="seccion in secciones" :key="seccion.id">
          <a
            :href="`#${seccion.id}`"
            class="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            :class="
              seccionActiva === seccion.id
                ? 'bg-slate-900 text-cyan-400'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            "
            @click="menuAbierto = false"
          >
            {{ seccion.etiqueta }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
