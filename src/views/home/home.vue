<template>
  <div id='home'>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" :titles="title" @tabClick="tabClicks" ref="tabControl1" v-show="isTabFixed"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommends :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control :titles="title" @tabClick="tabClicks" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import Recommends from './childComps/Recommends.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar.vue';
  import TabControl from 'components/content/tabControl/TabControl.vue';
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import {getHomeMultidata,getHomeGoods} from 'network/home';
  import {debounce} from 'common/utils.js'

  export default {
      name:"Home",
      components:{
        HomeSwiper,
        Recommends,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
      },
      data(){
        return {
          banners:[],
          recommends:[],
          title:[
            {id:1,value:'流行'},
            {id:2,value:'新款'},
            {id:3,value:'精选'}
          ],
          goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]},
          },
          currentType:'pop',
          isShowBackTop:false,
          tabOffsetTop:0,
          isTabFixed:false,
          saveY:0,
          itemImgListener:null
        }
      },
      computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
      activated(){
        this.$refs.scroll.refresh()
        // console.log(this.$refs.scroll.scroll.refresh)
        this.$refs.scroll.scrollTo(0,this.saveY,0)
      },
      deactivated(){
        //离开时进行的操作
        this.saveY=this.$refs.scroll.getScrollY()
        // console.log(this.saveY)
        // 取消全局事件的监听，使得详情页和首页的共同组件互不影响 
        this.$bus.$off('itemImageLoad',this.itemImageLoad)
      },
      created(){
        //这里把调用请求数据的函数封装到方法里面，里面再写具体逻辑，这里则调用方法名
        this.getHomeMultidata();//创建完后请求推荐的数据
        this.getHomeGoods('pop');//创建后请求列表展示的数据
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
      },
      mounted(){
        //监听图片加载完成后相关操作
        const refresh=debounce(this.$refs.scroll.refresh,50)
        this.itemImgListener=()=>{
            // console.log(this.$refs.scroll.scrollHeight)
            refresh()//图片加载完高度自动更新
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener)
      },
      methods:{
        // 事件监听相关的方法
        tabClicks(key){
          switch(key){
            case 0:
              this.currentType='pop'
              break
            case 1:
              this.currentType='new'
              break
            case 2:
              this.currentType='sell'
              break
          }
          this.$refs.tabControl1.currentIndex=key;
          this.$refs.tabControl2.currentIndex=key;
        },
        backClick(){
          this.$refs.scroll.scrollTo(0,0,500)//better-scroll下面的方法scrollTo()
        },
        contentScroll(position){
          // console.log(position)
          //返回顶层图标显示
          this.isShowBackTop=(-position.y>1000)
          //导航栏是否显示
          this.isTabFixed=(-position.y>this.tabOffsetTop)
        },
        loadMore(){
          // console.log(this.currentType)
          this.getHomeGoods(this.currentType)
        },
        swiperImageLoad(){
          //获取tabControl的tabOffsetTop的值
          this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop//$el用于获取组件中的元素，从而通过属性拿到数值
          // console.log(this.tabOffsetTop)
        },

        // 网络请求相关的方法
        getHomeMultidata(){
          getHomeMultidata().then(res=>{
            this.banners=res.data.data.banner.list;
            this.recommends=res.data.data.recommend.list;
          })
        },
        getHomeGoods(type){
          const page=this.goods[type].page+1;
          getHomeGoods(type, page).then(res=>{
            // console.log(res);
            //请求数据后添加到goods里面，page做响应变化
            this.goods[type].list.push(...res.data.data.list);
            this.goods[type].page +=1;

            //上拉加载更多
            this.$refs.scroll.finishPullUp()

          })
        }
        
      }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    font-size:18px;
    color:#fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index: 9; */

  }
  .tab-control{
    position:relative;
    z-index: 9;
  }
  .content{
    /* height: 700px;   */
    overflow: hidden;

    position:absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>