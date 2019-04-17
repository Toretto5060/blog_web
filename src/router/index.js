import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/page/login'
import EditUserDetails from '@/page/editUserDetails'

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
    },{
      path: '/editUserDetails',
      name: 'editUserDetails',
      component: EditUserDetails
    }
  ]
})
