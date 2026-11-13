import { onMounted, ref } from 'vue'
import init, { obtener_portafolio } from '@/rust-pkg/rust_api.js'

// Una sola inicialización para todo el ciclo de vida de la app.
let inicializacion

function asegurarWasm() {
  if (!inicializacion) {
    inicializacion = init().catch((error) => {
      inicializacion = undefined
      throw error
    })
  }
  return inicializacion
}

export function useProyectos() {
  const proyectos = ref([])
  const cargando = ref(true)
  const error = ref('')

  async function cargar() {
    cargando.value = true
    error.value = ''

    try {
      await asegurarWasm()
      const datos = await obtener_portafolio()

      if (!Array.isArray(datos)) {
        throw new Error('proyectos.json no contiene una lista válida.')
      }

      proyectos.value = datos
    } catch (e) {
      console.error('Error al cargar los proyectos desde Rust:', e)
      error.value = 'No pudimos cargar los proyectos. Revisa tu conexión e inténtalo de nuevo.'
    } finally {
      cargando.value = false
    }
  }

  onMounted(cargar)

  return { proyectos, cargando, error, recargar: cargar }
}
