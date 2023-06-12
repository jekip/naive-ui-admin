import { DataTableColumns } from 'naive-ui';
import { WarehouseModel } from '@/api/warehouse/list';

export const columns: DataTableColumns<WarehouseModel> = [
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
