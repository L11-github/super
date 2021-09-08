<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !==0">
      <div class="info-desc">
          <div class="start"></div>
          <div class="desc">{{detailInfo.desc}}</div>
          <div class="end"></div>
      </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
          <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad">
      </div>
  </div>
</template>

<script>
    export default {
        name:"DetailGoodsInfo",
        props:{
            detailInfo:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        data(){
            return{
                counter:0,
                imageLength:0
            }
        },
        methods:{
            imgLoad(){
                //所有图片加载完才执行一次事件导出，++的次数和图片数组长度相等
                if( ++this.counter==this.imageLength){
                    this.$emit('imageLoad');
                }
            }
        },
        //监听属性的变化
        //避免在data里写死只能拿第一次的数据
        watch:{
            detailInfo(){
                this.imageLength=this.detailInfo.detailImage[0].list.length
            }
        }
    }
</script>

<style>
    .info-desc{
        margin: 15px 10px;
        color: rgb(139, 136, 136);
        font-size: 15px;
    }
    .info-key{
        margin: 5px 10px;
        font-size: 19px;
    }
    .info-list img{
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }
</style>