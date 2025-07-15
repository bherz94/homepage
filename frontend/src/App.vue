<template>
  <div
    class="flex flex-col min-h-screen bg-background-main font-ibm-plex-mono text-primary"
  >
    <Header class="z-50" />
    <main class="flex-grow z-20 shadow-md shadow-accent/20">
      <RouterView class="max-w-7xl mx-auto px-6 md:px-16" />
    </main>
    <Footer class="w-full z-10 p-8" />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>
