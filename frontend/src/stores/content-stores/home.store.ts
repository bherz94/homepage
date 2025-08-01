import { requestHelper, type ResponseError } from '@/helpers/request.helper';
import type { BaseResponse } from '@/models/strapi/base-response';
import type { HomePage } from '@/models/strapi/home-page/home-page';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { homeQuery } from '../queries/home.query';

const url = 'home-page';

export const useHomeStore = defineStore('homeStore', () => {
  const homeContent = ref<HomePage>();
  const homeContentPending = ref(false);

  const fetchHomeContent = async () => {
    const params = homeQuery;
    homeContentPending.value = true;

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    return delay(0)
      .then(() => requestHelper.get<BaseResponse<HomePage>>(url, params))
      .then((res) => {
        homeContent.value = res.data as HomePage;
        return res;
      })
      .catch((err: ResponseError) => {
        console.log(err);
        Promise.reject(err);
      })
      .finally(() => {
        homeContentPending.value = false;
      });
  };

  return {
    homeContent,
    homeContentPending,
    fetchHomeContent,
  };
});
