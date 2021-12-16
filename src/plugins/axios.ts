import axios from 'axios'
import {ElMessage} from 'element-plus'
const baseURL = '/api' 
const service = axios.create({
    baseURL, // url = base url + request url    
    timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

service.interceptors.response.use(res => {
    return res
}, error => {
    ElMessage.error(error.message)
    return Promise.reject(error)
})

export default service