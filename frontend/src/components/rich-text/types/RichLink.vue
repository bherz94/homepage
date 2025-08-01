<template>
  <a :href="url" target="blank">{{ text }}</a>
</template>
<script setup lang="ts">
defineProps({
  text: String,
  url: String,
});
</script>
