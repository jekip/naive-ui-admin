import { DataTableColumns } from 'naive-ui';
import { TaskModel } from '@/api/task/list';

export const columns: DataTableColumns<TaskModel> = [
  {
    title: '预报ID',
    key: 'id',
    width: 75,
  },
  {
    title: '操作日期',
    key: 'operateTime',
    width: 75,
  },
  {
    title: '客户ID',
    key: 'customerID',
    width: 75,
  },
  {
    title: '负责人',
    key: 'salesName',
    width: 75,
  },
  {
    title: '计划数量',
    key: 'planAmount',
    width: 75,
  },
  {
    title: '完成数量',
    key: 'finishAmount',
    width: 75,
  },
  {
    title: '业务类型',
    key: 'salesType',
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
    title: '操作人ID',
    key: 'operatorID',
    width: 75,
  },
  {
    title: '发货日期',
    key: 'deliveryDate',
    width: 75,
  },
  {
    title: '完成率',
    key: 'completionRate',
    width: 75,
  },
  {
    title: '备注',
    key: 'note',
    width: 75,
  },
  {
    title: '附件',
    key: 'annex',
    width: 75,
  },
  {
    title: '操作要求',
    key: 'operationalRequirement',
    width: 75,
  },
  {
    title: '时间线',
    key: 'timeLine',
    width: 75,
  },
  {
    title: '业务链接',
    key: 'businessLink',
    width: 75,
  },
];
