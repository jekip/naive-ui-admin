import { http } from '@/utils/http/axios';

//获取主控台信息
export function getConsoleInfo() {
  return http.request({
    url: '/dashboard/console',
    method: 'get',
  });
}
