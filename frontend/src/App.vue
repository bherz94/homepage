<template>
  <div
    class="flex flex-col min-h-screen bg-background-main font-ibm-plex-mono text-primary"
  >
    <Header class="z-50 *:px-6 *:md:px-16 &>:max-w-7xl" />
    <main class="flex-grow z-20 shadow-md shadow-accent/20">
      <RouterView
        class="mx-auto flex flex-col *:flex-grow *:w-full *:py-8 *:px-6 *:md:px-16 *:even:bg-background-accent *:first:pt-4 [&>[section]>*]:max-w-7xl [&>[section]>*]:mx-auto"
      />
    </main>
    <Footer class="w-full z-10 p-8" />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>
