import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils';
import { BellOutlined } from '@vicons/antd';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/clamGoods',
    name: 'clamGoods',
    component: Layout,
    meta: {
      title: '无主货',
      sort: 6,
      isRoot: true,
      icon: renderIcon(BellOutlined),
    },
    children: [
      {
        path: 'index',
        name: `clamGoods_index`,
        meta: {
          title: '无主货',
          activeMenu: 'clamGoods_index',
        },
        component: () => import('@/views/about/index.vue'),
      },
      {
        path: 'add',
        name: `notify_add`,
        meta: {
          title: '新增无主货',
          activeMenu: 'clamGoods_add',
        },
        component: () => import('@/views/about/index.vue'),
      },
    ],
  },
];

export default routes;
