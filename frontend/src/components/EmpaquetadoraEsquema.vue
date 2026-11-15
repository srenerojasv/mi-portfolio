<script setup>
import { computed } from 'vue'

const props = defineProps({
  giro: { type: Number, default: 0 },
  dur: { type: Number, default: 620 },
  paso: { type: Number, default: 0 },
  cilindro: { type: Number, default: 0 },
  visible: { type: Boolean, default: false },
  cayendo: { type: Boolean, default: false },
  llenado: { type: Number, default: 0 },
  m2: { type: Number, default: 0 },
  m3: { type: Number, default: 0 },
  s2: { type: Number, default: 0 },
  productos: { type: Number, default: 0 },
  material: { type: Boolean, default: true },
})

const RECORRIDO = 96
const BASE_X = 600
const BASE_Y = 273

const estiloCilindro = computed(() => ({
  transform: props.cayendo
    ? `translate(${RECORRIDO + 72}px, 190px) rotate(34deg)`
    : `translate(${RECORRIDO * props.cilindro}px, 0px)`,
  transformOrigin: `${BASE_X + 38}px 290px`,
  transformBox: 'view-box',
  opacity: props.visible ? 1 : 0,
  transition: `transform ${props.cayendo ? props.dur * 1.4 : props.dur}ms cubic-bezier(0.42, 0, 0.25, 1), opacity 140ms linear`,
}))

const estiloTambor = computed(() => ({
  transform: `rotate(${props.giro}deg)`,
  transformOrigin: '800px 290px',
  transformBox: 'view-box',
  transition: `transform ${props.dur}ms cubic-bezier(0.42, 0, 0.25, 1)`,
}))

const estiloCarro = (valor) => ({
  transform: `translate(${valor * 26}px, 0px)`,
  transformBox: 'view-box',
  transition: `transform ${props.dur}ms cubic-bezier(0.42, 0, 0.25, 1)`,
})

const golosinasTolva = [
  { x: 88, y: 96, c: '#fbbf24' },
  { x: 120, y: 96, c: '#fb923c' },
  { x: 152, y: 96, c: '#f472b6' },
  { x: 184, y: 96, c: '#a3e635' },
  { x: 96, y: 120, c: '#38bdf8' },
  { x: 128, y: 120, c: '#fbbf24' },
  { x: 160, y: 120, c: '#fb923c' },
  { x: 192, y: 120, c: '#f472b6' },
  { x: 102, y: 144, c: '#a3e635' },
  { x: 134, y: 144, c: '#38bdf8' },
  { x: 166, y: 144, c: '#fbbf24' },
  { x: 190, y: 148, c: '#fb923c' },
  { x: 108, y: 168, c: '#f472b6' },
  { x: 140, y: 168, c: '#a3e635' },
  { x: 172, y: 168, c: '#38bdf8' },
  { x: 114, y: 190, c: '#fbbf24' },
  { x: 144, y: 190, c: '#fb923c' },
  { x: 170, y: 192, c: '#f472b6' },
]

const golosinasCanal = [
  { x: 250, y: 212, c: '#fbbf24' },
  { x: 282, y: 208, c: '#fb923c' },
  { x: 314, y: 213, c: '#f472b6' },
  { x: 346, y: 209, c: '#a3e635' },
  { x: 378, y: 212, c: '#38bdf8' },
  { x: 410, y: 208, c: '#fbbf24' },
  { x: 442, y: 213, c: '#fb923c' },
  { x: 474, y: 209, c: '#f472b6' },
  { x: 506, y: 212, c: '#a3e635' },
  { x: 538, y: 208, c: '#38bdf8' },
  { x: 570, y: 213, c: '#fbbf24' },
  { x: 602, y: 209, c: '#fb923c' },
  { x: 634, y: 212, c: '#f472b6' },
  { x: 666, y: 209, c: '#a3e635' },
  { x: 720, y: 238, c: '#38bdf8' },
  { x: 720, y: 256, c: '#fbbf24' },
]

