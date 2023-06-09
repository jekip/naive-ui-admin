import { DataTableColumns } from 'naive-ui';
import { h } from 'vue';
import { NotifyModel } from '@/api/notify/list';

export const columns: DataTableColumns<NotifyModel> = [
  {
    title: '预报ID',
    key: 'id',
    width: 100,
  },
  {
    title: '负责人',
    key: 'salesName',
    width: 100,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
  },
  {
    title: '到货类型',
    key: 'arriveMedia',
  },
  {
    title: '计划到货日期',
    key: 'planArriveDate',
  },
  {
    title: '到货仓库',
    key: 'arriveWarehouseName',
  },
  {
    title: '箱数',
    key: 'totalCount',
    render(data) {
      return h('div', {}, [`${data.arrivedCount}/${data.totalCount}`]);
    },
  },
  {
    title: '物流渠道',
    key: 'deliveryMethod',
  },
  {
    title: '备注',
    key: 'note',
    width: 100,
  },
];
