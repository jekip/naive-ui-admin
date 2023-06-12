import { DataTableColumns } from 'naive-ui';
import { ClaimModel } from '@/api/claimGoods/list';

export const columns: DataTableColumns<ClaimModel> = [
  {
    title: '提交时间',
    key: 'submitTime',
    width: 75,
  },
  {
    title: '订单号',
    key: 'orderID',
    width: 75,
  },
  {
    title: '物流渠道',
    key: 'deliveryMethod',
    width: 75,
  },
  {
    title: '跟踪单号',
    key: 'trackId',
    width: 75,
  },
  {
    title: '货物状态',
    key: 'goodsStatus',
    width: 75,
  },
  {
    title: '渠道反馈',
    key: 'channelFeedback',
    width: 75,
  },
  {
    title: '仓库反馈',
    key: 'warehouseFeedback',
    width: 75,
  },
  {
    title: '索赔号',
    key: 'claimId',
    width: 75,
  },
  {
    title: '申请金额',
    key: 'applicationsAmount',
    width: 75,
  },
  {
    title: '索赔金额',
    key: 'claimAmount',
    width: 75,
  },
  {
    title: '业务员ID',
    key: 'salesName',
    width: 75,
  },
  {
    title: '状态',
    key: 'status',
    width: 75,
  },
  {
    title: '附件',
    key: 'annex',
    width: 75,
  },
  {
    title: '时间线',
    key: 'timeLine',
    width: 75,
  },
];
