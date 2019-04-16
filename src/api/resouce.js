import Vue from 'vue'
import Axios from 'axios';
import store from '../vuex/store'





//封装Axios
let axiosIns = Axios.create({
  timeout: 30000,
  headers: {
    // token: store.state.token
  },
  // transformRequest: [function (data) {
  // if(data){
  //   if(data.typ){
  //     if(data.typ='json'){
  //       return data.data;
  //     }else{
  //       return data;
  //     }
  //   }else{
  //     return qs.stringify(data);
  //   }
  // }
  // }]
});

// http request 拦截器
axiosIns.interceptors.request.use(
  config => {
    // config.headers.language = "";
    config.headers.BLOG_TOKEN = store.state.token;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// 添加响应拦截器
axiosIns.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
// Vue.prototype.$Axios = axiosIns;


export default axiosIns;
