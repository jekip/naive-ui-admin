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

<script lang="ts">
  import {
    defineComponent,
    getCurrentInstance,
    ref,
    nextTick,
    unref,
    toRefs,
    reactive,
    computed,
  } from 'vue';
  import { basicProps } from './props';
  import startDrag from '@/utils/Drag';
  import { deepMerge } from '@/utils';
  import { FormProps } from '@/components/Form';
  export default defineComponent({
    name: 'BasicModal',
    components: {},
    props: {
      ...basicProps,
    },
    emits: ['on-close', 'on-ok', 'register'],
    setup(props, { emit, attrs }) {
      const propsRef = ref<Partial>({});

      const state = reactive({
        isModal: false,
        subLoading: false,
      });

      const getProps = computed((): FormProps => {
        const modalProps = { ...props, ...unref(propsRef) };
        return { ...modalProps };
      });

      async function setProps(modalProps: Partial): Promise<void> {
        propsRef.value = deepMerge(unref(propsRef) || {}, modalProps);
      }

      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...unref(getProps),
        };
      });

      function setSubLoading(status: boolean) {
        state.subLoading = status;
      }

      function openModal() {
        state.isModal = true;
        nextTick(() => {
          const oBox = document.getElementById('basic-modal');
          const oBar = document.getElementById('basic-modal-bar');
          startDrag(oBar, oBox);
        });
      }

      function closeModal() {
        state.isModal = false;
        state.subLoading = false;
        emit('on-close');
      }

      function onCloseModal() {
        state.isModal = false;
        emit('on-close');
      }

      function handleSubmit() {
        state.subLoading = true;
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

      return {
        ...toRefs(state),
        getBindValue,
        openModal,
        closeModal,
        onCloseModal,
        handleSubmit,
        setProps,
      };
    },
  });
</script>

<style lang="less">
  .cursor-move {
    cursor: move;
  }
</style>
