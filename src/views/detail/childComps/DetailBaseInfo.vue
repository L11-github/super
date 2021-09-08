<template>
  <div class="base-info" v-if="Object.keys(goods).length !==0 ">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
          <span class="n-price">{{goods.newPrice}}</span>
          <span class="o-price">{{goods.oldPrice}}</span>
          <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
      </div>
      <div class="info-other">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-service">
          <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
              <img :src="goods.services[index-1].icon" alt="">
              <span>{{goods.services[index-1].name}}</span>
          </span>
      </div>
  </div>
</template>

<script>
    export default {
        name:"DetailBaseInfo",
        props:{
            goods:{
                type:Object,
                default(){
                    return {}
                }
            }
        }
    }
</script>

<style>
    .base-info{
        margin-top:15px;
        color:#999;
        padding:0 8px;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-title{
        color:#222;
    }
    .info-price{
        margin-top:10px;
    }
    .info-price .n-price{
        font-size:24px;
        color:var(--color-high-text)
    }
    .info-price .o-price{
        font-size:13px;
        margin-left:5px;
        text-decoration: line-through;
    }
    .discount{
        margin-left: 5px;
        padding:0 4px;
        background-color: rgb(241, 14, 101);
        font-size: 14px;
        color:#f2f5f8;
        border-radius: 7px;
        vertical-align: top;
    }
    .info-other{
        display: flex;
        margin-top: 18px;
        padding-bottom: 5px;
        border-bottom: 2px solid #f2f5f8;
    }
    .info-other span{
        flex: 1;
    }
    .info-service{
        display: flex;
        margin: 16px 0;
    }
    .info-service-item{
        flex: 1;
    }
    .info-service-item img{
        width: 11px;
        height: 11px;
    }
    .info-service-item span{
        color:#222;
        font-size: 13px;
    }

</style>