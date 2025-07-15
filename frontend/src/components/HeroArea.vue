<template>
  <div>
    <div
      v-if="!loading && content"
      class="relative flex flex-col md:flex-row items-center justify-between"
    >
      <div class="flex flex-col gap-2 md:gap-6">
        <div class="flex flex-col">
          <span>{{ content.preTitle }}</span>
          <h1 class="text-5xl text-primary-highlight">
            {{ content.title }}
          </h1>
          <span class="code-brackets mb-3">{{ content.subTitle }}</span>
          <p>{{ content.description }}</p>
        </div>
      </div>
      <div class="overflow-clip drop-shadow-md drop-shadow-accent/30 max-h-96 md:max-h-[32rem]">
        <img class="md:h-[50rem] object-cover object-top max-w-none w-80" :src="heroImage.url" :alt="heroImage.alt" />
      </div>
    </div>
    <div
      v-else
      class="relative flex flex-col md:flex-row md:justify-between gap-2 md:gap-16 items-center"
    >
      <div class="flex flex-col gap-2 md:gap-6">
        <div class="flex flex-col gap-1">
          <SkeletonLoader width="md" height="md" />
          <SkeletonLoader width="xl" height="xl" />
          <SkeletonLoader width="lg" height="md" />
        </div>

        <SkeletonLoader width="3xl" height="xl" />
      </div>
      <div>
        <SkeletonLoader type="circle" width="xl" height="3xl" />
      </div>
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
