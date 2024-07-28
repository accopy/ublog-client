import { createWebHashHistory, createRouter } from 'vue-router';

import Login from '@/views/loginAndRegister/login.vue';
import Register from '@/views/loginAndRegister/register.vue';
import Home from '@/views/home/index.vue';
import Article from '@/views/home/article/index.vue';
import RecentList from '@/views/home/article/recent.vue';
import Category from '@/views/home/article/category.vue';
import Tags from '@/views/home/article/tags.vue';
import Archives from '@/views/home/article/archives.vue';
import Articledetail from '@/views/home/article/articledetail.vue';

import Background from '@/views/background/index.vue';
import BackgroundHome from '@/views/background/home.vue';
import BackgroundArticle from '@/views/background/article.vue';
import BackgroundCategory from '@/views/background/category.vue';
import BackgroundMyinfo from '@/views/background/system/myinfo.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/',
    component: Home,
    redirect: '/article/recent',
    children: [
      {
        path: 'article',
        redirect: '/article/recent',
        component: Article,
        children: [
          {
            path: 'recent',
            component: RecentList,
          },
          {
            path: 'category',
            component: Category,
            children: [],
          },
          {
            path: 'tags',
            component: Tags,
          },
          {
            path: 'archives',
            component: Archives,
          },
        ],
      },
      { path: '/detail', component: Articledetail },
    ],
  },
  {
    path: '/background',
    redirect: '/background/article',
    component: Background,
    children: [
      { path: 'home', component: BackgroundHome },
      {
        path: 'article',
        component: BackgroundArticle,
      },
      {
        path: 'category',
        component: BackgroundCategory,
      },
      {
        path: 'myinfo',
        component: BackgroundMyinfo,
      },
    ],
    beforeEnter: (to, form, next) => {
      console.log('首位');

      if (localStorage.getItem('token')) {
        next();
      } else {
        router.push('/login');
      }
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
