import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

import app from '../App.vue'
import index from 'pages/index.vue'

const routes = [
    {path:'/',component: app, 

    },
    {path:'/index', component: index}
]

export default new Router({
    routes
})