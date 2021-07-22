<template></template>
<script lang="ts">
  import { useMessage } from 'naive-ui';

  export default {
    name: 'MessageContent',
    setup() {
      //挂载在 window 方便与在js中使用
      window['$message'] = useMessage();
    },
  };
</script>
