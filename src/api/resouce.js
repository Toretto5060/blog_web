import Vue from "vue";
import axios from "axios";
import router from "../router";
import store from "../store";

let axiosIns = axios.create({
  timeout: 6000,
  headers: {
    blog_token: localStorage.getItem("blog_token") ? localStorage.getItem("blog_token")
  }
})
// axiosIns.defaults.timeout = 5000;
// http request 请求拦截器
axiosIns.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return error;
  }
);
// 添加响应拦截器
axiosIns.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  error => {
    let msg = "";
    if (error.response.status) {
      msg = error.response.data.msg;
      switch (error.response.status) {
        case 401:
        router.push({path:"/login"});
        this.$Message.error(error.response.data.msg)
        break;
      }
    } else {
      msg = "TIME OUT"
    }
    Vue.prototype.$Message.error(msg);
    return Promise.reject(error.response.data);
  }
);
export default axiosIns;
