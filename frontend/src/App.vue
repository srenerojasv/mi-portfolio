<script setup>
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AboutSection from '@/components/AboutSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-100 antialiased">
    <a
      href="#proyectos"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-950"
    >
      Saltar al contenido
    </a>

    <AppHeader />

    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>

    <AppFooter />
  </div>
</template>
