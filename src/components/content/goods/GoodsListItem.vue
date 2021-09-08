<template>
  <div class="goods-item">
      <img v-lazy="showImage" alt="" @load="imageLoad" @click="itemClick">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:"GoodsListItem",

    props:{
        goodsItem:{
            type:Object,
            deafult(){
                return {}
            }
        }
    },
    computed:{
        showImage(){
            return this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods:{
        imageLoad(){
            //通过事件总线发送自定义事件，告诉图片加载完成
            this.$bus.$emit('itemImageLoad')
        },
        itemClick(){
            this.$router.push('/detail/'+this.goodsItem.iid)
        }
        
    }
}
</script>

<style scoped>
    .goods-item{
        position:relative;
        padding-bottom:40px;
        width: 45%;
    }
    .goods-item img{
        width: 100%;
        border-radius: 5px;
    }
    .goods-info{
        position: absolute;
        bottom:5px;
        left: 0;
        right:0;
        text-align: center;
        font-size: 12px;
        overflow: hidden;
    }
    .goods-info p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 3px;
    }
    .goods-info .price{
        color: var(--color-high-text);
        margin-right:20px;
    }
    .goods-info .collect{
        position: relative;
    }
    .goods-info .collect::before{
        content:'';
        position: absolute;
        left: -14px;
        top: -1px;
        width: 14px;
        height: 14px;
        background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>