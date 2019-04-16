import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },{
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
