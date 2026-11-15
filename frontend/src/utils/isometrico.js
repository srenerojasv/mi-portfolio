// Proyección isométrica (dimétrica) para el sinóptico de la empaquetadora.
// +x baja a la derecha, +z baja a la izquierda, +y sube.
export const COS = Math.sqrt(3) / 2
export const SEN = 0.42
export const ALTO = 0.9

const VISTA = [1, 1, 1]
const sumar = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
const restar = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const escalar = (a, k) => [a[0] * k, a[1] * k, a[2] * k]
const producto = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cruz = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
]
const unitario = (a) => {
  const m = Math.sqrt(producto(a, a)) || 1
  return escalar(a, 1 / m)
}

export function crearEscena(ox, oy) {
  const p = (x, y, z) => [ox + (x - z) * COS, oy + (x + z) * SEN - y * ALTO]
  const n = (v) => (Math.abs(v) < 0.05 ? '0' : v.toFixed(1))

  const poli = (puntos) =>
    puntos
      .map(([x, y, z]) => {
        const [sx, sy] = p(x, y, z)
        return `${n(sx)},${n(sy)}`
      })
      .join(' ')

  const poli2 = (puntos) => puntos.map(([x, y]) => `${n(x)},${n(y)}`).join(' ')

  // Elipse que describe un círculo horizontal de radio r.
  const elipse = (x, y, z, r) => {
    const [sx, sy] = p(x, y, z)
    return { cx: n(sx), cy: n(sy), rx: n(r * COS * Math.SQRT2), ry: n(r * SEN * Math.SQRT2) }
  }

  // Caja alineada a los ejes: solo las tres caras visibles.
  const caja = (x, y, z, w, h, d) => [
    {
      pts: poli([
        [x, y + h, z],
        [x + w, y + h, z],
        [x + w, y + h, z + d],
        [x, y + h, z + d],
      ]),
      tono: 'luz',
    },
    {
      pts: poli([
        [x + w, y, z],
        [x + w, y + h, z],
        [x + w, y + h, z + d],
        [x + w, y, z + d],
      ]),
      tono: 'medio',
    },
    {
      pts: poli([
        [x, y, z + d],
        [x + w, y, z + d],
        [x + w, y + h, z + d],
        [x, y + h, z + d],
      ]),
      tono: 'sombra',
    },
  ]

  // Barra entre dos puntos 3D, con orientación libre (tubos, guías, vástagos).
  const barra = (a, b, ancho = 10, alto = 10) => {
    const d = unitario(restar(b, a))
    let arriba = [0, 1, 0]
    if (Math.abs(producto(d, arriba)) > 0.95) arriba = [1, 0, 0]
    const lado = unitario(cruz(d, arriba))
    const cima = unitario(cruz(lado, d))
    const esquinas = (q) => [
      sumar(sumar(q, escalar(lado, ancho / 2)), escalar(cima, alto / 2)),
      sumar(sumar(q, escalar(lado, -ancho / 2)), escalar(cima, alto / 2)),
      sumar(sumar(q, escalar(lado, -ancho / 2)), escalar(cima, -alto / 2)),
      sumar(sumar(q, escalar(lado, ancho / 2)), escalar(cima, -alto / 2)),
    ]
    const A = esquinas(a)
    const B = esquinas(b)
    const caras = [
      [[A[2], A[3], B[3], B[2]], escalar(cima, -1)],
      [[A[0], A[1], B[1], B[0]], cima],
      [[A[1], A[2], B[2], B[1]], escalar(lado, -1)],
      [[A[0], A[3], B[3], B[0]], lado],
      [[A[0], A[1], A[2], A[3]], escalar(d, -1)],
      [[B[0], B[1], B[2], B[3]], d],
    ]
    return caras
      .filter(([, normal]) => producto(normal, VISTA) > 0.001)
      .map(([puntos, normal]) => ({
        pts: poli(puntos),
        tono: normal[1] > 0.45 ? 'luz' : normal[0] > normal[2] ? 'medio' : 'sombra',
      }))
  }

  // Cilindro vertical: cuerpo con silueta y tapa superior.
  const cilindro = (x, z, y0, y1, r) => {
    const rx = r * COS * Math.SQRT2
    const ry = r * SEN * Math.SQRT2
    const [bx, by] = p(x, y0, z)
    const [tx, ty] = p(x, y1, z)
    const cuerpo = [
      `M ${n(tx - rx)} ${n(ty)}`,
      `L ${n(bx - rx)} ${n(by)}`,
      `A ${n(rx)} ${n(ry)} 0 0 0 ${n(bx + rx)} ${n(by)}`,
      `L ${n(tx + rx)} ${n(ty)}`,
      `A ${n(rx)} ${n(ry)} 0 0 0 ${n(tx - rx)} ${n(ty)}`,
      'Z',
    ].join(' ')
    return { cuerpo, tapa: { cx: n(tx), cy: n(ty), rx: n(rx), ry: n(ry) } }
  }

  // Tronco de cono recto (tolvas): base y boca con dimensiones propias.
  const tronco = (cx, cz, y0, y1, w0, d0, w1, d1) => {
    const b = [
      [cx - w0 / 2, y0, cz - d0 / 2],
      [cx + w0 / 2, y0, cz - d0 / 2],
      [cx + w0 / 2, y0, cz + d0 / 2],
      [cx - w0 / 2, y0, cz + d0 / 2],
    ]
    const t = [
      [cx - w1 / 2, y1, cz - d1 / 2],
      [cx + w1 / 2, y1, cz - d1 / 2],
      [cx + w1 / 2, y1, cz + d1 / 2],
      [cx - w1 / 2, y1, cz + d1 / 2],
    ]
    return [
      { pts: poli([b[3], b[2], t[2], t[3]]), tono: 'sombra' },
      { pts: poli([b[2], b[1], t[1], t[2]]), tono: 'medio' },
      { pts: poli([t[0], t[1], t[2], t[3]]), tono: 'boca' },
    ]
  }

  return { p, poli, poli2, elipse, caja, barra, cilindro, tronco }
}
