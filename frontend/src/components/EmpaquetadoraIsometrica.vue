<script setup>
import { computed } from 'vue'
import { crearEscena } from '@/utils/isometrico'

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
  estado: { type: String, default: 'APAGADO' },
})

const { p, poli, elipse, caja, barra, cilindro, tronco } = crearEscena(252, 160)

const TAMBOR = { x: 205, z: 110, r: 66, y: 86 }
const ESTACION = 112.5
const RADIO_POCKET = 54

const PAL = {
  base: { luz: '#1d2939', medio: '#17212e', sombra: '#101822' },
  metal: { luz: '#31435a', medio: '#22324a', sombra: '#16212f' },
  oscuro: { luz: '#243447', medio: '#182435', sombra: '#0f1823' },
  tolva: { luz: '#2c3e54', medio: '#203046', sombra: '#141f2d', boca: '#080e16' },
}

const conPaleta = (caras, pal) => caras.map((c) => ({ pts: c.pts, fill: pal[c.tono] }))

const rad = (g) => (g * Math.PI) / 180

/* ---------- Estructura estática ---------- */

const base = conPaleta(caja(10, 0, 10, 330, 14, 220), PAL.base)

const rejilla = []
for (let x = 50; x <= 310; x += 40) {
  const [x1, y1] = p(x, 14.4, 16)
  const [x2, y2] = p(x, 14.4, 224)
  rejilla.push({ x1, y1, x2, y2 })
}
for (let z = 50; z <= 230; z += 40) {
  const [x1, y1] = p(16, 14.4, z)
  const [x2, y2] = p(324, 14.4, z)
  rejilla.push({ x1, y1, x2, y2 })
}

const sombras = [
  { ...elipse(205, 14.6, 110, 78), op: 0.55 },
  { ...elipse(73, 14.6, 55, 42), op: 0.4 },
  { ...elipse(52, 14.6, 150, 40), op: 0.4 },
  { ...elipse(308, 14.6, 197, 44), op: 0.4 },
]

// Tolva de golosinas (atrás a la izquierda)
const tolva = [
  ...conPaleta(tronco(73, 55, 128, 176, 30, 30, 62, 62), PAL.tolva),
  ...conPaleta(caja(64, 116, 46, 18, 14, 18), PAL.metal),
  ...conPaleta(barra([73, 14, 55], [73, 120, 55], 14, 14), PAL.oscuro),
]

const golosinas = [
  [52, 40],
  [70, 36],
  [88, 42],
  [60, 58],
  [78, 54],
  [94, 62],
  [50, 70],
  [66, 74],
  [84, 70],
  [58, 84],
  [76, 82],
  [92, 80],
].map(([x, z], i) => {
  const [cx, cy] = p(x, 172, z)
  return { cx, cy, color: ['#fbbf24', '#fb923c', '#f472b6', '#a3e635', '#38bdf8'][i % 5] }
})

// Canal desde la tolva hasta el cabezal dosificador
const canal = conPaleta(barra([73, 122, 55], [190, 126, 150], 20, 15), PAL.metal)

// Semitolva de cilindros vacíos (delante a la izquierda)
const semitolva = [
  ...conPaleta(tronco(52, 150, 96, 148, 26, 26, 58, 58), PAL.tolva),
  ...conPaleta(barra([52, 14, 150], [52, 92, 150], 12, 12), PAL.oscuro),
]

const pista = conPaleta(barra([64, 89, 165], [176, 89, 189], 18, 6), PAL.metal)

const vacios = [0, 1, 2].map((i) => {
  const t = i / 2
  const x = 84 + t * 70
  const z = 168 + t * 18
  const [cx, cy] = p(x, 92, z)
  return { cx, cy, rot: 22 }
})

const vaciosTolva = [
  [38, 136],
  [56, 142],
  [66, 158],
].map(([x, z]) => {
  const [cx, cy] = p(x, 146, z)
  return { cx, cy }
})

