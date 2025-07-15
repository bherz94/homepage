import HomeView from '@/pages/HomeView.vue';
import NotFoundView from '@/pages/NotFoundView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, adminRequired: false },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      beforeEnter: () => {
        return { name: 'home' };
      },
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      if (to.hash === '#') {
        return { el: '#root', behavior: 'smooth' };
      }
      return { el: getElement(to.hash.substring(1)), behavior: 'smooth' };
    }
  },
});

const getElement = (sectionName: string) => {
  return document.querySelector(`div[section='${sectionName}']`) ?? '#root';
};

export default router;
