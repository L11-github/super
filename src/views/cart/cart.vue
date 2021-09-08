<template>
  <div>
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar.vue'

  import {mapGetters} from 'vuex'//这是vuex提供的方法

  export default {
    name:"Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      ...mapGetters(['cartLength'])
    }

  }
</script>

<style scoped>
  .nav-bar{
    background-color: rgb(231, 118, 175);
    font-weight: 700;
    color: #fff;
  }
</style>