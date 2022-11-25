import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import vueRsource from 'vue-resource'
import Router from 'vue-router'

import Index from '@/components/Index'
import Login from '@/components/Login'



Vue.use(ElementUI)
Vue.use(Router)
Vue.use(vueRsource)





export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/index',
      component: Index
    }
  ]
})
