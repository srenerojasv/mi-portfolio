<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
})
</script>

<template>
  <div class="mb-12 max-w-2xl">
    <p class="mb-3 text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">{{ eyebrow }}</p>
    <h2 class="text-3xl font-extrabold tracking-tight text-white md:text-4xl">{{ title }}</h2>
    <p v-if="description" class="mt-4 leading-relaxed text-slate-400">{{ description }}</p>
  </div>
</template>
