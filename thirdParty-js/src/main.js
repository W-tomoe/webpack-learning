
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
Vue.config.productionTip = false;

import './assets/css/base.less'

console.log(process.env.NODE_ENV)

new Vue({
    el:'#app',
    component:{ App },
    router,
    template: '<App/>'
})



