<!--
 * @Author: thelostword
 * @Date: 2022-10-25 15:43:12
 * @LastEditors: thelostword
 * @LastEditTime: 2022-10-28 18:10:57
 * @FilePath: \naive-ui-admin\src\components\Application\Application.vue
-->
<template>
  <n-dialog-provider>
    <n-notification-provider>
      <n-message-provider>
        <slot name="default"></slot>
      </n-message-provider>
    </n-notification-provider>
  </n-dialog-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { NDialogProvider, NNotificationProvider, NMessageProvider } from 'naive-ui';

  export default defineComponent({
    name: 'Application',
    components: {
      NDialogProvider,
      NNotificationProvider,
      NMessageProvider,
    },
    setup() {
      return {};
    },
  });
</script>
