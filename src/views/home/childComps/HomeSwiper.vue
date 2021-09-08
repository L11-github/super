<template>
  <swiper>
      <swiper-item v-for="(item,key) in banners" :key="key">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  // import Swiper from 'components/common/swiper/Swiper'
  // import SwiperItem from 'components/common/swiper/SwiperItem'
  import {Swiper, SwiperItem} from 'components/common/swiper/index.js'

  export default {
      name:"HomeSwiper",
      //父子间通信，设置属性，才能拿过来用，那边还需要动态绑定
      props:{
        banners:{
          type:Array,
          default(){
            return []
          }
        }
      },
      data(){
        return{
          isLoad:false
        }
      },
      components:{
        Swiper,
        SwiperItem
      },
      methods:{
        imageLoad(){
          if(!this.isLoad){
            this.$emit('swiperImageLoad')
            this.isLoad=true
          }
        }
        
      }

  }
</script>

<style>

</style>