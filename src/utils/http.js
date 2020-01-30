import axios from 'axios'
import qs from 'qs'
import {BASE_URL} from "../conf";
import store from '../store'
import vue from '../main'


//  常规设置
const http = axios.create({
    baseURL:BASE_URL,
});

//  请求拦截器：将post参数编码
http.interceptors.request.use((req) => {

    // POST 请求转换
    if (req.method === 'post') {
        // 使用 axios 上传文件
        if (req.headers['Content-Type'] === "multipart/form-data;charset=utf8"){
            return req
        }

        req.data = qs.stringify(req.data);
    }

    // 添加 token
    let token = localStorage.getItem("token")
    if(!token){
        token = "empty"
    }
    req.headers['Authorization'] = "token " + token

    return req;
}, (error) => Promise.reject(error));

// 响应拦截器
http.interceptors.response.use(
    response => {
        if(response.data.status_code == 401){
            store.commit("logout");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            vue.$message.info("token 已过期，请重新登录")
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
);

export default {
    http:http
}