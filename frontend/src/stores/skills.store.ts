import { requestHelper, type ResponseError } from '@/helpers/request.helper';
import type { BaseResponse } from '@/models/strapi/base-response';
import type { Skill } from '@/models/strapi/skills/skill';
import { Utils } from '@/utils/utils';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const url = 'skills';

export const useSkillStore = defineStore('skillStore', () => {
  const skillsList = ref<Skill[]>([]);
  const skillsPending = ref(false);

  const uniqueSkillTypes = computed(() => {
    if (
      !skillsList.value ||
      skillsList.value.length <= 0 ||
      skillsPending.value
    )
      return ['', ''];
    const types = [
      ...new Set(skillsList.value.map((skill) => skill.skill_type.typeName)),
    ];
    return types;
  });

  const skillsByType = (typeName: string) => {
    return skillsList.value.filter((s) => s.skill_type.typeName === typeName);
  };

  const fetchSkills = async () => {
    const params = ['populate=skill_type'];
    skillsPending.value = true;

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    return delay(Utils.getRandomInRange(500, 2000))
      .then(() => requestHelper.get<BaseResponse<Skill>>(url, params))
      .then((res) => {
        skillsList.value = Array.isArray(res.data) ? res.data : [res.data];
        return res;
      })
      .catch((err: ResponseError) => {
        console.log(err);
        Promise.reject(err);
      })
      .finally(() => {
        skillsPending.value = false;
      });
  };

  return {
    skillsList,
    skillsPending,
    uniqueSkillTypes,
    skillsByType,
    fetchSkills,
  };
});
