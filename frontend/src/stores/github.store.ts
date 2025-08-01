import { requestHelper, type ResponseError } from '@/helpers/request.helper';
import type GitProfile from '@/models/git/profile';
import type GitRepo from '@/models/git/repo';
import { defineStore } from 'pinia';
import {  ref } from 'vue';

const url = 'https://api.github.com/users';
const userUrl = `${url}/bherz94`;

export const useGithubStore = defineStore('githubStore', () => {
  const gitProfile = ref<GitProfile>();
  const profilePending = ref(false);
  const projectList = ref<GitRepo[]>([]);
  const projectListPending = ref(false);

  const fetchProfile = async () => {
    profilePending.value = true;

    return requestHelper
      .get<GitProfile>(userUrl, undefined, undefined, true)
      .then((res) => {
        gitProfile.value = res;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => (profilePending.value = false));
  };

  const fetchProjects = async () => {
    projectListPending.value = true;

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    return delay(10000)
      .then(() =>
        requestHelper.get<GitRepo[]>(`${userUrl}/repos`, undefined, undefined, true)
      )
      .then((res) => {
        projectList.value = res;
        return res;
      })
      .catch((err: ResponseError) => {
        console.log(err);
        Promise.reject(err);
      })
      .finally(() => {
        projectListPending.value = false;
      });
  };

  return {
    gitProfile,
    profilePending,
    projectList,
    projectListPending,
    fetchProfile,
    fetchProjects,
  };
});
