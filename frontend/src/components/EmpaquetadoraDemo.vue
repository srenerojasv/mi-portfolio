<script setup>
// Vite expone la base configurada (ej: "/mi-portfolio/") en esta variable.
const srcSim = `${import.meta.env.BASE_URL}simulacion-servilletas.html`
</script>

<template>
  <div class="w-full rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden shadow-2xl">
    <iframe 
      :src="srcSim" 
      class="w-full h-[600px] md:h-[700px] border-0"
      title="Simulación Empaquetadora de Servilletas NS-400"
      allow="autoplay; fullscreen"
    ></iframe>
  </div>
</template>