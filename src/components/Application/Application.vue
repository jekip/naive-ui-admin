<template>
  <n-dialog-provider>
    <DialogContent />
    <n-notification-provider>
      <n-message-provider>
        <MessageContent />
        <slot slot="default"></slot>
      </n-message-provider>
    </n-notification-provider>
  </n-dialog-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { MessageContent } from '@/components/MessageContent';
  import { DialogContent } from '@/components/DialogContent';

  export default defineComponent({
    name: 'Application',
    components: { MessageContent, DialogContent },
    setup() {
      return {};
    },
  });
</script>
