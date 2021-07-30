<template>
  <n-loading-bar-provider>
    <LoadingContent />
    <n-dialog-provider>
      <DialogContent />
      <n-notification-provider>
        <n-message-provider>
          <MessageContent />
          <slot slot="default"></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
    NLoadingBarProvider,
  } from 'naive-ui';
  import { LoadingContent } from '@/components/LoadingContent';
  import { MessageContent } from '@/components/MessageContent';
  import { DialogContent } from '@/components/DialogContent';

  export default defineComponent({
    name: 'Application',
    components: {
      NDialogProvider,
      NNotificationProvider,
      NMessageProvider,
      NLoadingBarProvider,
      LoadingContent,
      MessageContent,
      DialogContent,
    },
    setup() {
      return {};
    },
  });
</script>
