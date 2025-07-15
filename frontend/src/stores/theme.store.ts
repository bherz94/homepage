import { LocaleStorageUtils } from '@/utils/localeStorage.utils';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const STORAGE_KEY = 'selectedTheme';

type Theme = 'light' | 'dark';

export const useThemeStore = defineStore('themeStore', () => {
  const currentTheme = ref<Theme>(loadTheme());

  const getCurrentTheme = computed(() => currentTheme.value);

  function loadTheme() {
    const storageTheme = LocaleStorageUtils.getFromStorage<Theme>(STORAGE_KEY);
    let theme: Theme = 'light';
    (storageTheme && storageTheme === 'dark') ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light';
    if (storageTheme) {
      theme = storageTheme;
    } else {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    setTheme(theme);
    return theme;
  }

  function changeTheme(theme: Theme) {
    LocaleStorageUtils.safeToStorage(STORAGE_KEY, theme);
    currentTheme.value = theme;
    setTheme(theme);
  }

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  return { getCurrentTheme, changeTheme };
});
