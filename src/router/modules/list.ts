import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { TableOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/list',
    name: 'List',
    redirect: '/list/basic-list',
    component: Layout,
    meta: {
      title: 'route.list',
      icon: renderIcon(TableOutlined),
      sort: 2,
    },
    children: [
      {
        path: 'basic-list',
        name: 'basic-list',
        meta: {
          title: 'route.list_basic',
        },
        component: () => import('@/views/list/basicList/index.vue'),
      },
      {
        path: 'basic-info/:id?',
        name: 'basic-info',
        meta: {
          title: 'route.list_info',
          hidden: true,
          activeMenu: 'basic-list',
        },
        component: () => import('@/views/list/basicList/info.vue'),
      },
    ],
  },
];

export default routes;
