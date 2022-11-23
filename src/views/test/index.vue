<template>
  <div class="card content-box">
    <n-card>
      <n-input placeholder="请输入内容" v-model:value="data" style="width: 500px"> </n-input>
    </n-card>
    <n-card>
      <n-button v-copy="data" type="primary" @click="a">复制</n-button>
    </n-card>
    <n-card>
      <n-button type="primary" v-debounce="b">防抖按钮</n-button>
    </n-card>
    <n-card>
      <n-button type="primary" v-throttle="c">节流按钮</n-button>
    </n-card>
    <div class="box" v-draggable> </div>
  </div>
</template>

<script setup lang="ts" name="copyDirect">
  import { ref } from 'vue';
  import { useMessage } from 'naive-ui';
  const data = ref<string>();
  const message = useMessage();
  const a = () => {
    message.success('复制成功:' + data.value);
  };
  const b = () => {
    message.success('防抖');
    console.log(data.value);
  };
  const c = () => {
    message.success('节流');
    console.log(data.value);
  };
</script>

<style scoped lang="less">
  body {
    width: 100px;
    height: 100px;
    background-color: #ccc;
    position: relative;
  }
  .content-box {
    height: 100vh;
    .box {
      width: 100px;
      height: 100px;
      background-color: red;
      position: absolute;
      z-index: 10000000;
    }
  }
</style>