// Cabezal dosificador y compactador
const cabezal = conPaleta(caja(168, 110, 134, 40, 16, 38), PAL.metal)
const tuboDosificador = cilindro(192, 148, 102, 112, 4)
const carroM3 = conPaleta(caja(206, 96, 146, 18, 12, 16), PAL.oscuro)
const varillaM3 = conPaleta(barra([206, 102, 154], [192, 102, 154], 5, 5), PAL.metal)
const varillasS2 = conPaleta(
  [
    ...barra([176, 124, 158], [176, 104, 158], 3, 3),
    ...barra([184, 124, 164], [184, 104, 164], 3, 3),
  ],
  PAL.metal,
)
const padS2 = conPaleta(caja(170, 99, 157, 18, 6, 14), PAL.oscuro)

// Solenoide de inserción (delante)
const s1 = [
  ...conPaleta(caja(152, 82, 194, 26, 18, 26), PAL.metal),
  ...conPaleta(barra([165, 14, 207], [165, 84, 207], 9, 9), PAL.oscuro),
]
const vastagoS1 = conPaleta(barra([172, 92, 198], [183, 92, 163], 5, 5), PAL.metal)

// Salida de producto terminado
const canalSalida = conPaleta(barra([259, 84, 148], [302, 46, 196], 24, 9), PAL.metal)

const cajaBandeja = {
  fondo: poli([
    [278, 14, 168],
    [338, 14, 168],
    [338, 14, 226],
    [278, 14, 226],
  ]),
  atras: poli([
    [278, 14, 168],
    [338, 14, 168],
    [338, 52, 168],
    [278, 52, 168],
  ]),
  derecha: poli([
    [338, 14, 168],
    [338, 52, 168],
    [338, 52, 226],
    [338, 14, 226],
  ]),
  delante: poli([
    [278, 14, 226],
    [338, 14, 226],
    [338, 52, 226],
    [278, 52, 226],
  ]),
}

const productosCaja = [0, 1, 2, 3, 4].map((i) => {
  const posiciones = [
    [296, 186],
    [314, 186],
    [306, 200],
    [292, 206],
    [320, 204],
  ]
  const [x, z] = posiciones[i]
  return cilindro(x, z, 26, 40, 8)
})

// HMI sobre pedestal (atrás a la derecha)
const hmi = {
  poste: conPaleta(barra([319, 14, 46], [319, 112, 46], 8, 8), PAL.oscuro),
  caja: conPaleta(caja(300, 112, 40, 38, 26, 7), PAL.metal),
  pantalla: poli([
    [304, 116, 47.4],
    [334, 116, 47.4],
    [334, 134, 47.4],
    [304, 134, 47.4],
  ]),
  lineas: [121, 126, 131].map((y) => {
    const [x1, y1] = p(308, y, 47.6)
    const [x2, y2] = p(330, y, 47.6)
    return { x1, y1, x2, y2 }
  }),
}

// Torre de luces
const torre = {
  poste: conPaleta(barra([330, 14, 92], [330, 96, 92], 6, 6), PAL.oscuro),
  luces: [
    { ...cilindro(330, 92, 96, 103, 6) },
    { ...cilindro(330, 92, 104, 111, 6) },
    { ...cilindro(330, 92, 112, 119, 6) },
  ],
}

const luzActiva = computed(() => {
  if (props.estado === 'PARO') return 'rojo'
  if (props.estado === 'SIN MATERIAL') return 'ambar'
  if (props.estado === 'APAGADO') return null
  return 'verde'
})

/* ---------- Tambor ---------- */

const tambor = cilindro(TAMBOR.x, TAMBOR.z, 14, TAMBOR.y, TAMBOR.r)
const hub = cilindro(TAMBOR.x, TAMBOR.z, TAMBOR.y, TAMBOR.y + 11, 19)

const agujas = computed(() =>
  Array.from({ length: 16 }, (_, i) => {
    const a0 = rad(i * 22.5)
    const a1 = rad(i * 22.5 + props.giro)
    const [bx, by] = p(
      TAMBOR.x + RADIO_POCKET * Math.cos(a0),
      TAMBOR.y,
      TAMBOR.z + RADIO_POCKET * Math.sin(a0),
    )
    const [cx, cy] = p(
      TAMBOR.x + RADIO_POCKET * Math.cos(a1),
      TAMBOR.y,
      TAMBOR.z + RADIO_POCKET * Math.sin(a1),
    )
    return {
      ...elipse(
        TAMBOR.x + RADIO_POCKET * Math.cos(a0),
        TAMBOR.y,
        TAMBOR.z + RADIO_POCKET * Math.sin(a0),
        8.4,
      ),
      dx: (cx - bx).toFixed(1),
      dy: (cy - by).toFixed(1),
      sync: i === 0,
    }
  }),
)

