import axios, {
    type InternalAxiosRequestConfig,
    type AxiosInstance,
    type AxiosError,
    type AxiosResponse,
    type AxiosRequestConfig
} from 'axios';

const server: AxiosInstance = axios.create({
    // baseURL: 'http://www.tangxiaoyang.vip:8888/api/v2',
    baseURL: "https://mock.mengxuegu.com/mock/66384e30cab9671f88bd3027/api/v1",
    timeout: 10000,

})

// 添加请求拦截器
server.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

        return config;
    }, (error: AxiosError) => {

        return Promise.reject(error);
    });

// 添加响应拦截器
server.interceptors.response.use(
    (response: AxiosResponse) => {

        return response;
    }, (error: AxiosError) => {

        return Promise.reject(error);
    });

type DataType<T = any> = {
    code: number,
    data: T,
    msg: string
}



const request = <T = any>(url: string, method: string = "GET", data?: object, options?: AxiosRequestConfig) => {
    return server.request<T, DataType<T>>({
        url,
        method,
        [method == "GET" ? "params" : "data"]: data,
        ...options
    });
}





export default request;
