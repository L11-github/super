<template>
  <div class="cart-list">
      <scroll class="cont" ref="scroll"> 
          <cart-list-item 
                v-for="(item,key) in cartList"
                :key="key"
                :product="item"/>
      </scroll>
  </div>
</template>

<script>
    import Scroll from 'components/common/scroll/Scroll.vue'

    import CartListItem from './CartListItem.vue'

    import {mapGetters} from 'vuex'//这是vuex提供的方法

    export default {
        name:"cartList",
        components:{
            Scroll,
            CartListItem
        },
        computed:{
            ...mapGetters(['cartList'])
        },
        // 数据做过缓存，故不能在created和mounted中刷新!!!!!!
        activated(){
            // console.log('----') 
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
    .cart-list{
        position: relative;
        height: 100vh;
    }
    .cont{
        height: calc(100% - 44px - 49px - 40px);
        overflow: hidden;
        /* height: 100%;
        overflow: hidden; */

        /* position: relative; */
        /* left: 0;
        right: 0; */
        /* z-index: 10; */

        /* overflow: hidden;
        position:absolute;
        top: 22px;
        bottom: 49px;
        left: 0;
        right: 0; */
        
    }
</style>