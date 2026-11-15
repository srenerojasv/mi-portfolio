<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import EmpaquetadoraEsquema from '@/components/EmpaquetadoraEsquema.vue'

const PASOS = [
  { n: 1, texto: 'Control de material' },
  { n: 2, texto: 'Sincronización' },
  { n: 3, texto: 'S1 inserta cilindro' },
  { n: 4, texto: 'M2 dosifica · M3 empuja' },
  { n: 5, texto: 'S2 compacta' },
  { n: 6, texto: 'Contador +1 · giro 1/16' },
]

const especificaciones = ['60 ciclos/min', '3.600/h', 'paso 22,5°']

const raiz = ref(null)
const reducido = ref(false)

const estado = ref('APAGADO')
const ciclos = ref(0)
const paso = ref(0)
const material = ref(true)
const lenta = ref(true)
const sincronizado = ref(false)

const giro = ref(0)
const cilindro = ref(0)
const visible = ref(false)
const cayendo = ref(false)
const llenado = ref(0)
const m2 = ref(0)
const m3 = ref(0)
const s2 = ref(0)
const productos = ref(0)

let token = 0
let temporizador = null
let observador = null

const enMarcha = computed(() => estado.value === 'MARCHA' || estado.value === 'SINCRONIZANDO')
const dur = computed(() => (lenta.value ? 560 : 80))
const base = computed(() => (lenta.value ? 640 : 100))

const luces = computed(() => [
  {
    nombre: 'Verde · marcha',
    encendida: estado.value !== 'APAGADO' && estado.value !== 'PARO',
    color: 'bg-emerald-400',
    halo: 'shadow-[0_0_10px_rgba(52,211,153,0.9)]',
  },
  {
    nombre: 'Azul · ciclo',
    encendida: estado.value === 'MARCHA',
    color: 'bg-sky-400',
    halo: 'shadow-[0_0_10px_rgba(56,189,248,0.9)]',
  },
  {
    nombre: 'Ámbar · sin material',
    encendida: estado.value === 'SIN MATERIAL',
    color: 'bg-amber-400',
    halo: 'shadow-[0_0_10px_rgba(251,191,36,0.9)]',
  },
  {
    nombre: 'Rojo · paro',
    encendida: estado.value === 'PARO',
    color: 'bg-rose-500',
    halo: 'shadow-[0_0_10px_rgba(244,63,94,0.9)]',
  },
])

const ciclosTexto = computed(() => String(ciclos.value).padStart(4, '0'))
const pasosVisibles = computed(() => Math.min(productos.value, 5))

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

function esperar(ms) {
  return new Promise((resolver) => {
    temporizador = setTimeout(resolver, ms)
  })
}

function reiniciarEstacion() {
  m2.value = 0
  m3.value = 0
  s2.value = 0
  llenado.value = 0
  cayendo.value = false
  cilindro.value = 0
  visible.value = false
}

async function ciclo(gen) {
  paso.value = 1
  await esperar(base.value)
  if (gen !== token) return

  if (!material.value) {
    estado.value = 'SIN MATERIAL'
    paso.value = 0
    return
  }

  paso.value = 2
  await esperar(Math.round(base.value * 0.6))
  if (gen !== token) return

  paso.value = 3
  visible.value = true
  await esperar(40)
  if (gen !== token) return
  cilindro.value = 1
  await esperar(base.value)
  if (gen !== token) return

  paso.value = 4
  m2.value = 1
  await esperar(base.value)
  if (gen !== token) return
  llenado.value = 1
  m3.value = 1
  await esperar(base.value)
  if (gen !== token) return

  paso.value = 5
  s2.value = 1
  await esperar(base.value)
  if (gen !== token) return
  s2.value = 0
  m2.value = 0
  m3.value = 0
  await esperar(120)
  if (gen !== token) return

  paso.value = 6
  ciclos.value += 1
  giro.value += 22.5
  await esperar(dur.value + 60)
  if (gen !== token) return

  cayendo.value = true
  await esperar(dur.value * 1.4)
  if (gen !== token) return

  visible.value = false
  cayendo.value = false
  cilindro.value = 0
  llenado.value = 0
  productos.value = Math.min(productos.value + 1, 5)
  paso.value = 0
  await esperar(lenta.value ? 160 : 40)
}

async function arrancar() {
  if (enMarcha.value) return
  const gen = ++token
  reiniciarEstacion()

  if (!material.value) {
    estado.value = 'SIN MATERIAL'
    paso.value = 0
    return
  }

  estado.value = 'SINCRONIZANDO'
  sincronizado.value = false
  paso.value = 2
  await esperar(base.value)
  if (gen !== token) return

  giro.value += 6
  sincronizado.value = true
  estado.value = 'MARCHA'

  while (gen === token) {
    await ciclo(gen)
    if (estado.value === 'SIN MATERIAL') return
  }
}

function parar() {
  token += 1
  clearTimeout(temporizador)
  reiniciarEstacion()
  estado.value = 'PARO'
  sincronizado.value = false
  paso.value = 0
}

function alternarMaterial() {
  material.value = !material.value
  if (material.value && estado.value === 'SIN MATERIAL') {
    estado.value = 'LISTO'
  }
}

