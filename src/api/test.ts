import request from '../utils/request'


export const getList = () => {
    return request('/focus')
}