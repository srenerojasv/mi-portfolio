<script setup>
import { ref, onMounted } from 'vue'
// Importamos desde la nueva carpeta nativa generada por wasm-bindgen
import init, { obtener_portafolio } from './rust-pkg/rust_api.js'

const listaProyectos = ref([])
const cargando = ref(true)

onMounted(async () => {
  try {
    await init() // Inicializa WebAssembly
    // Usamos await porque Rust ahora lee tu archivo proyectos.json de forma asíncrona
    listaProyectos.value = await obtener_portafolio()
  } catch (error) {
    console.error("Error al cargar los proyectos desde Rust:", error)
  } finally {
    cargando.value = false
  }
})
</script>




<template>
  <main class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
    <!-- Hero Section -->
    <header class="text-center max-w-2xl mb-12">
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent mb-4">
        Mi Portafolio Web de Alto Rendimiento
      </h1>
      <p class="text-slate-400 text-lg">
        Landing page dinámica construida con <span class="text-emerald-400 font-semibold">Vue 3</span>, estilizada con <span class="text-cyan-400 font-semibold">Tailwind v4</span> y potenciada en el cliente con lógica nativa en <span class="text-orange-400 font-semibold">Rust (Wasm)</span>.
      </p>
    </header>

    <!-- Grid de Proyectos -->
    <section class="w-full max-w-5xl">
      <h2 class="text-2xl font-bold mb-6 text-slate-300 border-b border-slate-800 pb-2 flex items-center gap-2">
        <span>⚡</span> Desarrollos Web (Cargados desde Rust)
      </h2>

      <div v-if="cargando" class="text-center text-slate-500 py-12">
        Invocando módulo WebAssembly...
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="proyecto in listaProyectos" :key="proyecto.id" 
             class="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-bold text-white mb-2">{{ proyecto.nombre }}</h3>
            <p class="text-slate-400 text-sm mb-4 leading-relaxed">{{ proyecto.descripcion }}</p>
          </div>
          
          <div class="mt-4 flex flex-col gap-4">
            <!-- Badges Tecnológicos -->
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in proyecto.tecnologias" :key="tag" 
                    class="text-xs font-medium bg-slate-950 text-cyan-400 px-2.5 py-1 rounded-md border border-cyan-500/10">
                {{ tag }}
              </span>
            </div>
            <!-- Botón Git -->
            <a :href="proyecto.url_git" target="_blank" 
               class="text-center bg-slate-800 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-xl text-sm transition-colors duration-200">
              Ver Código en GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
