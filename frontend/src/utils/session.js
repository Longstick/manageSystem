import { message } from 'antd';
import axios from 'axios';

const setToken = token => {
    if (token) {
        window.sessionStorage.setItem('usertoken', token);
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

const getToken = () => {
    return window.sessionStorage.getItem('usertoken');
}

const isLogined = () => {
    if (window.sessionStorage.getItem('usertoken')){
        return true
    } else {
        return false
    }
}

const request = axios.create({
    baseURL: 'http://localhost:3000/api'
})

// // 添加请求拦截器
// request.interceptors.request.use(response => {
//     if (isLogined()) {
//         // config.headers.Authorization = token;
//         return response;
//     }
    
// })

// // 添加响应拦截器
// request.interceptors.response.use(res => {
//     return res
// })

export { request, getToken, setToken, isLogined }

