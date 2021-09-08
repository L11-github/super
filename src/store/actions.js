import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types.js'

export default{
    addCart(context,payload){
      return new Promise((resolve,reject) => {
          // 查找数组中是否添加了此商品
          let oldPoduct=context.state.cartList.find(item=>item.iid===payload.iid)
          if(oldPoduct){
            // oldPoduct.count +=1
            context.commit(ADD_COUNTER,oldPoduct)
            resolve('当前的数量 +1')
          }else{
            payload.count=1
            // 发送给mutations，修改state数据
            context.commit(ADD_TO_CART,payload)
            resolve('添加购物车成功')
          }
      })
    }
}