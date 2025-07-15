import { LocaleStorageUtils } from '@/utils/localeStorage.utils';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const STORAGE_KEY = 'locale';

export const useLocaleStore = defineStore('localeStore', () => {
  const locale = ref(loadLocale());

  const availableLanguages = ref(['de', 'en']);

  const getLocale = computed(() => locale.value);

  function loadLocale() {
    const storageLocale =
      LocaleStorageUtils.getFromStorage<string>(STORAGE_KEY);
    return storageLocale ?? navigator.language.substring(0, 2);
  }

  function changeLocale(language: string) {
    LocaleStorageUtils.safeToStorage(STORAGE_KEY, language);
    locale.value = language;
  }

  return { changeLocale, getLocale, availableLanguages };
});
