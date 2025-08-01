<template>
  <div class="border border-accent rounded-lg p-6">
    <div v-if="!loading" class="flex flex-col gap-20">
      <div class="flex flex-col gap-4">
        <span class="text-2xl text-primary-highlight">{{ project?.name }}</span>
        <span>{{ project?.description }}</span>
      </div>
      <a class="flex items-center gap-2 w-fit" :href="project?.html_url"
        ><span class="material-symbols-outlined">link</span>github</a
      >
    </div>
    <div v-else class="flex flex-col gap-20">
      <div class="flex flex-col gap-4">
        <SkeletonLoader class="w-32 h-8" />
        <SkeletonLoader class="w-full h-12" />
      </div>
      <SkeletonLoader class="w-24 h-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type GitRepo from '@/models/git/repo';
import type { PropType } from 'vue';
import SkeletonLoader from '../shared/SkeletonLoader.vue';

defineProps({
  project: Object as PropType<GitRepo>,
  loading: Boolean,
});
</script>