const cilindrosSemitolva = [
  { x: 266, y: 258 },
  { x: 306, y: 258 },
  { x: 266, y: 284 },
  { x: 306, y: 284 },
  { x: 266, y: 310 },
  { x: 306, y: 310 },
]

const golosinasCilindro = [
  { x: 612, y: 289, c: '#fbbf24' },
  { x: 626, y: 297, c: '#f472b6' },
  { x: 640, y: 285, c: '#a3e635' },
  { x: 654, y: 296, c: '#fb923c' },
  { x: 666, y: 288, c: '#38bdf8' },
]

const muescas = Array.from({ length: 16 }, (_, i) => i * 22.5)

const producto = [
  { x: 736, y: 458 },
  { x: 786, y: 472 },
  { x: 834, y: 458 },
  { x: 762, y: 494 },
  { x: 812, y: 502 },
]
</script>

<template>
  <svg
    viewBox="0 0 1000 580"
    class="h-auto w-full"
    role="img"
    aria-labelledby="sinoptico-titulo sinoptico-desc"
  >
    <title id="sinoptico-titulo">Sinóptico animado de la empaquetadora</title>
    <desc id="sinoptico-desc">
      Tolva de golosinas con sensor de nivel, canal de dosificación con los motores 2 y 3, semitolva
      vibratoria de cilindros vacíos, solenoide 1 de inserción, tambor de 16 posiciones accionado
      por el motor 1, solenoide 2 de compactación y tolva de producto terminado.
    </desc>

    <defs>
      <pattern id="reticula" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0H0V20" fill="none" stroke="#1e293b" stroke-width="0.6" stroke-opacity="0.5" />
      </pattern>
    </defs>

    <rect width="1000" height="580" fill="url(#reticula)" />

    <!-- Tolva de golosinas -->
    <g>
      <polygon
        points="70,78 210,78 186,200 94,200"
        fill="#0f1a2a"
        stroke="#64748b"
        stroke-width="1.5"
      />
      <circle
        v-for="(g, i) in golosinasTolva"
        :key="`tg${i}`"
        :cx="g.x"
        :cy="g.y"
        r="4.2"
        :fill="g.c"
        :opacity="material ? 0.85 : 0.1"
        style="transition: opacity 400ms ease"
      />
      <circle cx="96" cy="172" r="3.6" :fill="material ? '#34d399' : '#fbbf24'" />
      <circle
        cx="96"
        cy="172"
        r="7"
        fill="none"
        :stroke="material ? '#34d399' : '#fbbf24'"
        stroke-opacity="0.35"
      />
      <text x="86" y="176" text-anchor="end" fill="#64748b" font-size="9">S nivel</text>
      <text
        x="140"
        y="64"
        text-anchor="middle"
        fill="#e2e8f0"
        font-size="11"
        font-weight="600"
        letter-spacing="0.08em"
      >
        TOLVA DE GOLOSINAS
      </text>
    </g>

    <!-- Canal de dosificación y caída al cilindro -->
    <g fill="none" stroke="#475569" stroke-width="1.5">
      <path d="M140 198H702V272" />
      <path d="M140 222H726V272" />
    </g>
    <circle
      v-for="(g, i) in golosinasCanal"
      :key="`cg${i}`"
      :cx="g.x"
      :cy="g.y"
      r="4"
      :fill="g.c"
      fill-opacity="0.85"
    />

    <!-- Guía y carros de dosificación / empuje -->
    <g>
      <line
        x1="214"
        y1="182"
        x2="690"
        y2="182"
        stroke="#334155"
        stroke-width="1.5"
        stroke-dasharray="5 5"
      />
      <g :style="estiloCarro(m2)">
        <rect
          x="296"
          y="168"
          width="34"
          height="22"
          rx="4"
          fill="#0f1a2a"
          stroke="#2dd4bf"
          :stroke-width="paso === 4 ? 2.5 : 1.5"
        />
        <line x1="330" y1="192" x2="330" y2="210" stroke="#2dd4bf" stroke-width="3" />
        <text x="313" y="162" text-anchor="middle" fill="#5eead4" font-size="10" font-weight="700">
          M2
        </text>
      </g>
      <g :style="estiloCarro(m3)">
        <rect
          x="560"
          y="168"
          width="34"
          height="22"
          rx="4"
          fill="#0f1a2a"
          stroke="#a78bfa"
          :stroke-width="paso === 4 ? 2.5 : 1.5"
        />
        <line x1="594" y1="192" x2="594" y2="210" stroke="#a78bfa" stroke-width="3" />
        <text x="577" y="162" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="700">
          M3
        </text>
      </g>
      <text x="368" y="176" fill="#475569" font-size="9" letter-spacing="0.06em">
        dosificación · empuje
      </text>
    </g>

    <!-- Semitolva vibratoria de cilindros vacíos -->
    <g>
      <polygon
        points="250,242 390,242 372,352 268,352"
        fill="#0f1a2a"
        stroke="#64748b"
        stroke-width="1.5"
      />
      <rect
        v-for="(c, i) in cilindrosSemitolva"
        :key="`sc${i}`"
        :x="c.x"
        :y="c.y"
        width="34"
        height="13"
        rx="6.5"
        fill="#fbbf24"
        fill-opacity="0.12"
        stroke="#fbbf24"
        stroke-opacity="0.6"
        stroke-width="1.2"
      />
      <g fill="none" stroke="#fbbf24" stroke-opacity="0.45" stroke-width="1.4">
        <path d="M240 274q-7 14 0 28" />
        <path d="M231 267q-9 21 0 42" />
        <path d="M222 260q-11 28 0 56" />
      </g>
      <text
        x="320"
        y="232"
        text-anchor="middle"
        fill="#cbd5e1"
        font-size="11"
        font-weight="600"
        letter-spacing="0.08em"
      >
        SEMITOLVA
      </text>
      <text x="320" y="368" text-anchor="middle" fill="#64748b" font-size="9">
        cilindros vacíos · vibración
      </text>
    </g>

    <!-- Pista vibratoria hasta la estación de inserción -->
    <g fill="none" stroke="#475569" stroke-width="1.5">
      <path d="M381 276H520" />
      <path d="M381 306H520" />
    </g>
    <g stroke="#64748b" stroke-width="1.2" fill="none">
      <path d="M444 268l8 0" />
      <path d="M452 264l4 4-4 4" />
    </g>

    <!-- Solenoide 1: inserta el cilindro vacío -->
    <g>
      <rect
        x="520"
        y="272"
        width="62"
        height="36"
        rx="6"
        fill="#0f1a2a"
        stroke="#fb7185"
        :stroke-width="paso === 3 ? 2.5 : 1.5"
      />
      <line
        x1="582"
        y1="290"
        :x2="600 + RECORRIDO * cilindro"
        y2="290"
        stroke="#fb7185"
        stroke-width="3.5"
      />
      <text x="551" y="264" text-anchor="middle" fill="#fda4af" font-size="10" font-weight="700">
        S1
      </text>
      <text x="551" y="330" text-anchor="middle" fill="#64748b" font-size="9">
        inserta cilindro
      </text>
    </g>

    <!-- Solenoide 2: brazo de compactación -->
    <g>
      <rect
        x="600"
        y="344"
        width="58"
        height="26"
        rx="6"
        fill="#0f1a2a"
        stroke="#fb7185"
        :stroke-width="paso === 5 ? 2.5 : 1.5"
      />
      <line
        x1="658"
        y1="352"
        :x2="684 + 10 * s2"
        :y2="322 - 8 * s2"
        stroke="#fb7185"
        stroke-width="3.5"
      />
      <text x="629" y="388" text-anchor="middle" fill="#fda4af" font-size="10" font-weight="700">
        S2
      </text>
      <text x="629" y="402" text-anchor="middle" fill="#64748b" font-size="9">compacta</text>
    </g>

    <!-- Tambor de 16 posiciones -->
    <g>
      <circle cx="800" cy="290" r="130" fill="#0b1424" stroke="#64748b" stroke-width="1.5" />
      <circle
        cx="800"
        cy="290"
        r="118"
        fill="none"
        stroke="#1e293b"
        stroke-width="1"
        stroke-dasharray="3 5"
      />

      <!-- Rotor: muescas y muesca de sincronización -->
      <g :style="estiloTambor">
        <g v-for="(angulo, i) in muescas" :key="`m${i}`" :transform="`rotate(${angulo} 800 290)`">
          <line
            x1="912"
            y1="290"
            x2="926"
            y2="290"
            :stroke="paso === 6 ? '#22d3ee' : '#475569'"
            stroke-width="9"
            stroke-linecap="round"
          />
          <circle cx="870" cy="290" r="4.5" fill="#1e293b" stroke="#334155" stroke-width="1" />
        </g>
        <polygon points="793,146 807,146 800,160" fill="#22d3ee" fill-opacity="0.75" />
      </g>

      <circle cx="800" cy="290" r="24" fill="#0f1a2a" stroke="#22d3ee" stroke-opacity="0.45" />
      <text
        x="800"
        y="294"
        text-anchor="middle"
        fill="#67e8f9"
        font-size="10"
        font-weight="700"
        letter-spacing="0.05em"
      >
        M1
      </text>
      <path
        d="M842 224A80 80 0 0 1 878 282"
        fill="none"
        stroke="#22d3ee"
        stroke-opacity="0.35"
        stroke-width="1.5"
        stroke-dasharray="3 4"
      />
      <polygon points="874,290 882,280 868,278" fill="#22d3ee" fill-opacity="0.45" />

      <text x="786" y="152" text-anchor="end" fill="#64748b" font-size="9">S·SYNC</text>

      <text x="948" y="116" text-anchor="end" fill="#cbd5e1" font-size="11" font-weight="600">
        TAMBOR · 16 POSICIONES
      </text>
      <text x="948" y="132" text-anchor="end" fill="#64748b" font-size="9">paso 22,5° · 1/16</text>

      <!-- Muesca de llenado -->
      <rect
        x="686"
        y="262"
        width="92"
        height="56"
        rx="10"
        fill="#0b1424"
        stroke="#64748b"
        stroke-width="1.5"
      />
      <rect
        x="696"
        y="272"
        width="76"
        height="36"
        rx="6"
        fill="none"
        stroke="#475569"
        stroke-width="1"
        stroke-dasharray="4 4"
      />
    </g>

    <!-- Cilindro: pista, muesca y caída -->
    <g :style="estiloCilindro">
      <rect
        x="600"
        y="273"
        width="76"
        height="34"
        rx="6"
        fill="#fbbf24"
        fill-opacity="0.12"
        stroke="#fbbf24"
        :stroke-width="paso === 4 || paso === 5 ? 2.2 : 1.5"
      />
      <circle
        v-for="(g, i) in golosinasCilindro"
        :key="`ic${i}`"
        :cx="g.x"
        :cy="g.y"
        r="3.6"
        :fill="g.c"
        :opacity="llenado"
        style="transition: opacity 260ms ease"
      />
    </g>

    <!-- Salida a producto terminado -->
    <g>
      <path d="M656 334L716 438" fill="none" stroke="#475569" stroke-width="1.5" />
      <path d="M692 338L754 442" fill="none" stroke="#475569" stroke-width="1.5" />
      <polygon
        points="706,442 906,442 886,528 726,528"
        fill="#0f1a2a"
        stroke="#34d399"
        stroke-opacity="0.55"
        stroke-width="1.5"
      />
      <rect
        v-for="n in productos"
        :key="`p${n}`"
        :x="producto[n - 1].x"
        :y="producto[n - 1].y"
        width="34"
        height="13"
        rx="6.5"
        fill="#34d399"
        fill-opacity="0.12"
        stroke="#34d399"
        stroke-opacity="0.55"
        stroke-width="1.2"
      />
      <text
        x="806"
        y="550"
        text-anchor="middle"
        fill="#6ee7b7"
        font-size="10"
        font-weight="600"
        letter-spacing="0.06em"
      >
        PRODUCTO TERMINADO
      </text>
    </g>
  </svg>
</template>
