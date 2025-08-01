<!-- SkeletonLoader.vue -->
<template>
  <div class="flex skeleton-container">
    <div
      v-if="type === 'line'"
      class="animate-pulse bg-neutral-500 rounded-xl"
    ></div>
    <div
      v-else-if="type === 'circle'"
      class="animate-pulse bg-neutral-500 rounded-full"
    ></div>
    <div
      v-else-if="type === 'block'"
      class="animate-pulse bg-neutral-500 rounded-md"
    ></div>
    <div v-else-if="type === 'card'" class="p-4 rounded-lg shadow-md bg-white">
      <div class="animate-pulse bg-neutral-500 rounded-md h-6 w-3/4 mb-3"></div>
      <div
        class="animate-pulse bg-neutral-500 rounded-md h-4 w-full mb-2"
      ></div>
      <div class="animate-pulse bg-neutral-500 rounded-md h-4 w-5/6"></div>
    </div>
    <div v-else-if="type === 'list'" class="space-y-3">
      <div
        v-for="n in count"
        :key="n"
        class="animate-pulse bg-neutral-500 rounded-md h-4 w-full"
        :style="{ width: `${Math.floor(Math.random() * (100 - 70) + 70)}%` }"
      ></div>
    </div>
    <div v-else-if="type === 'cardList'" class="space-x-3 flex">
      <div
        v-for="n in count"
        :key="n"
        class="animate-pulse bg-neutral-500 rounded-xl"
        :style="getRandomWidthStyle()"
      ></div>
    </div>
    <div
      v-else-if="type === 'custom'"
      :class="['animate-pulse bg-neutral-500 rounded-md', customClasses]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { Utils } from '@/utils/utils';
import type { PropType } from 'vue';

type Sizes =
  | 'xs'
  | 's'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'full';
type Types =
  | 'line'
  | 'circle'
  | 'block'
  | 'card'
  | 'list'
  | 'cardList'
  | 'custom';

type DynamicWidth = {
  min: number;
  max: number;
};

const props = defineProps({
  /**
   * The type of skeleton shape to display.
   * Can be 'line', 'circle', 'block', 'card', 'list', or 'custom'.
   * @type {Types}
   */
  type: {
    type: String as PropType<Types>,
    default: 'line', // 'line', 'circle', 'block', 'card', 'list', 'custom'
  },
  /**
   * The width of the skeleton element.
   * @type {Sizes}
   */
  width: {
    type: String as PropType<Sizes>,
    default: 'full',
  },
  /**
   * The height of the skeleton element.
   * @type {Sizes}
   */
  height: {
    type: String as PropType<Sizes>,
    default: 's',
  },
  /**
   * Number of skeleton lines/items to display for 'list' type.
   * @type {number}
   */
  count: {
    type: Number,
    default: 3,
  },
  /**
   * Custom Tailwind CSS classes to apply for 'custom' type.
   * @type {string}
   */
  customClasses: {
    type: String,
    default: '',
  },
  /**
   * If true, the skeleton loader will take full height of its parent.
   * Useful for full-page or section loaders.
   * @type {boolean}
   */
  fullHeight: {
    type: Boolean,
    default: false,
  },
  dynamicWidth: {
    type: Object as PropType<DynamicWidth>,
  },
});

/**
 * Returns a random percentage width as an inline style object.
 * This is used for types like 'cardList' to create visual diversity.
 * The width will be between 70% and 100%.
 * @returns {{ width: string }} An object suitable for Vue's :style binding.
 */
const getRandomWidthStyle = () => {
  // Generate a random number between 70 and 100 (inclusive)
  if (!props.dynamicWidth) return {};
  const randomWidth = Utils.getRandomInRange(
    props.dynamicWidth.min,
    props.dynamicWidth.max
  );

  return { width: `${randomWidth}px` };
};
</script>

<style lang="css" scoped>
.skeleton-container > * {
  flex-grow: 1;
  height: 100%;
}
</style>
