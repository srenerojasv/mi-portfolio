<script setup>
const muescas = Array.from({ length: 16 }, (_, i) => -i * 22.5)

const golosinas = [
  { x: 100, y: 62, color: '#f472b6' },
  { x: 124, y: 58, color: '#facc15' },
  { x: 148, y: 63, color: '#4ade80' },
  { x: 168, y: 58, color: '#fb923c' },
  { x: 110, y: 82, color: '#38bdf8' },
  { x: 136, y: 86, color: '#f472b6' },
  { x: 160, y: 80, color: '#a78bfa' },
  { x: 100, y: 106, color: '#facc15' },
  { x: 126, y: 108, color: '#fb923c' },
  { x: 152, y: 104, color: '#4ade80' },
  { x: 114, y: 126, color: '#38bdf8' },
  { x: 142, y: 126, color: '#f472b6' },
]

const cilindrosSemitolva = [
  { x: 276, y: 112 },
  { x: 308, y: 112 },
  { x: 276, y: 136 },
  { x: 308, y: 136 },
  { x: 276, y: 160 },
  { x: 308, y: 160 },
]

const candies = [
  { x: -20, y: -4, color: '#f472b6' },
  { x: -10, y: 3, color: '#facc15' },
  { x: 0, y: -5, color: '#4ade80' },
  { x: 9, y: 3, color: '#fb923c' },
  { x: 18, y: -3, color: '#38bdf8' },
  { x: 4, y: 7, color: '#a78bfa' },
]

const luces = [
  { nombre: 'Marcha', clase: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.85)]' },
  { nombre: 'Ciclo', clase: 'bg-slate-700' },
  { nombre: 'Sin material', clase: 'bg-slate-700' },
  { nombre: 'Paro', clase: 'bg-slate-700' },
]

const leyenda = [
  { color: 'bg-cyan-400', texto: 'M1 · Tambor' },
  { color: 'bg-teal-400', texto: 'M2 · Dosificador' },
  { color: 'bg-violet-400', texto: 'M3 · Compactador' },
  { color: 'bg-rose-400', texto: 'S1/S2 · Solenoides' },
  { color: 'bg-amber-400', texto: 'Cilindros' },
]

const gabinete = [
  { nombre: 'PLC', detalle: 'Delta', activo: true },
  { nombre: 'R1', detalle: 'Solenoide 1', activo: false },
  { nombre: 'R2', detalle: 'Solenoide 2', activo: false },
  { nombre: 'D1', detalle: 'Motor 1', activo: false },
  { nombre: 'D2', detalle: 'Motor 2', activo: false },
  { nombre: 'D3', detalle: 'Motor 3', activo: false },
  { nombre: 'FA', detalle: 'Fuentes', activo: true },
]
</script>

