import axios from "axios";

let axiosIns = axios.create({
  timeout: 6000,
  // headers: {
  //   Authorization: userToken
  // }
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
      return Promise.reject(response);
    }
  },
  error => {
    // if (error.response.status) {
    //   switch (error.response.status) {
    //     case 404:
    //       break;
    //   }
    // }
    return Promise.reject(error);
  }
);
export default axiosIns;
