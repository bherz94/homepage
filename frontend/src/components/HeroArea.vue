<template>
  <div>
    <div
      v-if="!loading && content"
      class="relative flex flex-col gap-4 md:flex-row items-center justify-between"
    >
      <div class="flex flex-col gap-2 md:gap-6">
        <div class="flex flex-col">
          <span class="mb-3">{{ content.preTitle }}</span>
          <h1>
            {{ content.title }}
          </h1>
          <span class="code-brackets mb-5">{{ content.subTitle }}</span>
          <p>{{ content.description }}</p>
        </div>
      </div>
      <div
        class="overflow-clip drop-shadow-md drop-shadow-accent/30 max-h-96 md:max-h-[32rem]"
      >
        <img
          class="md:h-[50rem] object-cover object-top max-w-none w-80"
          :src="heroImage.url"
          :alt="heroImage.alt"
        />
      </div>
    </div>
    <div
      v-else
      class="relative flex flex-col gap-2 md:w-full md:flex-row md:items-center justify-between"
    >
      <div class="flex-grow flex flex-col gap-2 md:gap-6">
        <div class="flex flex-col gap-1">
          <SkeletonLoader class="w-30 h-6 mb-3" />
          <SkeletonLoader class="w-80 h-12" />
          <SkeletonLoader class="w-60 h-6 mb-3" />
        </div>
        <SkeletonLoader class="w-full md:w-96 h-24" />
      </div>
      <SkeletonLoader class="self-center w-80 h-96 md:h-[32rem]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HeroArea } from '@/models/strapi/hero-area/hero-area';
import { computed, type PropType } from 'vue';
import SkeletonLoader from './shared/SkeletonLoader.vue';
import { fullUrl } from '@/models/strapi/base-image';

const props = defineProps({
  loading: Boolean,
  content: Object as PropType<HeroArea>,
});

const heroImage = computed(() => {
  if (!props.content || !props.content.image) return { url: '', alt: '' };
  var image = {
    url: fullUrl(props.content.image),
    alt: props.content.image.alternativeText,
  };
  return image;
});
</script>
