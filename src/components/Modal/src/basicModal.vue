<template>
  <n-modal id="basic-modal" v-bind="getBindValue" v-model:show="isModal" @close="onCloseModal">
    <template #header>
      <div class="w-full cursor-move" id="basic-modal-bar">{{ getBindValue.title }}</div>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #action v-if="!$slots.action">
      <n-space>
        <n-button @click="closeModal">取消</n-button>
        <n-button type="primary" :loading="subLoading" @click="handleSubmit">{{
          subBtuText
        }}</n-button>
      </n-space>
    </template>
    <template v-else #action>
      <slot name="action"></slot>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
  import {
    getCurrentInstance,
    ref,
    nextTick,
    unref,
    computed,
    useAttrs,
    defineEmits,
    defineProps,
  } from 'vue';
  import { basicProps } from './props';
  import startDrag from '@/utils/Drag';
  import { deepMerge } from '@/utils';
  import { FormProps } from '@/components/Form';
  import { ModalProps, ModalMethods } from './type';

  const attrs = useAttrs();
  const props = defineProps({ ...basicProps });
  const emit = defineEmits(['on-close', 'on-ok', 'register']);

  const propsRef = ref(<Partial<ModalProps> | null>null);

  const isModal = ref(false);
  const subLoading = ref(false);

  const getProps = computed((): FormProps => {
    return { ...props, ...(unref(propsRef) as any) };
  });

  const subBtuText = computed(() => {
    const { subBtuText } = propsRef.value as any;
    return subBtuText || props.subBtuText;
  });

  async function setProps(modalProps: Partial<ModalProps>): Promise<void> {
    propsRef.value = deepMerge(unref(propsRef) || ({} as any), modalProps);
  }

  const getBindValue = computed(() => {
    return {
      ...attrs,
      ...unref(getProps),
      ...unref(propsRef),
    };
  });

  function setSubLoading(status: boolean) {
    subLoading.value = status;
  }

  function openModal() {
    isModal.value = true;
    nextTick(() => {
      const oBox = document.getElementById('basic-modal');
      const oBar = document.getElementById('basic-modal-bar');
      startDrag(oBar, oBox);
    });
  }

  function closeModal() {
    isModal.value = false;
    subLoading.value = false;
    emit('on-close');
  }

  function onCloseModal() {
    isModal.value = false;
    emit('on-close');
  }

  function handleSubmit() {
    subLoading.value = true;
    console.log(subLoading.value);
    emit('on-ok');
  }

  const modalMethods: ModalMethods = {
    setProps,
    openModal,
    closeModal,
    setSubLoading,
  };

  const instance = getCurrentInstance();
  if (instance) {
    emit('register', modalMethods);
  }
</script>

<style lang="less">
  .cursor-move {
    cursor: move;
  }
</style>
