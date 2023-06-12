import { DataTableColumns } from 'naive-ui';
import { customerManageModel } from '@/api/customerManage/list';

export const columns: DataTableColumns<customerManageModel> = [
  {
    title: '名字',
    key: 'name',
    width: 100,
  },
  {
    title: '用户名',
    key: 'adminUser',
    width: 100,
  },
  {
    title: '密码',
    key: 'password',
    width: 100,
  },
];
