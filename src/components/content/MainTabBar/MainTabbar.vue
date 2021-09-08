<template>
  <tabbar>
      <tabbar-item path="/home" activeColor="red">
        <template v-slot:item-icon><img src="~assets/img/tabbar/home.svg" alt=""></template>
        <template v-slot:item-icon-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
        <template #item-text><div>首页</div></template>
      </tabbar-item>
       <tabbar-item path="/category" >
        <template v-slot:item-icon><img src="~assets/img/tabbar/category.svg" alt=""></template>
        <template v-slot:item-icon-active><img src="~assets/img/tabbar/category_active.svg" alt=""></template>
        <template #item-text>分类</template>
      </tabbar-item>
      <tabbar-item path="/cart" >
        <template v-slot:item-icon><img src="~assets/img/tabbar/shopcart.svg" alt=""></template>
        <template v-slot:item-icon-active><img src="~assets/img/tabbar/shopcart_active.svg" alt=""></template>
        <template #item-text>购物车</template>
      </tabbar-item>
      <tabbar-item path="/profile" >
        <template v-slot:item-icon><img src="~assets/img/tabbar/profile.svg" alt=""></template>
        <template v-slot:item-icon-active><img src="~assets/img/tabbar/profile_active.svg" alt=""></template>
        <template #item-text>我 的</template>
      </tabbar-item>
    </tabbar>
</template>

<script>
    import Tabbar from 'components/common/TabBar/Tabbar'
    import TabbarItem from 'components/common/TabBar/TabbarItem'

    export default {
        name:"MainTabbar",
        components:{
            Tabbar,
            TabbarItem
        }
    }
</script>

<style>

</style>