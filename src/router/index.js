import { createWebHashHistory, createRouter } from 'vue-router'

import Login from '@/views/loginAndRegister/login.vue'
import Register from '@/views/loginAndRegister/register.vue'
import Home from '@/views/home/index.vue'
import Article from '@/views/home/article/index.vue'
import RecentList from '@/views/home/article/recent.vue'
import Category from '@/views/home/article/category.vue'
import Tags from '@/views/home/article/tags.vue'
import Archives from '@/views/home/article/archives.vue'
import AddArticle from '@/views/articleDetail/addarticle.vue'
import Articledetail from '@/views/articleDetail/articledetail.vue'
import Editarticle from '@/views/articleDetail/editarticle.vue'


const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
        path: '/', component: Home, redirect: '/article/recent', children: [
            {
                path: 'article', redirect: '/article/recent', component: Article, children: [

                    {
                        path: 'recent', component: RecentList
                    },
                    {
                        path: 'category', component: Category, children: [

                        ]
                    },
                    {
                        path: 'tags', component: Tags
                    },
                    {
                        path: 'archives', component: Archives
                    },


                ]
            },

            { path: '/add', component: AddArticle },
            { path: '/edit', component: Editarticle },
            { path: '/detail', component: Articledetail },
        ]
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
