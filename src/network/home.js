//封装home里面的多个数据请求，在home.vue中使用对应的函数名称
import {request} from './request'

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}
//第一个参数指哪一个模块的商品
export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}