<template>
  <nav class="shadow-md shadow-accent/20 select-none">
    <div id="root" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Left: Name -->
        <div class="text-xl md:text-2xl font-bold text-primary cursor-pointer">
          <router-link :to="{ name: 'home', hash: '#root' }">
            <img class="w-32 h-32" :src="`/img/${logo}`"
          /></router-link>
        </div>

        <!-- Right: Desktop Menu -->
        <div class="hidden md:flex gap-4 items-center">
          <a
            v-for="item in menuItems"
            :href="`#${item}`"
            class="group hover:text-accent"
            ><span class="text-accent mr-1 group-hover:text-primary">#</span
            >{{ item }}</a
          >
          <div class="relative">
            <i
              class="material-symbols-outlined cursor-pointer hover:text-accent scale-[80%]"
              @click="() => (settingsOpen = !settingsOpen)"
              ref="toggleButtonRef"
            >
              settings
            </i>
            <div
              :class="[
                settingsOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2 pointer-events-none',
                'absolute top-8 right-0 z-[60] border-2 border-primary/50 rounded-md bg-background-main',
                'transition-[opacity, transform] duration-300 ease-out transform origin-top-right',
                'flex flex-col gap-2',
                'w-44 py-2 [&>*]:p-4',
              ]"
              ref="dropdownRef"
            >
              <div
                class="flex flex-grow justify-between gap-1 cursor-pointer hover:text-accent"
                @click="
                  () =>
                    themeStore.changeTheme(
                      getCurrentTheme === 'dark' ? 'light' : 'dark'
                    )
                "
              >
                <span>{{
                  getCurrentTheme === 'light'
                    ? t('settings.theme.dark')
                    : t('settings.theme.light')
                }}</span>
                <i class="material-symbols-outlined scale-[60%]">
                  {{ `${getCurrentTheme === 'dark' ? 'light' : 'dark'}_mode` }}
                </i>
              </div>
              <!-- Language Option (with sub-menu trigger) -->
              <div
                class="relative flex flex-grow justify-between items-center gap-1 cursor-pointer hover:text-accent p-1 rounded-md"
                @mouseenter="languageSubMenuOpen = true"
                @mouseleave="languageSubMenuOpen = false"
              >
                <span>{{ t(`settings.languages.${locale}`) }}</span>
                <i class="material-symbols-outlined scale-[60%]">
                  arrow_right
                  <!-- Icon to indicate a sub-menu -->
                </i>

                <!-- Language Sub-Menu Content -->
                <div
                  :class="[
                    // Conditional classes for animation: fade in and slide from right to left
                    languageSubMenuOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4 pointer-events-none',
                    // Base classes for positioning, styling, and transition
                    // Positioned to the left of the main dropdown
                    'absolute top-0 right-full z-[61] px-4 py-2 border-2 border-primary/50 rounded-md bg-background-main',
                    'transition-[opacity, transform] duration-300 ease-out transform origin-top-right',
                    'flex flex-col gap-2',
                    'w-44', // Fixed width for the sub-menu
                  ]"
                  ref="languageSubMenuRef"
                >
                  <div
                    v-for="lang in availableLanguages"
                    href="#"
                    class="block px-4 py-2 text-sm text-primary hover:text-accent rounded-md"
                    @click="selectedLang = lang"
                  >
                    {{ t(`settings.languages.${lang}`)
                    }}<i
                      :class="[`ml-3 fi fi-${lang === 'en' ? 'us' : lang}`]"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="() => toggleMenu()"
            class="hover:text-accent focus:outline-none cursor-pointer"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div v-if="isOpen" class="md:hidden px-4 pb-4">
      <a
        v-for="item in menuItems"
        :href="`#${item}`"
        @click="() => (isOpen = false)"
        class="block py-2 hover:text-accent"
        ><span class="text-accent mr-1 group-hover:text-primary">#</span
        >{{ item }}</a
      >
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale.store';
import { useThemeStore } from '@/stores/theme.store';
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const localeStore = useLocaleStore();
const { availableLanguages } = storeToRefs(localeStore);
const themeStore = useThemeStore();
const { getCurrentTheme } = storeToRefs(themeStore);

const selectedLang = ref(localeStore.getLocale);

const isOpen = ref(false);
const settingsOpen = ref(false);
const languageSubMenuOpen = ref(false);

const dropdownRef = ref();
const toggleButtonRef = ref();

const logo = computed(() =>
  getCurrentTheme.value === 'dark'
    ? 'BH_simplified_transparent.png'
    : 'BH_simplified_dark_transparent.png'
);

const menuItems = ['skills', 'about-me', 'projects', 'contact'];

const toggleMenu = (open?: boolean) => {
  isOpen.value = open ?? !isOpen.value;
};

watch(selectedLang, (newVal) => {
  localeStore.changeLocale(newVal);
  locale.value = newVal;
});

// Function to handle clicks outside the dropdown
const handleClickOutside = (event: MouseEvent) => {
  // Check if the dropdown is open AND
  // if the click was outside the dropdown content AND
  // if the click was outside the toggle button
  if (
    settingsOpen.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target) &&
    toggleButtonRef.value &&
    !toggleButtonRef.value.contains(event.target)
  ) {
    settingsOpen.value = false; // Close the dropdown
    languageSubMenuOpen.value = false;
  }
};

// Lifecycle hook: Add the event listener when the component is mounted
onMounted(() => {
  locale.value = localeStore.getLocale;
  document.addEventListener('click', handleClickOutside);
});

// Lifecycle hook: Remove the event listener when the component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
