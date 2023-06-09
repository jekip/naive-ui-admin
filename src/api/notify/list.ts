import { http } from '@/utils/http/axios';
import { ArriveMedia } from '@/api/notify/statusList';

export type NotifyModel = {
  id: number;
  salesName: string;
  customerName: string;
  status: string;
  planArriveDate: number;
  arriveWarehouseName: string;
  totalCount: number;
  arrivedCount: number;
  deliveryMethod: string;
  arriveMedia: ArriveMedia;
  note: string;
};

//获取table
export function getNotifyList(params) {
  return http.request({
    url: '/notify/list',
    method: 'get',
    params,
  });
}
