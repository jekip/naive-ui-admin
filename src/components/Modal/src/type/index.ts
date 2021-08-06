/**
 * @description: 弹窗对外暴露的方法
 */
export interface ReturnMethods {
  setProps: (props) => void;
  openModal: () => void;
  closeModal: () => void;
  setSubLoading: (status) => void;
}
