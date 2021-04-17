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
    component: () => import(/* webpackChunkName: "resume" */ '../views/Resume.vue'),
  },
  {
    path: Paths.APPLICATIONS,
    name: 'applications',
    component: () => import(/* webpackChunkName: "resume" */ '../views/Applications/index.vue'),
  },
  {
    path: Paths.VIEW_APPLICATION,
    name: 'view-application',
    component: () =>
      import(/* webpackChunkName: "view-application" */
        '../views/Applications/AppInformation.vue'
      ),
  },
  {
    path: Paths.PRINTABLE_RESUME,
    name: 'printable-resume',
    component: () => import(/* webpackChunkName: "printable-resume" */ '../views/Resume.vue'),
  },
  {
    path: Paths.CONTACT,
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact/index.vue'),
  },
  {
    path: Paths.REPORT_BUG,
    name: 'report-bug',
    component: () => import(/* webpackChunkName: "report-bug" */ '../views/Contact/ReportBug.vue'),
    children: [
      {
        path: Paths.APPLICATION_BUG,
        name: 'application-bug',
        component: () => import(/* webpackChunkName: "application-bug" */ '../views/Contact/AppBug.vue'),
      },
    ],
  },
  {
    path: Paths.PRIVATE,
    name: 'private',
    component: () => import(/* webpackChunkName: "_private" */ '../views/_Private/index.vue'),
  },
  {
    path: Paths.PRIVATE_EXPENSE,
    name: 'private-expense-report',
    component: () => import(/* webpackChunkName: "application-bug" */ '../views/_Private/ReportExpense.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
