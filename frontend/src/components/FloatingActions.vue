<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { crearEnlaceWhatsapp } from '@/utils/whatsapp'

const UMBRAL_VOLVER_ARRIBA = 480

const mostrarVolverArriba = ref(false)
const enlaceWhatsapp = crearEnlaceWhatsapp()

function alDesplazar() {
  mostrarVolverArriba.value = window.scrollY > UMBRAL_VOLVER_ARRIBA
}

function volverArriba() {
  const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({ top: 0, behavior: prefiereMenosMovimiento ? 'auto' : 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', alDesplazar, { passive: true })
  alDesplazar()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', alDesplazar)
})
</script>

<template>
  <div
    class="pointer-events-none fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
  >
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <button
        v-if="mostrarVolverArriba"
        type="button"
        class="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-slate-200 shadow-lg shadow-slate-950/40 backdrop-blur transition-colors hover:border-cyan-400 hover:text-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
        aria-label="Volver al inicio de la página"
        title="Volver al inicio"
        @click="volverArriba"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0-7 7m7-7 7 7" />
        </svg>
      </button>
    </Transition>

    <a
      v-if="enlaceWhatsapp"
      :href="enlaceWhatsapp"
      target="_blank"
      rel="noopener noreferrer"
      class="group pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transition-transform hover:scale-105 hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
      aria-label="Escribir por WhatsApp"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-slate-100 ring-1 ring-slate-700 transition-opacity duration-200 lg:block lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
      >
        Hablemos por WhatsApp
      </span>
      <svg class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
        />
      </svg>
    </a>
  </div>
</template>
