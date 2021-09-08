<template>
    <div class="bottom-b">
        <div class="check-content">
            <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="price">
            合计 {{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去结算({{checkLength}})
        </div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton.vue'

    import {mapGetters} from 'vuex'//这是vuex提供的方法

    export default {
        name:"CartBottomBar",
        components:{
            CheckButton
        },
        computed:{
            ...mapGetters(['cartList']),
            totalPrice(){
                return '¥'+this.cartList.filter(item=>{//筛选
                    return item.checked
                }).reduce((preValue,item)=>{//选出来的数据累加
                    return preValue+item.price*item.count
                },0).toFixed(2)
            },
            checkLength(){
                return this.cartList.filter(item=>item.checked).length
            },
            isSelectAll(){
                if(this.cartList.length===0){
                    return false//没有添加购物车，默认false
                }else{
                    return !this.cartList.find(item=> !item.checked)//查找没有选中的，然后返回false
                }
            }
        },
        methods:{
            checkClick(){
                // console.log('----')
                if(this.isSelectAll){
                    this.cartList.forEach(item=>item.checked=false)
                }else{
                    this.cartList.forEach(item=>item.checked=true)
                }
            },
            calcClick(){
                if( !this.isSelectAll){
                    this.$toast.show("请添加商品",2000)
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-b{
        position: relative;
        top: -134px;
        display: flex;
        height: 40px;
        font-size: 15px;
        background-color: rgb(223, 221, 221);
    }
    .check-content{
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 60px;
    }
    .check-button{
        width: 20px;
        height: 20px;
        margin-right: 5px;
        line-height: 20px;
    }
    .price{
        flex: 1;
        margin-left: 20px;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
    }
    .calculate{
        width: 90px;
        line-height: 40px;
        color: #fff;
        text-align: center;
        background: rgb(231, 118, 175);
    }
</style>