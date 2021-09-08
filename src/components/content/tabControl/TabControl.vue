<template>
  <div class=tab-control>
      <div v-for="(item,key) in titles" :key="item.id"
        class="tab-control-item"
        :class="{active:key===currentIndex}"
        @click="itemClick(key)">
          <span>{{item.value}}</span>
      </div>
  </div>
</template>

<script>
    export default {
        name:"TabControl",
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {
                currentIndex:0
            }
        },
        methods:{
            itemClick(key){
                this.currentIndex=key;
                this.$emit('tabClick',key);
            }
        }
    }
</script>

<style>
    .tab-control{
        display:flex;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 15px;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;
    }
    .tab-control-item span{
        padding: 5px;
    }
    .active span{
        border-bottom: 3px solid red;
    }
     
    .active{
        color:red;
    }
</style>