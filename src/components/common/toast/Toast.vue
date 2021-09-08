<template>
  <div class="toast" v-show="isShow">
      <div>{{message}}</div>
  </div>
</template>

<script>
    export default {
        name:'Toast',
        data(){
            return{
                message:'',
                isShow:false
            }
        },
        methods:{
            show(message,duration=1000){//参数：显示的内容以及默认时间1s
                // console.log('11')
                this.isShow=true;
                this.message=message;

                setTimeout(()=>{
                    this.isShow=false;
                    this.message=''
                },duration)
            }
        }
    }
</script>

<style scoped>
    .toast{
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 99;
        transform: translate(-50%,-50%);
        padding: 8px 10px;
        color: #fff;
        background-color: rgba(0,0,0,.7);
    }
</style>