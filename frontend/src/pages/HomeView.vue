<template>
  <div>
    <div section="hero-area">
      <HeroArea
        :content="homeContent?.heroArea"
        :loading="homeContentPending"
      />
    </div>
    <div section="skills">
      <h2 class="mb-10">{{ t('skills.headline') }}</h2>
      <div class="flex flex-col gap-8">
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
      <h2 class="mb-10">{{ t('aboutMe.headline') }}</h2>
      <RichText :data="homeContent?.aboutMe" :loading="homeContentPending" />
    </div>
    <div section="projects">
      <h2 class="mb-10">{{ t('projects.headline') }}</h2>
      <div class="flex flex-col gap-2">
        <GitProfileCard :profile="gitProfile" :loading="profilePending" />
        <Slider
          :items="projectList"
          :loading="projectListPending"
          :items-per-slide="{ s: 2, md: 2, lg: 3 }"
        >
          <template #default="{ data }">
            <GitProjectCard :project="data" :loading="projectListPending" />
          </template>
        </Slider>
        <!-- <div class="flex gap-5">
          <GitProjectCard
            v-for="project in projectList"
            class="w-96"
            :project="project"
            :loading="projectListPending"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardList from '@/components/CardList.vue';
import GitProfileCard from '@/components/git/GitProfileCard.vue';
import GitProjectCard from '@/components/git/GitProjectCard.vue';
import HeroArea from '@/components/HeroArea.vue';
import RichText from '@/components/rich-text/RichText.vue';
import Slider from '@/components/shared/Slider.vue';
import { useHomeStore } from '@/stores/content-stores/home.store';
import { useGithubStore } from '@/stores/github.store';
import { useSkillStore } from '@/stores/skills.store';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const skillStore = useSkillStore();
const { skillsPending, uniqueSkillTypes } = storeToRefs(skillStore);

const homeStore = useHomeStore();
const { homeContent, homeContentPending } = storeToRefs(homeStore);

const gitStore = useGithubStore();
const { gitProfile, profilePending, projectList, projectListPending } =
  storeToRefs(gitStore);

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
  gitStore.fetchProfile();
  gitStore.fetchProjects();
});
</script>
