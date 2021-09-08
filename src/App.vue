<template>
  <div id="App">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tabbar></main-tabbar>
  </div>
</template>

<script>
//keep-alive内的组件都会全部保留状态，避免重新渲染
//上面exclude部分，确保组件，每次进去都要重新加载，这样就会更新iid
  import MainTabbar from 'components/content/MainTabBar/MainTabbar'

  export default {
    name: 'App',
    components: {
      MainTabbar
    }
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>
