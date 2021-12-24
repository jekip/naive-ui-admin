import { http } from '@/utils/http/axios';

//获取table
export function getTableList(params) {
  return http.request({
    url: '/table/list',
    method: 'get',
    params,
  });
}
