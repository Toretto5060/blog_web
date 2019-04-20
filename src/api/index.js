import axiosIns from './resouce.js';
// let host = 'http://my.toretto.top:1234/'
let host = 'http://localhost:1234/'

export const registerUser = params => {return axiosIns.post("" + host + "register", params)}
export const checkUser = params => {return axiosIns.post("" + host + "checkUser", params)}
export const loginIn = params => {return axiosIns.post("" + host + "login", params)}
export const tast = params => { return axiosIns.get("" + host + "tast", params)}
export const checkLogin = params => { return axiosIns.get("" + host + "checkLogin", params)}
