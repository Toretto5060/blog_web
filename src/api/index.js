import axios from "./resouce";
let host = process.env.VUE_APP_BASEURL;

// 验证是否登录
export const checkLogin = params => {
  return axios.get("" + host + "checkLogin", params);
};
// 检测用户名是否可用
export const checkUser = params => {
  return axios.post("" + host + "checkUser", params);
};
// 获取手机验证码
export const aothCode = params => {
  return axios.post("" + host + "aothCode", params);
};

// 获取邮箱验证码
export const emailAothCode = params => {
  return axios.post("" + host + "emailAothCode", params);
};

// 注册用户
export const registerUser = params => {
  return axios.post("" + host + "register", params);
};

// 用户登录
export const loginIn = params => {
  return axios.post("" + host + "login", params);
};
export const tast = params => {
  return axios.get("" + host + "tast", params);
};

// 获取文章列表
export const contList = params => {
  return axios.get("" + host + "list", params);
};
