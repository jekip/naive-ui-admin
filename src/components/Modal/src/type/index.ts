export interface ModalProps {
  subBtuText?: string;
}

/**
 * @description: 弹窗对外暴露的方法
 */
export interface ModalMethods {
  setProps: (props: Partial<ModalProps>) => void;
  openModal: () => void;
  closeModal: () => void;
}
