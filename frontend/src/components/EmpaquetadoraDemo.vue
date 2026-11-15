<script setup>
import EmpaquetadoraEsquema from '@/components/EmpaquetadoraEsquema.vue'

const especificaciones = ['60 ciclos/min', '3.600/h', 'paso 22,5°']

const luces = [
  {
    nombre: 'Verde · marcha',
    encendida: true,
    color: 'bg-emerald-400',
    halo: 'shadow-[0_0_10px_rgba(52,211,153,0.9)]',
  },
  {
    nombre: 'Azul · ciclo',
    encendida: false,
    color: 'bg-sky-400',
    halo: 'shadow-[0_0_10px_rgba(56,189,248,0.9)]',
  },
  {
    nombre: 'Ámbar · sin material',
    encendida: false,
    color: 'bg-amber-400',
    halo: 'shadow-[0_0_10px_rgba(251,191,36,0.9)]',
  },
  {
    nombre: 'Rojo · paro',
    encendida: false,
    color: 'bg-rose-500',
    halo: 'shadow-[0_0_10px_rgba(244,63,94,0.9)]',
  },
]

const leyenda = [
  { texto: 'M1 · tambor', color: 'bg-cyan-400' },
  { texto: 'M2 · dosifica', color: 'bg-teal-400' },
  { texto: 'M3 · empuja', color: 'bg-violet-400' },
  { texto: 'S1/S2 · solenoides', color: 'bg-rose-400' },
  { texto: 'cilindros', color: 'bg-amber-400' },
  { texto: 'producto', color: 'bg-emerald-400' },
]

const gabinete = [
  { codigo: 'QF1', nombre: 'Protección', led: 'bg-emerald-400' },
  { codigo: 'FA1', nombre: '24 V DC', led: 'bg-emerald-400' },
  { codigo: 'PLC', nombre: 'Delta', led: 'bg-cyan-400' },
  { codigo: 'DI', nombre: 'Entradas', led: 'bg-emerald-400' },
  { codigo: 'DO', nombre: 'Salidas', led: 'bg-emerald-400' },
  { codigo: 'KA1', nombre: 'Relé S1', led: 'bg-slate-600' },
  { codigo: 'KA2', nombre: 'Relé S2', led: 'bg-slate-600' },
  { codigo: 'DRV1', nombre: 'Motor 1', led: 'bg-slate-600' },
  { codigo: 'DRV2', nombre: 'Motor 2', led: 'bg-slate-600' },
  { codigo: 'DRV3', nombre: 'Motor 3', led: 'bg-slate-600' },
  { codigo: 'X1', nombre: 'Bornas', led: 'bg-slate-600' },
]
</script>

<template>
  <section class="mt-6 border-t border-slate-800 pt-6" aria-labelledby="demo-titulo">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h4 id="demo-titulo" class="text-sm font-bold text-white">Cómo funciona</h4>
        <p class="mt-1 max-w-xl text-sm text-slate-400">
          Cilindro vacío, dosificación, compactación e indexado del tambor: un ciclo por segundo.
        </p>
      </div>
      <div class="flex flex-wrap gap-1.5 font-mono text-[10px] text-slate-400">
        <span
          v-for="dato in especificaciones"
          :key="dato"
          class="rounded border border-slate-800 bg-slate-950/60 px-2 py-1"
        >
          {{ dato }}
        </span>
      </div>
    </div>

    <div class="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_264px]">
      <figure class="rounded-2xl border border-slate-800 bg-slate-950/60 p-2 sm:p-3">
        <EmpaquetadoraEsquema />
        <figcaption
          class="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-slate-800/80 px-1 pt-2.5"
        >
          <span
            v-for="item in leyenda"
            :key="item.texto"
            class="inline-flex items-center gap-1.5 text-[10px] text-slate-500"
          >
            <span class="h-1.5 w-1.5 rounded-full" :class="item.color" aria-hidden="true" />
            {{ item.texto }}
          </span>
        </figcaption>
      </figure>

      <div class="flex flex-col gap-3">
        <!-- HMI -->
        <div class="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
          <p class="text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
            Panel · HMI
          </p>
          <div
            class="mt-2 overflow-hidden rounded-lg border border-emerald-500/20 bg-[#04120e] shadow-[inset_0_0_28px_rgba(16,185,129,0.09)]"
          >
            <div
              class="flex items-center justify-between border-b border-emerald-500/15 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.16em] text-emerald-400/60 uppercase"
            >
              <span>Empaquetadora</span>
              <span>HDMI · 1</span>
            </div>
            <div class="grid grid-cols-[1fr_auto] items-end gap-3 px-2.5 py-2.5 font-mono">
              <div>
                <p class="text-[9px] tracking-[0.14em] text-emerald-400/50 uppercase">Ciclos</p>
                <p class="mt-0.5 text-2xl leading-none font-semibold text-emerald-300 tabular-nums">
                  0000
                </p>
              </div>
              <div class="text-right">
                <p class="text-[9px] tracking-[0.14em] text-emerald-400/50 uppercase">Estado</p>
                <p class="mt-0.5 text-base leading-none font-semibold text-emerald-300">LISTO</p>
              </div>
            </div>
            <div
              class="flex justify-between border-t border-emerald-500/15 px-2.5 py-1.5 font-mono text-[9px] text-emerald-400/45"
            >
              <span>Sincronizado · no</span>
              <span>Paso · reposo</span>
            </div>
          </div>

          <ul class="mt-3 space-y-1.5">
            <li
              v-for="luz in luces"
              :key="luz.nombre"
              class="flex items-center gap-2 rounded-md border border-slate-800/80 bg-slate-900/40 px-2 py-1.5"
            >
              <span
                class="h-2 w-2 shrink-0 rounded-full"
                :class="luz.encendida ? [luz.color, luz.halo] : 'bg-slate-700'"
                aria-hidden="true"
              />
              <span
                class="text-[10px]"
                :class="luz.encendida ? 'text-slate-300' : 'text-slate-500'"
              >
                {{ luz.nombre }}
              </span>
            </li>
          </ul>
        </div>

        <div class="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
          <p class="text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
            Secuencia
          </p>
          <ol class="mt-2 space-y-1 font-mono text-[10px] text-slate-500">
            <li>01 · control de material</li>
            <li>02 · sincronización del tambor</li>
            <li>03 · S1 inserta cilindro</li>
            <li>04 · M2 dosifica · M3 empuja</li>
            <li>05 · S2 compacta</li>
            <li>06 · contador +1 · giro 1/16</li>
          </ol>
        </div>
      </div>
    </div>

    <!-- Gabinete -->
    <div class="mt-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3 sm:p-4">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <p class="text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
          Gabinete de control
        </p>
        <p class="font-mono text-[10px] text-slate-600">PLC Delta · 24 V DC · riel DIN</p>
      </div>
      <div class="mt-2.5 flex gap-1 overflow-x-auto pb-1">
        <div
          v-for="modulo in gabinete"
          :key="modulo.codigo"
          class="min-w-[58px] flex-1 rounded-[3px] border border-slate-700/80 bg-gradient-to-b from-slate-800/90 to-slate-900 px-1.5 py-2"
        >
          <span class="block h-1 w-1 rounded-full" :class="modulo.led" aria-hidden="true" />
          <p class="mt-2 font-mono text-[9px] text-slate-300">{{ modulo.codigo }}</p>
          <p class="truncate text-[8px] text-slate-500">{{ modulo.nombre }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
