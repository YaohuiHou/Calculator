import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'        // 首页
import Detail from '@/views/Detail'        // 计算详情页
import Insurance from '@/views/Insurance'        // 计算详情页

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/Detail',
            name: 'Detail',
            component: Detail,
            query:{}
        },
        {
            path: '/Insurance',
            name: 'Insurance',
            component: Insurance,
            query:{}
        }
    ]
})
