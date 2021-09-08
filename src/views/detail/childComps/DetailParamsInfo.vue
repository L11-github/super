<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !==0">
      <table class="info-size" v-for="(table,index) in paramInfo.rule.tables" :key="index">
          <tr v-for="(tr,index) in table" :key="index">
              <td v-for="(td,index) in tr" :key="index">{{td}}</td>
          </tr>
      </table>
      <table class="info-param">
          <tr v-for="(info,index) in paramInfo.info.set" :key="index">
              <td class="info-param-key">{{info.key}}</td>
              <td class="param-value">{{info.value}}</td>
          </tr>
      </table>
      <div class="info-img" v-if="paramInfo.info.images">
          <img :src="paramInfo.info.images[0]" alt="">
      </div>
  </div>
</template>

<script>
    export default {
        name:"DetailParamsInfo",
        props:{
            paramInfo:{
                type:Object,
                default(){
                    return {}
                }
            }
        }
    }
</script>

<style>
    .param-info{
        padding: 20px 15px;
        font-size: 14px;
        border-bottom: 5px solid #f2f5f8;
    }
    .param-info table{
        width: 100%;
        border-collapse: collapse;
    }
    .param-info table tr{
        height: 42px;
    }
    .param-info table tr td{
        border-bottom: 1px solid rgba(100,100,100,.1);
    }
    .info-param{
        border-top: 1px solid rgba(100,100,100,.1);
    }
    .info-param-key{
        /* 当value的数据量大会挤到key */
        width: 95px;
    }
    .param-value{
        color: #eb4868;
    }
    .info-img img{
        width: 100%;
    }
</style>