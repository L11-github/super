//通过第三方组件axios封装的网络请求文档
import axios from 'axios'

export function request(config){
    const instance=axios.create({
        baseURL:'http://152.136.185.210:7878/api/m5',
        timeout:5000
    })
    return instance(config);//是一个promise对象，返回成功和失败的数据

    //拦截器
    instance.interceptors.request.use(config=>{
        return config
    },err=>{
        return err
    })    
    instance.interceptors.response.use(config=>{
        return response.data
    },err=>{
        return err
    })    
}