const agujaActiva = computed(() => {
  const indice = Math.round((ESTACION - props.giro) / 22.5) % 16
  return (indice + 16) % 16
})

const marcaEstacion = computed(() => {
  const a = rad(ESTACION)
  const [x1, y1] = p(TAMBOR.x + 74 * Math.cos(a), TAMBOR.y + 1, TAMBOR.z + 74 * Math.sin(a))
  const [x2, y2] = p(TAMBOR.x + 62 * Math.cos(a), TAMBOR.y + 1, TAMBOR.z + 62 * Math.sin(a))
  const [x3, y3] = p(
    TAMBOR.x + 70 * Math.cos(a + 0.09),
    TAMBOR.y + 1,
    TAMBOR.z + 70 * Math.sin(a + 0.09),
  )
  return `${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)} ${x3.toFixed(1)},${y3.toFixed(1)}`
})

/* ---------- Pieza en la estación ---------- */

const EST = {
  x: TAMBOR.x + RADIO_POCKET * Math.cos(rad(ESTACION)),
  z: TAMBOR.z + RADIO_POCKET * Math.sin(rad(ESTACION)),
}
const EST_INICIO = {
  x: TAMBOR.x + 84 * Math.cos(rad(ESTACION)),
  z: TAMBOR.z + 84 * Math.sin(rad(ESTACION)),
}

const pieza = cilindro(EST.x, EST.z, TAMBOR.y, TAMBOR.y + 13, 8.6)

