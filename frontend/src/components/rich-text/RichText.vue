<template>
  <div class="flex flex-col gap-2">
    <template v-if="!loading" v-for="(section, i) in data">
      <template v-if="section.type === 'heading'">
        <RichHeading
          :class="[`mb-${getHeadingMarginBot(section.level)}`]"
          :text="section.children[0].text"
          :level="section.level"
        />
      </template>
      <template v-else-if="section.type === 'paragraph'">
        <p class="mb-6" :class="[nextIsHeading(i) ? 'block-ender' : '']">
          <template v-for="block in section.children">
            <RichPlainText v-if="block.type === 'text'" :text="block.text" />
            <RichLink
              v-else-if="block.type === 'link'"
              :text="block.children ? block.children[0].text : '-'"
              :url="block.url"
            />
          </template>
        </p>
      </template>
    </template>
    <template v-else>
      <SkeletonLoader class="w-40 h-10" />
      <SkeletonLoader class="w-60 h-32" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { RichtextSection } from '@/models/strapi/base-richtext';
import type { PropType } from 'vue';
import RichHeading from './types/RichHeading.vue';
import RichPlainText from './types/RichPlainText.vue';
import RichLink from './types/RichLink.vue';
import SkeletonLoader from '../shared/SkeletonLoader.vue';

export type SkeletonAppearance = 's' | 'md' | 'lg';

const props = defineProps({
  data: {
    type: Object as PropType<RichtextSection[]>,
    default: [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  skeletonAppearance: {
    type: String as PropType<SkeletonAppearance>,
    default: 'md',
  },
});

const getHeadingMarginBot = (level?: number): number => {
  if (!level) return 0;
  switch (level) {
    case 1:
      return 8;
    case 2:
      return 6;
    case 3:
      return 5;
    case 4:
      return 3;
    case 5:
      return 2;
    default:
      return 0;
  }
};

const nextIsHeading = (i: number): boolean => {
  if (i + 1 < props.data.length) {
    const nextBlock = props.data[i + 1];
    return nextBlock.type === 'heading';
  }
  return false;
};
</script>

<style lang="css" scoped>
.block-ender {
  position: relative;
}
.block-ender::after {
  content: '';
  position: absolute;
  left: 0%;
  width: 1rem;
  bottom: -0.8rem;
  background-color: var(--color-accent);
  box-shadow: 0 0 3px 1px var(--color-accent);
}
</style>
