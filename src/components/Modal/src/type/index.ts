import type { DialogOptions } from 'naive-ui/lib/dialog';
/**
 * @description: 弹窗对外暴露的方法
 */
export interface ModalMethods {
  setProps: (props) => void;
  openModal: () => void;
  closeModal: () => void;
  setSubLoading: (status) => void;
}

/**
 * 支持修改，DialogOptions 參數
 */
export type ModalProps = DialogOptions;

export type RegisterFn = (ModalInstance: ModalMethods) => void;

export type UseModalReturnType = [RegisterFn, ModalMethods];
