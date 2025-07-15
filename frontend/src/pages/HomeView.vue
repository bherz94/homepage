<template>
  <div class="flex flex-col gap-24">
    <div section="hero-area">
      <HeroArea
        :content="homeContent?.heroArea"
        :loading="homeContentPending"
      />
    </div>
    <div section="skills">
      <h2 class="mb-8">{{ t('skills.headline') }}</h2>
      <div class="flex flex-col gap-8 md:px-6">
        <CardList
          v-for="skillType in uniqueSkillTypes"
          :items="getItemsForType(skillType)"
          :headline="skillType"
          :loading="skillsPending"
          :detail-view-enabled="true"
        />
      </div>
    </div>
    <div section="about-me">
      <h2 class="mb-8">{{ t('skills.headline') }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardList from '@/components/CardList.vue';
import HeroArea from '@/components/HeroArea.vue';
import { useHomeStore } from '@/stores/content-stores/home.store';
import { useSkillStore } from '@/stores/skills.store';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const skillStore = useSkillStore();
const { skillsPending, uniqueSkillTypes } = storeToRefs(skillStore);

const homeStore = useHomeStore();
const { homeContent, homeContentPending } = storeToRefs(homeStore);

const getItemsForType = (skillType: string) => {
  return skillStore.skillsByType(skillType).map((skill) => ({
    ...skill,
    label: skill.title,
  }));
};

const getContent = async () => {
  skillStore.fetchSkills();
  homeStore.fetchHomeContent();
};

watch(
  () => locale.value,
  () => {
    getContent();
  }
);

onMounted(() => {
  getContent();
});
</script>
