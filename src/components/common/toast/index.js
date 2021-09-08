import Toast from './Toast.vue'

const obj={}

obj.install=function(Vue){//odj的install函数默认把Vue参数传递过来
    // console.log('使用了toast')

    // toast组件的template元素部分传递过来，即手动创建组件后挂载组件
    // 1.创建组件的构造器
    const toastContrustor=Vue.extend(Toast)
    // 2.根据构造器，创建组件对象！！
    const toast=new toastContrustor()
    // 3.将组件对象，挂载到元素上
    toast.$mount(document.createElement('div'))
    // 4.添加到body上
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast=toast//把对象赋给全局！
}

//Vue.use(toast)就是这个导出的对象
export default obj