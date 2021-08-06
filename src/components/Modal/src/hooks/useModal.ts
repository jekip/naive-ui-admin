import { ref, onUnmounted, unref, getCurrentInstance, watch } from 'vue';
import { isProdMode } from '@/utils/env';
import { ReturnMethods } from '../type';
import { getDynamicProps } from '@/utils';
export function useModal(props): (((modalMethod: ReturnMethods) => any) | ReturnMethods)[] {
  const modal = ref<Nullable<ReturnMethods>>(null);
  const loaded = ref<Nullable<boolean>>(false);

  function register(modalMethod: ReturnMethods) {
    if (!getCurrentInstance()) {
      throw new Error('useModal() can only be used inside setup() or functional components!');
    }
    isProdMode() &&
      onUnmounted(() => {
        modal.value = null;
        loaded.value = false;
      });
    if (unref(loaded) && isProdMode() && modalMethod === unref(modal)) return;
    modal.value = modalMethod;

    watch(
      () => props,
      () => {
        // @ts-ignore
        const { setProps } = modal.value;
        props && setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true,
      }
    );
  }

  const getInstance = () => {
    const instance = unref(modal);
    if (!instance) {
      console.error('useModal instance is undefined!');
    }
    return instance;
  };

  const methods: ReturnMethods = {
    setProps: (props): void => {
      getInstance()?.setProps(props);
    },
    openModal: () => {
      getInstance()?.openModal();
    },
    closeModal: () => {
      getInstance()?.closeModal();
    },
    setSubLoading: (status) => {
      getInstance()?.setSubLoading(status);
    },
  };
  return [register, methods];
}
