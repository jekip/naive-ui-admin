import { http } from '@/utils/http/axios';

export type DamageModel = {
  submitTime: string;
  orderID: number;
  deliveryMethod: string;
  trackId: number;
  goodsStatus: string;
  channelFeedback: string;
  warehouseFeedback: string;
  claimId: number;
  applicationsAmount: string;
  claimAmount: string;
  salesName: string;
  status: string;
  timeLine: string;
  annex: string;
};

//获取table
export function getDamageList(params) {
  return http.request({
    url: '/damageClaim/list',
    method: 'get',
    params,
  });
}
