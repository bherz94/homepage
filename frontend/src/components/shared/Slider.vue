<template>
  <div class="flex flex-col">
    <div class="flex gap-2 justify-center">
      <template
        v-if="getCurrentVisibleSlides.length > 0"
        v-for="item in getCurrentVisibleSlides"
      >
        <slot :data="item"></slot>
      </template>
      <template v-else> NO DATA </template>
    </div>
    <div class="flex gap-2 justify-center">
      <div
        class="visible md:hidden index"
        :class="[i === currentIndex ? 'bg-gray-600' : 'bg-gray-400']"
        v-for="i in props.itemsPerSlide.s"
      ></div>
      <div
        class="hidden md:visible lg:hidden index"
        :class="[i === currentIndex ? 'bg-gray-600' : 'bg-gray-400']"
        v-for="i in props.itemsPerSlide.md"
      ></div>
      <div
        class="hidden lg:visible index"
        :class="[i === currentIndex ? 'bg-gray-600' : 'bg-gray-400']"
        v-for="i in props.itemsPerSlide.lg"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, ref, type PropType } from 'vue';

export type itemNumberBreakpoints = { s: number; md: number; lg: number };

const props = defineProps({
  items: { type: Object as PropType<T[]>, default: () => [] },
  loading: Boolean,
  itemsPerSlide: {
    type: Object as PropType<itemNumberBreakpoints>,
    required: true,
  },
});

const getCurrentVisibleSlides = computed<T[]>(() => {
  if (props.loading) {
    return Array.from({ length: props.itemsPerSlide.lg });
  }

  return props.items;
});
const currentIndex = ref(0);
</script>

<style lang="css" scoped>
.index {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
</style>