function reiniciar() {
  token += 1
  clearTimeout(temporizador)
  reiniciarEstacion()
  estado.value = 'APAGADO'
  ciclos.value = 0
  productos.value = 0
  paso.value = 0
  giro.value = 0
  sincronizado.value = false
  material.value = true
}

onMounted(() => {
  reducido.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducido.value || !('IntersectionObserver' in window)) return

  observador = new IntersectionObserver(
    (entradas) => {
      if (entradas.some((e) => e.isIntersecting) && estado.value === 'APAGADO') {
        arrancar()
        observador?.disconnect()
      }
    },
    { threshold: 0.3 },
  )
  if (raiz.value) observador.observe(raiz.value)
})

onBeforeUnmount(() => {
  token += 1
  clearTimeout(temporizador)
  observador?.disconnect()
})
</script>

<template>
  <section ref="raiz" class="mt-6 border-t border-slate-800 pt-6" aria-labelledby="demo-titulo">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h4 id="demo-titulo" class="text-sm font-bold text-white">Cómo funciona</h4>
        <p class="mt-1 max-w-xl text-sm text-slate-400">
          Cilindro vacío, dosificación, compactación e indexado del tambor. En la máquina real: 60
          ciclos por minuto.
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
        <EmpaquetadoraEsquema
          :giro="giro"
          :dur="dur"
          :paso="paso"
          :cilindro="cilindro"
          :visible="visible"
          :cayendo="cayendo"
          :llenado="llenado"
          :m2="m2"
          :m3="m3"
          :s2="s2"
          :productos="pasosVisibles"
          :material="material"
        />

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
                  {{ ciclosTexto }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-[9px] tracking-[0.14em] text-emerald-400/50 uppercase">Estado</p>
                <p class="mt-0.5 text-base leading-none font-semibold text-emerald-300">
                  {{ estado }}
                </p>
              </div>
            </div>
            <div
              class="flex justify-between border-t border-emerald-500/15 px-2.5 py-1.5 font-mono text-[9px] text-emerald-400/45"
            >
              <span>Sincronizado · {{ sincronizado ? 'sí' : 'no' }}</span>
              <span>Paso · {{ paso ? `0${paso}` : '—' }}</span>
            </div>
          </div>

          <ul class="mt-3 space-y-1.5">
            <li
              v-for="luz in luces"
              :key="luz.nombre"
              class="flex items-center gap-2 rounded-md border border-slate-800/80 bg-slate-900/40 px-2 py-1.5"
            >
              <span
                class="h-2 w-2 shrink-0 rounded-full transition-colors duration-300"
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

        <!-- Controles -->
        <div class="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
          <div class="flex items-center justify-between">
            <p class="text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
              Control
            </p>
            <button
              type="button"
              class="rounded border border-slate-800 px-1.5 py-0.5 font-mono text-[9px] text-slate-500 transition-colors hover:border-slate-700 hover:text-slate-300"
              @click="reiniciar"
            >
              Reiniciar
            </button>
          </div>

          <div class="mt-2 grid grid-cols-2 gap-1.5">
            <button
              type="button"
              class="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="enMarcha"
              @click="arrancar"
            >
              Iniciar
            </button>
            <button
              type="button"
              class="rounded-md border border-rose-500/40 bg-rose-500/10 px-2 py-1.5 text-xs font-semibold text-rose-300 transition-colors hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="!enMarcha"
              @click="parar"
            >
              Paro
            </button>
          </div>

          <div class="mt-2 grid grid-cols-2 gap-1 rounded-md border border-slate-800 p-1">
            <button
              type="button"
              class="rounded px-2 py-1 font-mono text-[10px] transition-colors"
              :class="lenta ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300'"
              :aria-pressed="lenta"
              @click="lenta = true"
            >
              Didáctica
            </button>
            <button
              type="button"
              class="rounded px-2 py-1 font-mono text-[10px] transition-colors"
              :class="
                !lenta ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300'
              "
              :aria-pressed="!lenta"
              @click="lenta = false"
            >
              Real 60/min
            </button>
          </div>

          <button
            type="button"
            class="mt-2 w-full rounded-md border px-2 py-1.5 font-mono text-[10px] transition-colors"
            :class="
              material
                ? 'border-amber-500/30 bg-amber-500/5 text-amber-300/80 hover:bg-amber-500/10'
                : 'border-cyan-500/30 bg-cyan-500/5 text-cyan-300/80 hover:bg-cyan-500/10'
            "
            @click="alternarMaterial"
          >
            {{ material ? 'Vaciar tolva' : 'Reponer tolva' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Secuencia -->
    <ol class="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-6">
      <li
        v-for="p in PASOS"
        :key="p.n"
        class="rounded-md border px-2 py-1.5 transition-colors duration-200"
        :class="
          paso === p.n ? 'border-cyan-400/60 bg-cyan-400/10' : 'border-slate-800 bg-slate-900/40'
        "
      >
        <span
          class="font-mono text-[9px]"
          :class="paso === p.n ? 'text-cyan-300' : 'text-slate-500'"
        >
          0{{ p.n }}
        </span>
        <span
          class="mt-0.5 block text-[10px] leading-tight"
          :class="paso === p.n ? 'text-slate-200' : 'text-slate-500'"
        >
          {{ p.texto }}
        </span>
      </li>
    </ol>

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
