import { http } from '@/utils/http/axios';
import { ArriveMedia } from '@/api/notify/statusList';

export type TaskModel = {
  id: number;
  operateTime: string;
  customerID: string;
  salesName: string;
  planAmount: number;
  finishAmount: string;
  salesType: number;
  deliveryMethod: string;
  status: ArriveMedia;
  operatorID: string;
  deliveryDate: string;
  completionRate: string;
  note: string;
  annex: string;
  operationalRequirement: string;
  timeLine: string;
  businessLink: string;
};

//获取table
export function getTaskList(params) {
  return http.request({
    url: '/task/list',
    method: 'get',
    params,
  });
}
