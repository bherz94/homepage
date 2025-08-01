<template>
  <div>
    <h1 v-if="level === 1">{{ text }}</h1>
    <h2 v-else-if="level === 2">{{ text }}</h2>
    <h3 v-else-if="level === 3">{{ text }}</h3>
    <h4 v-else-if="level === 4">{{ text }}</h4>
    <h5 v-else-if="level === 5">{{ text }}</h5>
    <h6 v-else-if="level === 6">{{ text }}</h6>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: String,
  level: Number,
});
</script>