<template>
  <div class="mt-6 border-t border-slate-800 pt-6">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h4 class="text-sm font-bold text-white">Cómo funciona</h4>
        <p class="mt-1 text-sm text-slate-400">
          Llenado, compactación y eyección del cilindro en el tambor de 16 posiciones.
        </p>
      </div>
      <div class="flex gap-2 font-mono text-[11px] text-slate-400">
        <span class="rounded-md border border-slate-800 px-2 py-1">60 ciclos/min</span>
        <span class="rounded-md border border-slate-800 px-2 py-1">3.600/h</span>
      </div>
    </div>

    <div class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_250px]">
      <div class="rounded-2xl border border-slate-800 bg-slate-950/60 p-2 sm:p-4">
        <svg
          viewBox="0 0 820 500"
          class="h-auto w-full"
          role="img"
          aria-labelledby="esquema-titulo esquema-desc"
        >
          <title id="esquema-titulo">Esquema de la empaquetadora</title>
          <desc id="esquema-desc">
            Tolva de golosinas, semitolva vibratoria de cilindros, solenoide 1, tambor de 16
            posiciones con motor 1, motores 2 y 3, solenoide 2 y tolva de producto terminado.
          </desc>

          <!-- Tolva de golosinas -->
          <g>
            <polygon
              points="70,40 200,40 180,140 90,140"
              fill="#22d3ee14"
              stroke="#67e8f9"
              stroke-opacity=".55"
              stroke-width="2"
            />
            <circle
              v-for="(g, i) in golosinas"
              :key="`g${i}`"
              :cx="g.x"
              :cy="g.y"
              r="4.5"
              :fill="g.color"
              opacity=".9"
            />
            <circle cx="135" cy="150" r="5" fill="#34d399" stroke="#052e2b" stroke-width="2" />
            <text
              x="135"
              y="25"
              text-anchor="middle"
              fill="#cbd5e1"
              font-size="14"
              font-weight="600"
            >
              Tolva de golosinas
            </text>
            <text x="88" y="172" fill="#64748b" font-size="11">sensor de material</text>
            <path
              d="M135 150 C 210 250 360 190 424 208"
              stroke="#334155"
              stroke-width="14"
              fill="none"
              stroke-linecap="round"
            />
            <path
              d="M135 150 C 210 250 360 190 424 208"
              stroke="#22d3ee"
              stroke-opacity=".25"
              stroke-width="4"
              fill="none"
              stroke-dasharray="6 6"
            />
          </g>

          <!-- Semitolva vibratoria -->
          <g>
            <polygon
              points="255,95 365,95 352,190 268,190"
              fill="#f59e0b14"
              stroke="#fcd34d"
              stroke-opacity=".55"
              stroke-width="2"
            />
            <rect
              v-for="(c, i) in cilindrosSemitolva"
              :key="`sc${i}`"
              :x="c.x"
              :y="c.y"
              width="30"
              height="12"
              rx="6"
              fill="#f59e0b22"
              stroke="#fcd34d"
              stroke-opacity=".5"
            />
            <g stroke="#fcd34d" stroke-opacity=".5" stroke-width="1.5" fill="none">
              <path d="M240 120 q-8 8 0 16" />
              <path d="M232 112 q-10 12 0 24" />
              <path d="M224 104 q-12 16 0 32" />
            </g>
            <text
              x="310"
              y="82"
              text-anchor="middle"
              fill="#cbd5e1"
              font-size="14"
              font-weight="600"
            >
              Semitolva vibratoria
            </text>
            <text x="310" y="213" text-anchor="middle" fill="#64748b" font-size="11">
              cilindros vacíos
            </text>
            <path
              d="M310 190 C 340 205 380 208 404 214"
              stroke="#334155"
              stroke-width="12"
              fill="none"
              stroke-linecap="round"
            />
            <path
              d="M310 190 C 340 205 380 208 404 214"
              stroke="#fcd34d"
              stroke-opacity=".3"
              stroke-width="3"
              fill="none"
              stroke-dasharray="5 6"
            />
          </g>

          <!-- Solenoide 1 y cilindro preparado -->
          <g>
            <rect
              x="320"
              y="227"
              width="48"
              height="26"
              rx="6"
              fill="#f43f5e1f"
              stroke="#fb7185"
              stroke-width="2"
            />
            <line
              x1="368"
              y1="240"
              x2="386"
              y2="240"
              stroke="#fda4af"
              stroke-width="5"
              stroke-linecap="round"
            />
            <text
              x="344"
              y="219"
              text-anchor="middle"
              fill="#fda4af"
              font-size="12"
              font-weight="700"
            >
              S1
            </text>
            <g transform="translate(404 240)">
              <rect
                x="-28"
                y="-13"
                width="56"
                height="26"
                rx="9"
                fill="#f59e0b1f"
                stroke="#fcd34d"
                stroke-width="2"
              />
              <rect
                x="-28"
                y="-13"
                width="7"
                height="26"
                rx="3"
                fill="#fcd34d"
                fill-opacity=".35"
              />
            </g>
          </g>

          <!-- Motores 2 y 3 -->
          <g>
            <line
              x1="350"
              y1="195"
              x2="450"
              y2="195"
              stroke="#334155"
              stroke-width="4"
              stroke-linecap="round"
            />
            <rect
              x="366"
              y="185"
              width="26"
              height="20"
              rx="5"
              fill="#14b8a61f"
              stroke="#2dd4bf"
              stroke-width="2"
            />
            <line
              x1="379"
              y1="205"
              x2="379"
              y2="222"
              stroke="#5eead4"
              stroke-width="4"
              stroke-linecap="round"
            />
            <text
              x="379"
              y="178"
              text-anchor="middle"
              fill="#5eead4"
              font-size="12"
              font-weight="700"
            >
              M2
            </text>

            <line
              x1="350"
              y1="285"
              x2="450"
              y2="285"
              stroke="#334155"
              stroke-width="4"
              stroke-linecap="round"
            />
            <rect
              x="366"
              y="275"
              width="26"
              height="20"
              rx="5"
              fill="#8b5cf61f"
              stroke="#a78bfa"
              stroke-width="2"
            />
            <line
              x1="379"
              y1="275"
              x2="379"
              y2="258"
              stroke="#c4b5fd"
              stroke-width="4"
              stroke-linecap="round"
            />
            <text
              x="379"
              y="310"
              text-anchor="middle"
              fill="#c4b5fd"
              font-size="12"
              font-weight="700"
            >
              M3
            </text>
          </g>

          <!-- Solenoide 2 -->
          <g>
            <rect
              x="410"
              y="300"
              width="42"
              height="18"
              rx="6"
              fill="#f43f5e1f"
              stroke="#fb7185"
              stroke-width="2"
            />
            <line
              x1="431"
              y1="300"
              x2="440"
              y2="272"
              stroke="#fda4af"
              stroke-width="4"
              stroke-linecap="round"
            />
            <text
              x="431"
              y="334"
              text-anchor="middle"
              fill="#fda4af"
              font-size="12"
              font-weight="700"
            >
              S2
            </text>
          </g>

          <!-- Tambor -->
          <g>
            <circle cx="560" cy="240" r="110" fill="#0f172a" stroke="#334155" stroke-width="2" />
            <circle cx="560" cy="240" r="96" fill="none" stroke="#1e293b" stroke-dasharray="4 6" />
            <g
              v-for="(angulo, i) in muescas"
              :key="`m${i}`"
              :transform="`rotate(${angulo} 560 240)`"
            >
              <line
                x1="452"
                y1="240"
                x2="442"
                y2="240"
                stroke="#475569"
                stroke-width="7"
                stroke-linecap="round"
              />
            </g>
            <circle
              cx="560"
              cy="240"
              r="18"
              fill="#1e293b"
              stroke="#22d3ee"
              stroke-opacity=".6"
              stroke-width="2"
            />
            <text
              x="560"
              y="245"
              text-anchor="middle"
              fill="#67e8f9"
              font-size="11"
              font-weight="700"
            >
              M1
            </text>
            <text
              x="560"
              y="112"
              text-anchor="middle"
              fill="#cbd5e1"
              font-size="14"
              font-weight="600"
            >
              Tambor 16 posiciones
            </text>
            <path
              d="M560 118 a122 122 0 0 0 -104 64"
              fill="none"
              stroke="#22d3ee"
              stroke-opacity=".4"
              stroke-width="2"
              stroke-dasharray="4 5"
            />
            <polygon points="452,178 464,176 458,166" fill="#22d3ee" opacity=".6" />
            <text x="445" y="198" fill="#67e8f9" font-size="11">1/16</text>

            <!-- Cilindro en posición de llenado -->
            <g transform="translate(450 240)">
              <rect
                x="-32"
                y="-13"
                width="64"
                height="26"
                rx="9"
                fill="#f59e0b1f"
                stroke="#fcd34d"
                stroke-width="2"
              />
              <rect
                x="-32"
                y="-13"
                width="7"
                height="26"
                rx="3"
                fill="#fcd34d"
                fill-opacity=".35"
              />
              <circle
                v-for="(c, i) in candies"
                :key="`c${i}`"
                :cx="c.x"
                :cy="c.y"
                r="3.6"
                :fill="c.color"
              />
            </g>
          </g>

          <!-- Caída y producto terminado -->
          <g>
            <path
              d="M458 282 C 462 330 478 360 490 390"
              stroke="#334155"
              stroke-width="12"
              fill="none"
              stroke-linecap="round"
            />
            <path
              d="M458 282 C 462 330 478 360 490 390"
              stroke="#34d399"
              stroke-opacity=".35"
              stroke-width="3"
              fill="none"
              stroke-dasharray="5 6"
            />
            <text x="470" y="330" fill="#6ee7b7" font-size="11">caída</text>
            <polygon
              points="430,390 570,390 555,455 445,455"
              fill="#34d39914"
              stroke="#6ee7b7"
              stroke-opacity=".5"
              stroke-width="2"
            />
            <g fill="#f59e0b22" stroke="#fcd34d" stroke-opacity=".6">
              <rect x="452" y="408" width="42" height="16" rx="8" />
              <rect x="502" y="414" width="42" height="16" rx="8" />
              <rect x="470" y="432" width="42" height="16" rx="8" />
            </g>
            <text
              x="500"
              y="480"
              text-anchor="middle"
              fill="#6ee7b7"
              font-size="12"
              font-weight="600"
            >
              Producto terminado
            </text>
          </g>
        </svg>

        <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 px-2 pb-1">
          <span
            v-for="item in leyenda"
            :key="item.texto"
            class="inline-flex items-center gap-1.5 text-[10px] text-slate-500"
          >
            <span class="h-2 w-2 rounded-full" :class="item.color" />
            {{ item.texto }}
          </span>
        </div>
      </div>

      <aside class="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <p class="text-xs font-semibold tracking-wide text-slate-400 uppercase">Panel de control</p>

        <div class="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-3 font-mono">
          <div class="flex justify-between text-[10px] tracking-wide text-emerald-300/70">
            <span>CICLOS</span>
            <span>ESTADO</span>
          </div>
          <div class="mt-1 flex justify-between text-lg font-bold text-emerald-300">
            <span>0000</span>
            <span>LISTO</span>
          </div>
        </div>

        <ul class="mt-4 space-y-2">
          <li
            v-for="luz in luces"
            :key="luz.nombre"
            class="flex items-center gap-2 text-xs text-slate-400"
          >
            <span class="h-2.5 w-2.5 rounded-full" :class="luz.clase" />
            {{ luz.nombre }}
          </li>
        </ul>

        <div
          class="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-[11px] text-slate-500"
        >
          <span>Tambor</span>
          <span class="font-mono text-slate-400">22,5° / ciclo</span>
        </div>
      </aside>
    </div>

    <div class="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <p class="text-xs font-semibold tracking-wide text-slate-400 uppercase">
          Gabinete de control
        </p>
        <p class="text-xs text-slate-500">PLC, relés, drivers y fuentes</p>
      </div>
      <div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        <div
          v-for="item in gabinete"
          :key="item.nombre"
          class="rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-2"
        >
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-semibold text-slate-200">{{ item.nombre }}</span>
            <span
              class="h-2 w-2 rounded-full"
              :class="
                item.activo
                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                  : 'bg-slate-700'
              "
            />
          </div>
          <p class="mt-0.5 text-[10px] text-slate-500">{{ item.detalle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
