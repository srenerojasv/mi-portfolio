<script setup>
import { onBeforeUnmount, ref } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { perfil } from '@/data/perfil'

const copiado = ref(false)
let temporizador

async function copiarCorreo() {
  try {
    await navigator.clipboard.writeText(perfil.email)
    copiado.value = true
    clearTimeout(temporizador)
    temporizador = setTimeout(() => (copiado.value = false), 2000)
  } catch {
    // Si el navegador bloquea el portapapeles, el enlace mailto sigue disponible.
  }
}

onBeforeUnmount(() => clearTimeout(temporizador))
</script>

<template>
  <section id="contacto" class="border-t border-slate-900 px-6 py-20 md:py-28">
    <div class="mx-auto max-w-5xl">
      <SectionHeading
        eyebrow="Contacto"
        title="¿Trabajamos juntos?"
        description="Tengo disponibilidad para proyectos freelance, colaboraciones y nuevos retos. Escríbeme y te responderé lo antes posible."
      />

      <div
        class="rounded-3xl bg-gradient-to-br from-cyan-500/40 via-slate-800 to-indigo-500/40 p-px"
      >
        <div class="rounded-[calc(1.5rem-1px)] bg-slate-900/90 p-8 md:p-10">
          <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="flex items-center gap-2 text-sm text-slate-400">
                <svg
                  class="h-4 w-4 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"
                  />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {{ perfil.ubicacion }}
              </p>
              <p class="mt-3 text-lg font-semibold text-white">
                Abierto a oportunidades remotas y presenciales.
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <a
                v-if="perfil.email"
                :href="`mailto:${perfil.email}`"
                class="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
              >
                Enviar correo
              </a>
              <button
                v-if="perfil.email"
                type="button"
                class="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800"
                @click="copiarCorreo"
              >
                {{ copiado ? '¡Copiado!' : 'Copiar correo' }}
              </button>
              <a
                v-if="perfil.github"
                :href="perfil.github"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              >
                GitHub ↗
              </a>
              <a
                v-if="perfil.linkedin"
                :href="perfil.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
