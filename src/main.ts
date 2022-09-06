import { createApp } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import App from './App.vue';
import 'normalize.css';
import { auth } from '@/plugins/firebase';
import firebase from 'firebase/compat';
import Unsubscribe = firebase.Unsubscribe;
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: { name: 'home' }, meta: { isPublic: true } },
  {
    path: '/home',
    component: () => import('@/views/HomeView.vue'),
    name: 'home',
    // このフィールドをコメントアウトするとログインが必要なページになります。
    meta: { isPublic: true },
  },
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue'),
    name: 'about',
    meta: { isPublic: true },
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
    name: 'login',
    meta: { isPublic: true },
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterView.vue'),
    name: 'register',
  },
  {
    path: '/chat',
    component: () => import('@/views/ChatView.vue'),
    name: 'chat',
  },
  {
    path: '/test',
    component: () => import('@/views/TestView.vue'),
    name: 'test',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
    meta: { isPublic: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let fbAuthUnsubscribe: Unsubscribe | undefined;
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta?.isPublic)) next();

  // このルートはログインされているかどうか認証が必要です。
  // もしされていないならば、ログインページにリダイレクトします。
  if (fbAuthUnsubscribe) fbAuthUnsubscribe();
  fbAuthUnsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  });
});

app.use(router);
app.mount('#app');
