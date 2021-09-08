import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'//自定义插件引入

Vue.config.productionTip = false

//事件总线
Vue.prototype.$bus=new Vue()

//安装自定义toast插件
Vue.use(toast)

//解决移动端300ms
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyLoad)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
