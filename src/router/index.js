import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'home',
        component: ()=>import('../views/home/index.vue')
    },{
        path: '/detail',
        name: 'detail',
        component: ()=>import('../views/detail/index.vue')
    }]
})
export default router