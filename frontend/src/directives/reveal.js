// Directiva v-reveal: muestra el elemento con una transición suave
// la primera vez que entra en el viewport. Acepta un retraso en ms.
//   <article v-reveal>...</article>
//   <article v-reveal="indice * 80">...</article>

let observador

function crearObservador() {
  if (typeof IntersectionObserver === 'undefined') return null

  return new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return
        entrada.target.classList.add('is-visible')
        observador.unobserve(entrada.target)
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
  )
}

export const reveal = {
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const retraso = Number(binding.value) || 0
    el.classList.add('reveal')
    el.style.transitionDelay = `${retraso}ms`

    if (!observador) observador = crearObservador()
    observador?.observe(el)
  },

  unmounted(el) {
    observador?.unobserve(el)
  },
}
