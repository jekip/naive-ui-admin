<template></template>
<script lang="ts">
  import { useLoadingBar } from 'naive-ui';

  export default {
    name: 'LoadingContent',
    setup() {
      //挂载在 window 方便与在js中使用
      window['$loading'] = useLoadingBar();
    },
  };
</script>
