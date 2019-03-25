// import Router from 'vue-router'
// import Vue from 'vue'

Vue.use(VueRouter)


import index from 'pages/index.vue'

const routes = [
    {path:'/',component: index

    },
    // {path:'/index', component: index}
]

export default new VueRouter({
    routes: routes
})