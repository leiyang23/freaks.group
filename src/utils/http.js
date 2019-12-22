import axios from 'axios'
import qs from 'qs'
import {BASE_URL} from "../conf";

//  常规设置
const http = axios.create({
    baseURL:BASE_URL,
});
//  请求拦截器：将post参数编码
http.interceptors.request.use((req) => {
    if (req.method === 'post') {
        // 使用 axios 上传文件
        if (req.headers['Content-Type'].toLowerCase() === "multipart/form-data;charset=utf8"){
            return req
        }

        req.data = qs.stringify(req.data);
    }
    return req;
}, (error) => Promise.reject(error));

// 响应拦截器
http.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
);

export default {
    http:http
}