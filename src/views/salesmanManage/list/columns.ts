import { DataTableColumns } from 'naive-ui';
import { salesmanManageModel } from '@/api/salesmanManage/list';

export const columns: DataTableColumns<salesmanManageModel> = [
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
