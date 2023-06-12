import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils';
import { BellOutlined } from '@vicons/antd';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/warehouse',
    name: 'warehouse',
    component: Layout,
    meta: {
      title: '仓库管理',
      sort: 1,
      isRoot: true,
      icon: renderIcon(BellOutlined),
    },
    children: [
      {
        path: 'index',
        name: `warehouse_index`,
        meta: {
          title: '仓库管理',
          activeMenu: 'warehouse_index',
        },
        component: () => import('@/views/warehouseManage/list/index.vue'),
      },
    ],
  },
];

export default routes;
