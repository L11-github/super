<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        name:"Scroll",
        props:{
            //通过动态传入监听位置的方式
            probeType:{
                type:Number,
                default:3
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                scroll:null
            }
        },
        mounted(){
            //1.创建BScroll对象 
            this.scroll=new BScroll(this.$refs.wrapper,{
                click:true,//用于控制区域内‘div元素’点击事件，而像按钮不用也可
                probeType:this.probeType,//0,1表示不监听滚动，2监听最终位置，3监听实时滚动位置
                pullUpLoad:this.pullUpLoad//是否启用上拉加载更多
            })
            //2.监听滚动的位置
            if(this.probeType===2||this.probeType===3){
                 this.scroll.on('scroll',(position)=>{
                    this.$emit('scroll',position)//自定义事件给父传递滚动位置
                })
            }
            //3.监听滚动到底部
            if(this.pullUpLoad){
                this.scroll.on('pullingUp',()=>{
                    this.$emit('pullingUp')
                })
            }
        },
        methods:{
            refresh(){
                this.scroll&&this.scroll.refresh()
            },
            scrollTo(x,y,time=300){
                this.scroll&&this.scroll.scrollTo(x,y,time)
            },
            finishPullUp(){
                this.scroll&&this.scroll.finishPullUp()
            },
            getScrollY() {
                return this.scroll ? this.scroll.y : 0
            }
        }
    }
</script>

<style>

</style>