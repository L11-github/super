<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="(item,key) in topImages" :key="key">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
    export default {
        name:"DetailSwipper",
        components:{
            Swiper,
            SwiperItem
        },
        props:{
            topImages:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style>
    .detail-swiper{
        height: 300px;
        overflow: hidden;
    }
</style>