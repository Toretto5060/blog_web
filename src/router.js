import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/login";
import Index from "@/views/index";
Vue.use(Router);

export default new Router({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    }
    ,
    {
      path: "/login",
      name: "login",
      component: Login
    }
    // ,{
    //   path: "/editUserDetails",
    //   name: "editUserDetails",
    //   component: EditUserDetails
    // }
  ]
});
