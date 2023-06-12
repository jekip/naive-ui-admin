import { http } from '@/utils/http/axios';
export type ClaimModel = {
  id: number;
  deliveryID: number;
  deliveryMethod: string;
  status: string;
  getGoodsTime: string;
  getGoodsWareHouse: string;
  note: string;
  claimCustomer: string;
  discardTime: string;
  image: string;
  timeLine: string;
};

//获取table
export function getClaimList(params) {
  return http.request({
    url: '/claim/list',
    method: 'get',
    params,
  });
}
