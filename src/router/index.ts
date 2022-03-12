import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/Login.vue';

// lazy-loaded
const Dashboard = () => import('@/views/Dashboard.vue');

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: Login },
  { path: '/login', component: Login },
  {
    path: '/dashboard',
    // lazy-loaded
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
