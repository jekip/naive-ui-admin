import { http } from '@/utils/http/axios';
export type customerManageModel = {
  name: string;
  adminUser: string;
  password: string;
};

//获取table
export function getcustomerManageList(params) {
  return http.request({
    url: '/customerManage/list',
    method: 'get',
    params,
  });
}
