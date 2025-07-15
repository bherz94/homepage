import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import en from '@/i18n/en.json'
import de from '@/i18n/de.json'
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: navigator.language.substring(0, 2),
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
})

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
