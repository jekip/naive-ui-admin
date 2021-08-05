import { ref, onUnmounted, unref, getCurrentInstance, watch } from 'vue';
import { isProdMode } from '@/utils/env';
import { UseModalReturnType, ModalMethods } from './type';
import { getDynamicProps } from '@/utils';
export function useModal(props?: Props): UseModalReturnType {
  const modal = ref<Nullable<ModalMethods>>(null);
  const loaded = ref<Nullable<boolean>>(false);

  function register(modalMethod: ModalMethods) {
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
      error('useModal instance is undefined!');
    }
    return instance;
  };

  const methods: ReturnMethods = {
    setProps: (props: Partial<ModalProps>): void => {
      getInstance()?.setProps(props);
    },
    openModal: () => {
      getInstance()?.openModal();
    },
    closeModal: () => {
      getInstance()?.closeModal();
    },
    setSubLoading: () => {
      getInstance()?.setSubLoading();
    },
  };
  return [register, methods];
}
