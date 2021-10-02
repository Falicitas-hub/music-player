import VueRouter from 'vue-router'
import Vue from 'vue'

import Discovery from '@/views/Discovery'
import PlayList from '@/views/PlayList'
import Songs from '@/views/Songs'
import Mvs from '@/views/Mvs'
import Result from '@/views/Result'
import PlayLists from '@/views/PlayLists'
import Mv from '@/views/Mv'
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
    },
    {
        path: '/playlists',
        component: PlayLists
    },
    {
        path: '/mv',
        component: Mv
    }
]
const router = new VueRouter({
    routes
})
export default router