<template>
  <div id="shop-item">
      <div class="item-selector">
          <check-button :is-checked="product.checked" @click.native="checkClick"/>
      </div>
      <div class="item-img">
          <img :src="product.image" alt="商品图片">
      </div>
      <div class="item-info">
          <div class="item-title">{{product.title}}</div>
          <div class="item-desc">{{product.desc}}</div>
          <div class="item-bottom">
              <div class="item-price left">￥{{product.price}}</div>
              <div class="item-count right">x{{product.count}}</div>
          </div>
      </div>
  </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton.vue'
    export default {
        name:"CartListItem",
        components:{
            CheckButton
        },
        props:{
            product:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            checkClick(){
                this.product.checked= !this.product.checked
            }
        }
    }
</script>

<style>
    #shop-item{
        display: flex;
        padding: 5px;
        width: 100%;
        border-bottom: 1px solid #ccc;
    }
    .item-selector{
        width: 20px;
        display: flex;
        padding: 0 5px;
        justify-content: center;
        align-items: center;
    }
    /* .item-img, .item-info{
        flex: 1;
    } */
    .item-img{
        padding: 5px;
    }
    .item-img img{
        display: block;
        width: 80px;
        height: 100px;
    }
    .item-info{
        font-size: 16px;
        color: #333;
        padding: 5px 10px;
        position: relative;
        overflow: hidden;
    }
    .item-title,.item-desc{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .item-info .item-title{
        font-weight: 600;
    }
    .item-info .item-desc{
        font-size: 14px;
        color: #666;
        margin-top: 15px;
    }
    .item-bottom{
        margin-top: 10px;
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
    }
    .item-bottom .item-price{
        color: orangered;
    }
    .item-bottom .item-count{
        text-align: center;
    }
    
</style>