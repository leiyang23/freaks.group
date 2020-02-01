import Vue from 'vue'
import VueRouter from 'vue-router'
import Hosts from '../views/monitor/Hosts'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'hosts',
        component: Hosts
    },
    {
        path: '/monitor',
        component: () => import('../views/monitor/index.vue'),
        children: [
            {
                path: "hosts",
                component: () => import('../views/monitor/Hosts.vue')
            },
            {
                path: "terminal",
                component: () => import('../views/monitor/Terminal.vue')
            },
            {
                path: "services",
                component: () => import('../views/monitor/Services.vue')
            },
        ]
    },
    {
        path:"/user",
        component:() => import('../views/user/index.vue'),
        children:[
            {
                path: "",
                // component:() => import('../views/user/SelfInfo.vue'),
                components:{
                    user: () => import('../views/user/SelfInfo.vue')
                }
                
            },
            {
                path: "selfInfo",
                // component:() => import('../views/user/SelfInfo.vue'),
                components:{
                    user: () => import('../views/user/SelfInfo.vue')
                }
                
            },
            {
                path: "weatherTip",
                components:{
                    user: () => import('../views/user/WeatherTip.vue')
                }
            },
        ]
    },
    {
        path: "/apps",
        component: () => import('../views/apps/index.vue'),
        children: [
            {
                path: "imgur/",
                component: () => import('../views/apps/imgur/index.vue')
            },
            {
                path: "musicVisualization/",
                component: () => import('../views/apps/musicVisualization/index.vue')
            },
            {
                path: "ocr/",
                component: () => import('../views/apps/ocr/index.vue')
            },
        ]
    },
];

const router = new VueRouter({
    routes
});

export default router
