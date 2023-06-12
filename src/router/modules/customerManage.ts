import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils';
import { BellOutlined } from '@vicons/antd';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/customerManage',
    name: 'customerManage',
    component: Layout,
    meta: {
      title: '客户管理',
      sort: 1,
      isRoot: true,
      icon: renderIcon(BellOutlined),
    },
    children: [
      {
        path: 'index',
        name: `customerManage_index`,
        meta: {
          title: '客户管理',
          activeMenu: 'customerManage_index',
        },
        component: () => import('@/views/customerManage/list/index.vue'),
      },
    ],
  },
];

export default routes;
