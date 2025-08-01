<template>
  <div
    v-if="!loading && profile"
    class="rounded-2xl py-5 px-6 flex gap-4 w-max ring ring-accent/50"
  >
    <div class="rounded-full overflow-hidden shadow-md shadow-accent/30">
      <img class="w-32 h-32" :src="profile.avatar_url" />
    </div>
    <div class="flex flex-col py-3">
      <span class="text-xl">
        {{ profile.name }}
      </span>
      <a
        :href="profile.html_url"
        target="blank"
        class="flex items-center gap-2 text-sm"
      >
        <i class="devicon-github-plain text-primary-highlight"></i>
        {{ `github/${profile.login}` }}</a
      >
    </div>
  </div>
  <div v-else>noob</div>
</template>

<script setup lang="ts">
import type GitProfile from '@/models/git/profile';
import type { PropType } from 'vue';

defineProps({
  profile: Object as PropType<GitProfile>,
  loading: Boolean,
});
</script>
