import { NButton } from 'naive-ui';
import type { Component } from 'vue';
import { PermissionsEnum } from '@/enums/permissionsEnum';
export interface ActionItem extends Partial<InstanceType<typeof NButton>> {
  onClick?: Fn;
  label?: string;
  type?: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'default';
  // 设定 color 后会覆盖 type 的样式
  color?: string;
  icon?: Component;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  auth?: PermissionsEnum | PermissionsEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean);
}

export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: Component;
}
