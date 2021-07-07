<template>
  <div class="flex flex-col align-center justify-center page-container">
    <div class="text-center">
      <h1 class="text-base text-gray-500">哎哟喂，您好像走丢了...</h1>
      <router-link to="/" class="n-btn n-btn-primary">回到首页</router-link>
    </div>
    <div class="text-center">
      <img src="~@/assets/images/Error.svg" alt=""/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routes } from '@/router'

export default defineComponent({
  name: '404'
})
</script>

<style lang="less" scoped>
.page-container {
  width: 100%;
  height: 100vh;
  background-color: white;
  border-radius: 4px;

  img {
    width: 350px;
    margin: 0 auto;
  }
}
</style>
