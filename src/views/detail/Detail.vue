<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="con" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swipper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-params-info ref="params" :param-info="itemParams"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommend" :goods="recommends"/>
      </scroll>
      <detail-bottom-bar @addToCart="addToCart"/>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwipper from './childComps/DetailSwipper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamsInfo from './childComps/DetailParamsInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import {getDetail,Goods,Shop,getRecomment} from 'network/detail.js'
  import {debounce} from 'common/utils.js'
  
  export default {
    name:"Detail",
    components:{
      DetailNavBar,
      DetailSwipper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      BackTop,

      Scroll,
      GoodsList
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        itemParams:{},
        commentInfo:{},
        recommends:[],
        itemImgListener:null,
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        isShowBackTop:false,
      }
    },
    created(){
      // 获取iid
      this.iid=this.$route.params.iid,
      //请求详情数据
      getDetail(this.iid).then(res=>{
        // console.log(res)
        // 1.顶部轮播图数据
        const data=res.data.result;
        this.topImages=data.itemInfo.topImages

        // 2.商品介绍和价格数据
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // console.log(this.goods)

        // 3.店铺信息
        this.shop=new Shop(data.shopInfo)

        //4.商品详情数据（直接获取）
        this.detailInfo=data.detailInfo
        // console.log(this.detailInfo)

        //商品参数数据
        this.itemParams=data.itemParams
        // console.log(this.itemParams)

        //评论数据
        if(data.rate.cRate !==0){
          this.commentInfo=data.rate.list[0]
        }
      })
      // 请求推荐数据
      getRecomment().then(res=>{
        // console.log(res)
        this.recommends=res.data.data.list
        // console.log(this.recommends)
      }),
      // 给getThemeTopY赋值
        //在图片加载完以后最佳方案来获取精确的offsetTop的值
        // 以下是防抖函数部分，methods里面调用新方法
      this.getThemeTopY=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs) 
      },100)
    },
    mounted(){
        const refresh=debounce(this.$refs.scroll.refresh,50)
        this.itemImgListener=()=>{
            refresh()//图片加载完高度自动更新 
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener)
    },
    destroyed(){
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh(); 
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        console.log(this.themeTopYs)
      },
      contentScroll(position){

        // 页面滚动控制nav变化!!!!!!!!!!
          //实现哪个区域返回不同index值即可，判断区域是关键
              //主要问题和逻辑：空间换时间（执行性能/代码时间）
              //        themetopys数组四个值，最后一个判断只要大于不好拿，前面都是大于且小于，
              //       故引入一个最大值'this.themeTopYs.push(Number.MAX_VALUE)'，让四个index都能通过一个判断式判断输出
              //问题2：this.currentIndex !==i
              //      当this.currentIndex=i时候，停止判断赋值，

        //获取Y值
        const positionY=-position.y
        let length=this.themeTopYs.length
        for(let i=0;i<length-1;i++){
          if(this.currentIndex !==i && (positionY >= this.themeTopYs[i] && positionY <this.themeTopYs[i+1])){
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex;
          }
        }

        //是否回到顶部
          this.isShowBackTop=(-position.y>1000)
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)//better-scroll下面的方法scrollTo()
      },
      addToCart(){
        // 获取购物车需要的数据
        const product={}
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        // console.log(product)
        
        // 通过vuex来保存要传递的数据
        //  添加成功后给出反馈
        this.$store.dispatch('addCart',product).then(res =>{
          // console.log(res)
          this.$toast.show(res,2000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  /* 这里content类名重复，故con */
  .con{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    /* position:absolute;
    top: 22px;
    bottom: 10px;
    left: 0;
    right: 0; */
  }
</style>