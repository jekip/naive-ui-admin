import { Alova } from '@/utils/http/alova/index';
import { ListDate } from 'mock/system/menu';

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  return Alova.Get('/menus');
}

/**
 * 获取tree菜单列表
 * @param params
 */
export function getMenuList(params?) {
  return Alova.Get<{ list: ListDate[] }>('/menu/list', {
    params,
  });
}
