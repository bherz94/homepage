<template>
  <div
    class="h-screen w-full bg-background-main font-ibm-plex-mono text-primary z-0"
  >
    <Header class="fixed w-full z-50 bg-background-main" />
    <div class="w-full h-full pt-16 z-20 overflow-y-auto">
      <RouterView class="max-w-7xl py-10 mx-auto px-6 md:px-16" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Header from './components/Header.vue';
import { useLocaleStore } from './stores/locale.store';
import { watch } from 'vue';

const localeStore = useLocaleStore();
const { getLocale } = storeToRefs(localeStore);

watch(
  () => getLocale,
  (newVal) => {
    console.log(newVal);
  }
);
</script>
