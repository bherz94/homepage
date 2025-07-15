<template>
  <div>
    <div
      v-if="!loading && content"
      class="relative flex flex-col md:flex-row gap-2 md:gap-16 items-center justify-between"
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
      <div class="drop-shadow-md drop-shadow-accent/30">
        <img
          class="rounded-full overflow-hidden max-w-64 max-h-64"
          :alt="content.image.alternativeText"
          :src="fullUrl(content.image)"
        />
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
import type { PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import SkeletonLoader from './shared/SkeletonLoader.vue';
import { fullUrl } from '@/models/strapi/base-image';

const { t } = useI18n();

const props = defineProps({
  loading: Boolean,
  content: Object as PropType<HeroArea>,
});
</script>
