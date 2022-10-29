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
