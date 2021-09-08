<template>
  <div class="recommends">
      <div v-for="(item,key) in recommends" :key="key" class="recommends-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
                <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
    export default {
        name:"Recommends",
        props:{
            recommends:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style>
    .recommends{
        display:flex;
        font-size:15px;
        text-align: center;
        padding:10px 0 20px;
        border-bottom: 10px solid #eee;

    }
    .recommends-item{
        flex: 1;
    }
    .recommends-item img{
        width: 70px;
    }
</style>