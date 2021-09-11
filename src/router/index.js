import VueRouter from 'vue-router'
import Vue from 'vue'

import Discovery from '@/components/Discovery'
import PlayList from '@/components/PlayList'
import Songs from '@/components/Songs'
import Mvs from '@/components/Mvs'
import Result from '@/components/Result'
Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        redirect: '/discovery'
    },
    {
        path: '/discovery',
        component: Discovery
    },
    {
        path: '/playlist',
        component: PlayList
    },
    {
        path: '/songs',
        component: Songs
    },
    {
        path: '/mvs',
        component: Mvs
    },
    {
        path: '/result',
        component: Result
    }
]
const router = new VueRouter({
    routes
})
export default router