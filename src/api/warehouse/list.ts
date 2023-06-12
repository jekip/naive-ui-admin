import { http } from '@/utils/http/axios';
export type WarehouseModel = {
  name: string;
  adminUser: string;
  password: string;
};

//获取table
export function getWarehouseList(params) {
  return http.request({
    url: '/warehouse/list',
    method: 'get',
    params,
  });
}
