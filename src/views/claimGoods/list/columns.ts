import { DataTableColumns } from 'naive-ui';
import { ClaimModel } from '@/api/claimGoods/list';

export const columns: DataTableColumns<ClaimModel> = [
  {
    title: 'ID',
    key: 'id',
    width: 75,
  },
  {
    title: '物流号码',
    key: 'deliveryID',
    width: 75,
  },
  {
    title: '物流渠道',
    key: 'deliveryMethod',
    width: 75,
  },
  {
    title: '状态',
    key: 'status',
    width: 75,
  },
  {
    title: '到货时间',
    key: 'getGoodsTime',
    width: 75,
  },
  {
    title: '到货仓库',
    key: 'getGoodsWareHouse',
    width: 75,
  },
  {
    title: '备注',
    key: 'note',
    width: 75,
  },
  {
    title: '认领客户ID',
    key: 'claimCustomer',
    width: 75,
  },
  {
    title: '废弃时间点',
    key: 'discardTime',
    width: 75,
  },
  {
    title: '图片',
    key: 'image',
    width: 75,
  },
  {
    title: '时间线',
    key: 'timeLine',
    width: 75,
  },
];
