import axios from "./resouce";
let host = process.env.VUE_APP_BASEURL;

export const registerUser = params => {
  return axios.post("" + host + "register", params);
};
export const checkUser = params => {
  return axios.post("" + host + "checkUser", params);
};
export const loginIn = params => {
  return axios.post("" + host + "login", params);
};
export const tast = params => {
  return axios.get("" + host + "tast", params);
};
export const checkLogin = params => {
  return axios.get("" + host + "checkLogin", params);
};