const estiloPieza = computed(() => {
  const [ax, ay] = p(EST_INICIO.x, TAMBOR.y, EST_INICIO.z)
  const [bx, by] = p(EST.x, TAMBOR.y, EST.z)
  const t = 1 - props.cilindro
  const dx = (ax - bx) * t + (props.cayendo ? 58 : 0)
  const dy = (ay - by) * t + (props.cayendo ? 26 : 0)
  return {
    transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`,
    transformBox: 'view-box',
    opacity: props.cayendo ? 0.55 : 1,
    transition: `transform ${props.cayendo ? props.dur * 1.3 : props.dur}ms cubic-bezier(0.42, 0, 0.25, 1), opacity ${props.dur}ms linear`,
  }
})

const golosinasPieza = [
  [0.3, -0.2],
  [-0.25, 0.15],
  [0.05, 0.35],
].map(([dx, dz], i) => {
  const [cx, cy] = p(EST.x + dx * 9, TAMBOR.y + 6, EST.z + dz * 9)
  return { cx, cy, color: ['#fbbf24', '#f472b6', '#a3e635'][i] }
})

const estiloTransicion = computed(() => ({
  transition: `transform ${props.dur}ms cubic-bezier(0.42, 0, 0.25, 1)`,
  transformBox: 'view-box',
}))

const estiloM2 = computed(() => ({
  transform: `translate(0, ${(props.m2 * 8 * 0.9).toFixed(1)}px)`,
  transformBox: 'view-box',
  transition: `transform ${props.dur}ms cubic-bezier(0.42, 0, 0.25, 1)`,
}))

const estiloM3 = computed(() => ({
  transform: `translate(${(props.m3 * -13).toFixed(1)}px, ${(props.m3 * -6).toFixed(1)}px)`,
  transformBox: 'view-box',
  transition: `transform ${props.dur}ms cubic-bezier(0.42, 0, 0.25, 1)`,
}))

const estiloS2 = computed(() => ({
  transform: `translate(0, ${(props.s2 * 9).toFixed(1)}px)`,
  transformBox: 'view-box',
  transition: `transform ${props.dur}ms cubic-bezier(0.42, 0, 0.25, 1)`,
}))

/* ---------- Etiquetas ---------- */

const etiquetas = [
  { x: 268, y: 44, texto: 'TOLVA', anchor: 'middle' },
  { x: 167, y: 92, texto: 'SEMITOLVA', anchor: 'middle' },
  { x: 150, y: 300, texto: 'S1 · INSERTA', anchor: 'middle' },
  { x: 402, y: 300, texto: 'SALIDA', anchor: 'start' },
  { x: 489, y: 176, texto: 'HMI', anchor: 'middle' },
]

const actuadores = [
  { ...posTexto(192, 130, 148, 0, -3), texto: 'M2', color: '#5eead4' },
  { ...posTexto(224, 112, 154, 6, 3), texto: 'M3', color: '#c4b5fd' },
  { ...posTexto(179, 110, 164, -6, -3), texto: 'S2', color: '#fda4af', anchor: 'end' },
]

function posTexto(x, y, z, dx, dy) {
  const [sx, sy] = p(x, y, z)
  return { x: sx + dx, y: sy + dy }
}
</script>

<template>
  <svg viewBox="0 0 600 420" class="h-auto w-full" role="img" aria-labelledby="iso-titulo iso-desc">
    <title id="iso-titulo">Vista isométrica de la empaquetadora</title>
    <desc id="iso-desc">
      Tolva de golosinas, canal de dosificación con los motores 2 y 3, semitolva de cilindros
      vacíos, solenoide de inserción, tambor de 16 posiciones, compactador, salida de producto y
      panel de control.
    </desc>

    <defs>
      <linearGradient id="cuerpoTambor" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#33475f" />
        <stop offset="0.45" stop-color="#1d2b3d" />
        <stop offset="1" stop-color="#0f1926" />
      </linearGradient>
      <radialGradient id="tapaTambor" cx="0.35" cy="0.28" r="0.85">
        <stop offset="0" stop-color="#3a5570" />
        <stop offset="1" stop-color="#16222f" />
      </radialGradient>
      <radialGradient id="sombraSuelo">
        <stop offset="0" stop-color="#000" stop-opacity="1" />
        <stop offset="1" stop-color="#000" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="halo">
        <stop offset="0" stop-color="#22d3ee" stop-opacity="0.4" />
        <stop offset="1" stop-color="#22d3ee" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- Suelo -->
    <ellipse
      v-for="(s, i) in sombras"
      :key="`sh${i}`"
      :cx="s.cx"
      :cy="s.cy"
      :rx="s.rx"
      :ry="s.ry"
      fill="url(#sombraSuelo)"
      :opacity="s.op"
    />
    <polygon v-for="(c, i) in base" :key="`b${i}`" :points="c.pts" :fill="c.fill" />
    <line
      v-for="(g, i) in rejilla"
      :key="`g${i}`"
      :x1="g.x1"
      :y1="g.y1"
      :x2="g.x2"
      :y2="g.y2"
      stroke="#243348"
      stroke-width="0.7"
      stroke-opacity="0.7"
    />

    <!-- Tolva de golosinas -->
    <polygon v-for="(c, i) in tolva" :key="`t${i}`" :points="c.pts" :fill="c.fill" />
    <circle
      v-for="(g, i) in golosinas"
      :key="`tg${i}`"
      :cx="g.cx"
      :cy="g.cy"
      r="3.4"
      :fill="g.color"
      :opacity="material ? 0.9 : 0.12"
      style="transition: opacity 400ms ease"
    />

    <!-- Semitolva y pista vibratoria -->
    <polygon v-for="(c, i) in semitolva" :key="`st${i}`" :points="c.pts" :fill="c.fill" />
    <ellipse
      v-for="(c, i) in vaciosTolva"
      :key="`vt${i}`"
      :cx="c.cx"
      :cy="c.cy"
      rx="10"
      ry="5"
      fill="#fbbf24"
      fill-opacity="0.16"
      stroke="#fbbf24"
      stroke-opacity="0.45"
      stroke-width="1"
    />
    <polygon v-for="(c, i) in pista" :key="`pi${i}`" :points="c.pts" :fill="c.fill" />
    <ellipse
      v-for="(c, i) in vacios"
      :key="`va${i}`"
      :cx="c.cx"
      :cy="c.cy"
      rx="10.5"
      ry="5.2"
      fill="#fbbf24"
      fill-opacity="0.18"
      stroke="#fbbf24"
      stroke-opacity="0.55"
      stroke-width="1.1"
    />

    <!-- Tambor de 16 posiciones -->
    <path :d="tambor.cuerpo" fill="url(#cuerpoTambor)" />
    <ellipse
      :cx="tambor.tapa.cx"
      :cy="tambor.tapa.cy"
      :rx="tambor.tapa.rx"
      :ry="tambor.tapa.ry"
      fill="url(#tapaTambor)"
      stroke="#48607c"
      stroke-width="1.4"
    />
    <ellipse
      :cx="tambor.tapa.cx"
      :cy="tambor.tapa.cy"
      :rx="tambor.tapa.rx - 7"
      :ry="tambor.tapa.ry - 4"
      fill="none"
      stroke="#22d3ee"
      stroke-opacity="0.18"
      stroke-width="1"
    />

    <g
      v-for="(a, i) in agujas"
      :key="`ag${i}`"
      :style="{
        ...estiloTransicion,
        transform: `translate(${a.dx}px, ${a.dy}px)`,
      }"
    >
      <ellipse
        :cx="a.cx"
        :cy="a.cy"
        :rx="a.rx"
        :ry="a.ry"
        fill="#08111c"
        :stroke="a.sync ? '#22d3ee' : i === agujaActiva ? '#67e8f9' : '#465a73'"
        :stroke-opacity="a.sync ? 0.9 : i === agujaActiva ? 0.85 : 0.55"
        stroke-width="1.5"
      />
      <ellipse
        :cx="a.cx"
        :cy="Number(a.cy) + 1.6"
        :rx="a.rx - 3.2"
        :ry="a.ry - 1.9"
        fill="#0d1927"
        stroke="#2a3a4e"
        stroke-width="0.7"
      />
    </g>

    <polygon :points="marcaEstacion" fill="#22d3ee" fill-opacity="0.8" />

    <!-- Motor / eje del tambor -->
    <path :d="hub.cuerpo" fill="#213246" stroke="#3a4d64" stroke-width="1" />
    <ellipse
      :cx="hub.tapa.cx"
      :cy="hub.tapa.cy"
      :rx="hub.tapa.rx"
      :ry="hub.tapa.ry"
      fill="#2b4258"
      stroke="#22d3ee"
      stroke-opacity="0.5"
      stroke-width="1.2"
    />
    <text
      :x="hub.tapa.cx"
      :y="Number(hub.tapa.cy) + 3"
      text-anchor="middle"
      fill="#67e8f9"
      font-size="9"
      font-weight="700"
      letter-spacing="0.08em"
    >
      M1
    </text>

    <!-- Cabezal dosificador -->
    <polygon v-for="(c, i) in canal" :key="`ca${i}`" :points="c.pts" :fill="c.fill" />
    <polygon v-for="(c, i) in cabezal" :key="`cb${i}`" :points="c.pts" :fill="c.fill" />
    <g :style="estiloM2">
      <path :d="tuboDosificador.cuerpo" fill="#2b3d52" stroke="#4a627e" stroke-width="0.8" />
      <ellipse
        :cx="tuboDosificador.tapa.cx"
        :cy="tuboDosificador.tapa.cy"
        :rx="tuboDosificador.tapa.rx"
        :ry="tuboDosificador.tapa.ry"
        fill="#5eead4"
        fill-opacity="0.85"
      />
    </g>
    <g :style="estiloM3">
      <polygon v-for="(c, i) in carroM3" :key="`m3${i}`" :points="c.pts" :fill="c.fill" />
      <polygon v-for="(c, i) in varillaM3" :key="`v3${i}`" :points="c.pts" :fill="c.fill" />
    </g>
    <g :style="estiloS2">
      <polygon v-for="(c, i) in varillasS2" :key="`v2${i}`" :points="c.pts" :fill="c.fill" />
      <polygon v-for="(c, i) in padS2" :key="`p2${i}`" :points="c.pts" :fill="c.fill" />
    </g>

    <!-- Pieza en la estación -->
    <g v-if="visible" :style="estiloPieza">
      <path
        :d="pieza.cuerpo"
        fill="#fbbf24"
        fill-opacity="0.2"
        stroke="#fbbf24"
        stroke-opacity="0.8"
        stroke-width="1.2"
      />
      <ellipse
        :cx="pieza.tapa.cx"
        :cy="pieza.tapa.cy"
        :rx="pieza.tapa.rx"
        :ry="pieza.tapa.ry"
        fill="#0b1420"
        stroke="#fbbf24"
        stroke-opacity="0.85"
        stroke-width="1.2"
      />
      <circle
        v-for="(g, i) in golosinasPieza"
        :key="`gp${i}`"
        :cx="g.cx"
        :cy="g.cy"
        r="3.6"
        :fill="g.color"
        :opacity="llenado"
        style="transition: opacity 260ms ease"
      />
    </g>

    <!-- Solenoide de inserción -->
    <polygon v-for="(c, i) in s1" :key="`s1${i}`" :points="c.pts" :fill="c.fill" />
    <template v-if="visible">
      <polygon v-for="(c, i) in vastagoS1" :key="`vs${i}`" :points="c.pts" :fill="c.fill" />
    </template>

    <!-- Salida y bandeja de producto -->
    <polygon v-for="(c, i) in canalSalida" :key="`cs${i}`" :points="c.pts" :fill="c.fill" />
    <polygon :points="cajaBandeja.fondo" fill="#0a121c" />
    <polygon :points="cajaBandeja.atras" fill="#152132" />
    <g v-for="n in productos" :key="`pr${n}`">
      <path
        :d="productosCaja[n - 1].cuerpo"
        fill="#34d399"
        fill-opacity="0.28"
        stroke="#34d399"
        stroke-opacity="0.6"
        stroke-width="1"
      />
      <ellipse
        :cx="productosCaja[n - 1].tapa.cx"
        :cy="productosCaja[n - 1].tapa.cy"
        :rx="productosCaja[n - 1].tapa.rx"
        :ry="productosCaja[n - 1].tapa.ry"
        fill="#0c2019"
        stroke="#34d399"
        stroke-opacity="0.6"
        stroke-width="1"
      />
    </g>
    <polygon :points="cajaBandeja.derecha" fill="#1d2c3e" />
    <polygon :points="cajaBandeja.delante" fill="#152132" stroke="#2c3f55" stroke-width="0.8" />

    <!-- HMI y torre de luces -->
    <polygon v-for="(c, i) in hmi.poste" :key="`hp${i}`" :points="c.pts" :fill="c.fill" />
    <polygon v-for="(c, i) in hmi.caja" :key="`hc${i}`" :points="c.pts" :fill="c.fill" />
    <polygon
      :points="hmi.pantalla"
      fill="#04120e"
      stroke="#34d399"
      stroke-opacity="0.5"
      stroke-width="1"
    />
    <line
      v-for="(l, i) in hmi.lineas"
      :key="`hl${i}`"
      :x1="l.x1"
      :y1="l.y1"
      :x2="l.x2"
      :y2="l.y2"
      stroke="#34d399"
      stroke-opacity="0.45"
      stroke-width="1.4"
    />
    <polygon v-for="(c, i) in torre.poste" :key="`tp${i}`" :points="c.pts" :fill="c.fill" />
    <g v-for="(l, i) in torre.luces" :key="`tl${i}`">
      <path
        :d="l.cuerpo"
        :fill="
          (i === 2 && luzActiva === 'verde') ||
          (i === 1 && luzActiva === 'ambar') ||
          (i === 0 && luzActiva === 'rojo')
            ? ['#f43f5e', '#fbbf24', '#34d399'][i]
            : '#1b2838'
        "
        :stroke="['#7f1d1d', '#78350f', '#064e3b'][i]"
        stroke-width="0.8"
      />
      <ellipse
        :cx="l.tapa.cx"
        :cy="l.tapa.cy"
        :rx="l.tapa.rx"
        :ry="l.tapa.ry"
        :fill="
          (i === 2 && luzActiva === 'verde') ||
          (i === 1 && luzActiva === 'ambar') ||
          (i === 0 && luzActiva === 'rojo')
            ? ['#fda4af', '#fde68a', '#6ee7b7'][i]
            : '#243244'
        "
      />
    </g>

    <!-- Etiquetas -->
    <text
      v-for="(e, i) in etiquetas"
      :key="`et${i}`"
      :x="e.x"
      :y="e.y"
      :text-anchor="e.anchor"
      fill="#64748b"
      font-size="9"
      font-weight="600"
      letter-spacing="0.12em"
    >
      {{ e.texto }}
    </text>
    <text
      v-for="(a, i) in actuadores"
      :key="`ac${i}`"
      :x="a.x"
      :y="a.y"
      :text-anchor="a.anchor || 'middle'"
      :fill="a.color"
      font-size="8"
      font-weight="700"
      letter-spacing="0.08em"
    >
      {{ a.texto }}
    </text>
  </svg>
</template>
