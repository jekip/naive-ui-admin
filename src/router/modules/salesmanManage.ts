import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils';
import { BellOutlined } from '@vicons/antd';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/salesmanManage',
    name: 'salesmanManage',
    component: Layout,
    meta: {
      title: '业务员管理',
      sort: 1,
      isRoot: true,
      icon: renderIcon(BellOutlined),
    },
    children: [
      {
        path: 'index',
        name: `salesmanManage_index`,
        meta: {
          title: '业务员管理',
          activeMenu: 'salesmanManage_index',
        },
        component: () => import('@/views/salesmanManage/list/index.vue'),
      },
    ],
  },
];

export default routes;
