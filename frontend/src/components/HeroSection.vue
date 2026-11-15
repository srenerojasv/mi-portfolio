<script setup>
import { perfil } from '@/data/perfil'
</script>

<template>
  <section id="inicio" class="relative overflow-hidden px-6 pt-16 pb-20 md:pt-24 md:pb-28">
    <div
      class="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute top-24 -right-24 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto grid max-w-5xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p
          class="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-300"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"
            ></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
          </span>
          {{ perfil.disponibilidad }}
        </p>

        <h1 class="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Hola, soy
          <span class="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            {{ perfil.nombre }}
          </span>
        </h1>

        <p class="mt-4 text-lg font-semibold text-slate-200 md:text-xl">{{ perfil.rol }}</p>

        <p class="mt-5 max-w-xl leading-relaxed text-slate-400">{{ perfil.resumen }}</p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#proyectos"
            class="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            class="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-900"
          >
            Hablemos
          </a>
        </div>

        <ul class="mt-8 flex flex-wrap gap-2" aria-label="Tecnologías principales">
          <li
            v-for="tecnologia in perfil.stack"
            :key="tecnologia"
            class="rounded-md border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-slate-300"
          >
            {{ tecnologia }}
          </li>
        </ul>
      </div>

      <div class="relative">
        <div
          class="absolute -inset-1 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/10 to-transparent blur-xl"
          aria-hidden="true"
        ></div>

        <div
          class="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-cyan-500/5"
        >
          <div class="flex items-center gap-2 border-b border-slate-800 bg-slate-950/60 px-4 py-3">
            <span class="h-2.5 w-2.5 rounded-full bg-rose-500/80"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-amber-400/80"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-emerald-400/80"></span>
            <span class="ml-2 font-mono text-xs text-slate-500">flujo-del-portafolio</span>
          </div>

          <div class="space-y-2 p-5 font-mono text-[13px] leading-7">
            <p>
              <span class="mr-3 text-slate-600">01</span>
              <span class="text-indigo-300">Vue 3</span>
              <span class="mx-2 text-slate-600">→</span>
              <span class="text-slate-300">interfaz reactiva</span>
            </p>
            <p>
              <span class="mr-3 text-slate-600">02</span>
              <span class="text-orange-300">Rust</span>
              <span class="mx-2 text-slate-600">→</span>
              <span class="text-slate-300">lógica en WebAssembly</span>
            </p>
            <p>
              <span class="mr-3 text-slate-600">03</span>
              <span class="text-cyan-300">fetch</span>
              <span class="mx-2 text-slate-600">→</span>
              <span class="text-slate-300">proyectos.json</span>
            </p>
            <p>
              <span class="mr-3 text-slate-600">04</span>
              <span class="text-emerald-300">render</span>
              <span class="mx-2 text-slate-600">→</span>
              <span class="text-slate-300">grid de proyectos</span>
            </p>
            <p>
              <span class="mr-3 text-slate-600">05</span>
              <span class="text-amber-300">deploy</span>
              <span class="mx-2 text-slate-600">→</span>
              <span class="text-slate-300">GitHub Actions + Pages</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="relative mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
      <div
        v-for="pilar in perfil.pilares"
        :key="pilar.titulo"
        class="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-5 py-4"
      >
        <p class="text-sm font-bold text-white">{{ pilar.titulo }}</p>
        <p class="mt-1 text-xs text-slate-400">{{ pilar.detalle }}</p>
      </div>
    </div>
  </section>
</template>
