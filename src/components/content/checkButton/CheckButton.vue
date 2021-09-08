<template>
  <div class="check-button">
      <img src="~assets/img/cart/tick.svg" alt="" :class="{check:isChecked}">
  </div>
</template>

<script>
    export default {
        name:"CheckButon",
        props:{
            isChecked:{
                type:Boolean,
                default(){
                    return false
                }
            }
        }
    }
</script>

<style>
    .check-button img{
        border-radius: 50%;
        border:2px solid rgb(231, 118, 175);
    }
    .check{
        background-color: rgb(231, 118, 175);
        border-color: rgb(231, 118, 175);
    }
</style>