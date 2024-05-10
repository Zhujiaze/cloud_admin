import axios, {
    type AxiosResponse,
    type AxiosError,
    type InternalAxiosRequestConfig
} from 'axios';

const servite = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000,
})

// 添加请求拦截器
servite.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么                                                                                                           
        return config;
    }, (error: AxiosError) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

// 添加响应拦截器
servite.interceptors.response.use(
    (response: AxiosResponse) => {
        // 2xx 范围内的状态码都会数 
        // 对响应数据做点什么
        return response.data;
    }, (error: AxiosError) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    });


type DataType<T = any> = {
    code: number,
    message: string,
    data: T
}



const request = <T = any>(
    url: string,
    method: string = 'get',
    data?: object,
    options?: InternalAxiosRequestConfig
) => {
    return servite.request<T, DataType<T>>({
        url,
        method,
        [method == 'get' ? 'params' : "data"]: data,
        ...options
    })
}




export default request







