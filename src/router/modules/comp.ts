import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { WalletOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routeName = 'comp';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/comp',
    name: routeName,
    redirect: '/comp/console',
    component: Layout,
    meta: {
      title: '组件示例',
      icon: renderIcon(WalletOutlined),
      sort: 8,
    },
    children: [
      {
        path: 'table',
        name: `${routeName}_table`,
        meta: {
          title: '表格',
        },
        component: () => import('@/views/comp/table/list.vue'),
      },
      {
        path: 'upload',
        name: `${routeName}_upload`,
        meta: {
          title: '上传',
        },
        component: () => import('@/views/comp/upload/index.vue'),
      },
    ],
  },
];

export default routes;
