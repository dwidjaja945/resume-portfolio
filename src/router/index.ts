import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import { Paths } from './Paths';

const routes: Array<RouteRecordRaw> = [
  {
    path: Paths.HOME,
    name: 'Home',
    component: Home,
  },
  {
    path: Paths.ABOUT,
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: Paths.RESUME,
    name: 'resume',
    component: () => import(/* webpackChunkName: "about" */ '../views/Resume.vue'),
  },
  {
    path: Paths.PRINTABLE_RESUME,
    name: 'printable-resume',
    component: () => import(/* webpackChunkName: "about" */ '../views/Resume.vue'),
  },
  {
    path: Paths.CONTACT,
    name: 'contact',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contact/index.vue'),
  },
  {
    path: Paths.REPORT_BUG,
    name: 'report-bug',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contact/ReportBug.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
